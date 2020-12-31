const { constants: { R_OK }, promises: fs, readFileSync } = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const md5 = require('md5');
const sharp = require('sharp');

const markdown = new MarkdownIt({
  html: true,
});

require.extensions['.md'] = function (module, filename) {
  module.exports = readFileSync(filename, 'utf8');
};

const red = require('./sections/Red/content.md');
const white = require('./sections/White/content.md');
const blue = require('./sections/Blue/content.md');

async function sleep(duration = 1000) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

(async () => {
  try {
    puppeteerExtra.use(AdblockerPlugin());

    console.log('crawling all links...');
    const browser = await puppeteerExtra.launch({});

    async function render(link) {
      const id = md5(link);

      const baseFilePath = path.join(process.cwd(), `www/previews/${id}`);

      try {
        await fs.access(`${baseFilePath}.png`, R_OK);
        await fs.access(`${baseFilePath}-small.png`, R_OK);
        await fs.access(`${baseFilePath}-thumb.png`, R_OK);
        await fs.access(`${baseFilePath}.json`, R_OK);

        console.log(`skipping ${link} (${id})`);
        return;
      } catch (error) {}

      try {
        console.log(`loading ${link} (${id})`)

        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(15000);

        await page.setViewport({
          width: 1280,
          height: 800,
          deviceScaleFactor: 2,
        });

        try {
          await page.goto(link, { waitUntil: 'networkidle0' });
          // await sleep(5000);
        } catch (error) {
          if (!(error instanceof puppeteer.errors.TimeoutError)) {
            error.message += `\nlink=${link}, id=${id}`;
            console.error(error);
            return;
          }
        }

        console.log(`screenshotting ${link} (${id})`);

        await page.screenshot({ path: `${baseFilePath}.png` });

        await sharp(`${baseFilePath}.png`)
          .resize(1280 / 2, 800 / 2)
          .toFile(`${baseFilePath}-small.png`);

        await sharp(`${baseFilePath}.png`)
          .resize(1280 / 10, 800 / 10)
          .toFile(`${baseFilePath}-thumb.png`);

        console.log(`pulling meta ${link} (${id})`);

        const title = await page.title();
        let description = '';

        try {
          description = await page.$eval("head > meta[name='description']", element => element.content);
        } catch (error) {}

        if (!description) {
          try {
            description = await page.$eval("head > meta[property='og:description']", element => element.content);
          } catch (error) {}
        }

        if (!description) {
          console.log(`WARNING: Missing description for ${link} (${id})`);
        }

        await fs.writeFile(`${baseFilePath}.json`, JSON.stringify({ title, description }));

        await page.close();
      } catch (error) {
        error.message += `\nlink=${link}, id=${id}`;
        console.error(error);
      }
    }

    async function parse(content) {
      try {
        const html = markdown.render(content);
        const $ = cheerio.load(html);
        const $anchorTags = $('a').toArray();

        const links = $anchorTags.map(($element) => {
          const { attribs: { href } } = $element;
          return href;
        });

        await Promise.all(links.map(render));
      } catch (error) {
        console.error(error);
      }
    }

    await Promise.all([red, white, blue].map((parse)));
    await browser.close();

    console.log('done crawling!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

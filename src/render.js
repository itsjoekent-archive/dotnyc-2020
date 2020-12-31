const fs = require('fs').promises;
const path = require('path');
const minify = require('html-minifier').minify;

async function loadSSRModule() {
  delete require.cache[require.resolve('../www/dist/ssr-compiled.js')];

  const loaderPromise = new Promise((resolve) => {
    let attempts = 0;

    (async function attempt() {
      if (attempts >= 30) {
        console.error('Failed to load SSR module after 30 seconds...');
        process.exit(1);
        return;
      }

      try {
        const modulePath = path.join(process.cwd(), 'www/dist/ssr-compiled.js');
        const mode = require('fs').constants.R_OK;

        await fs.access(modulePath, mode);

        const module = require('../www/dist/ssr-compiled.js');
        resolve(module.default);
      } catch (error) {
        attempts += 1;
        setTimeout(attempt, 1000);
      }
    })();
  });

  return loaderPromise;
}

async function render() {
  const ssr = await loadSSRModule();
  const { html, headElements, styleElements } = await ssr();

  const template = minify(`
    <html>
      <head>
        {{HEAD_ELEMENTS}}
        {{STYLE_ELEMENTS}}
      </head>
      <body>
        <div id="react">{{HTML}}</div>
        <script src="${process.env.NODE_ENV === 'development' ? '/dist/' : '/2020/dist/'}main.js"></script>
      </body>
    </html>
  `, {
    collapseWhitespace: true,
  });

  return template
    .replace('{{HEAD_ELEMENTS}}', headElements)
    .replace('{{STYLE_ELEMENTS}}', styleElements)
    .replace('{{HTML}}', html);
}

async function writeFile(html) {
  try {
    await fs.writeFile(path.join(process.cwd(), 'www/index.html'), html);
  } catch (error) {
    return error;
  }
}

(async function() {
  if (process.env.NODE_ENV === 'development') {
    async function handler() {
      try {
        const html = await render();
        if (html instanceof Error) {
          throw html;
        }

        const result = await writeFile(html);
        if (result instanceof Error) {
          throw result;
        }

        console.log('successfully rendered page');
      } catch (error) {
        console.error(error);
      }
    }

    await handler();

    console.log('renderer watching for changes...');

    require('fs').watch(path.join(process.cwd(), 'www/dist/ssr-compiled.js'), handler);
  } else {
    try {
      const html = await render();
      if (html instanceof Error) {
        throw html;
      }

      const result = await writeFile(html);
      if (result instanceof Error) {
        throw result;
      }

      console.log('successfully rendered page');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
})();

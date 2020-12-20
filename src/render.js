const fs = require('fs').promises;
const path = require('path');

async function loadSSRModule() {
  const loaderPromise = new Promise((resolve) => {
    let attempts = 0;

    (async function attempt() {
      if (attempts >= 30) {
        console.error('Failed to load SSR module after 30 seconds...');
        process.exit(1);
        return;
      }

      try {
        const modulePath = path.join(process.cwd(), 'src/ssr-compiled.js');
        const mode = require('fs').constants.R_OK;

        await fs.access(modulePath, mode);

        const module = require('./ssr-compiled.js');
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

  return `
    <html>
      <head>
        ${headElements}
        ${styleElements}
      </head>
      <body>
        <div id="react">${html}</div>
        <script src="/dist/main.js"></script>
      </body>
    </html>
  `;
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

    require('fs').watch(path.join(process.cwd(), 'src/content.md'), handler);
    require('fs').watch(path.join(process.cwd(), 'src/ssr-compiled.js'), handler);
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

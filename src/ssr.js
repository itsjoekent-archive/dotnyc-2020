import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import App from './App';
import content from './content.md';

export default async function ssr() {
  const sheet = new ServerStyleSheet();

  const html = ReactDOMServer.renderToString(sheet.collectStyles(
    <App content={content} />
  ));

  const helmet = Helmet.renderStatic();
  const headElements = `${helmet.title.toString()}\n${helmet.meta.toString()}`;

  const styleElements = sheet.getStyleTags();
  sheet.seal();

  return { html, headElements, styleElements };
}

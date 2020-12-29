import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import Interactive from '~/Interactive';
import theme from '~/theme';

const GlobalReset = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	font: inherit;
  	vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }
  body {
  	line-height: 1;
  }
  ol, ul {
  	list-style: none;
  }
  blockquote, q {
  	quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
  	content: '';
  	content: none;
  }
  table {
  	border-collapse: collapse;
  	border-spacing: 0;
  }
`;

export default function App(props) {
  const [textOnly, setTextOnly] = React.useState(false);

  return (
    <React.Fragment>
      <Helmet>
        <title>This Is Why 2020 Broke Me - By Joe Kent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@800&family=Poppins:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalReset />
      <ThemeProvider theme={theme}>
        <Interactive setTextOnly={setTextOnly} />
      </ThemeProvider>
    </React.Fragment>
  );
}

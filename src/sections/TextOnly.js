import React from 'react';
import styled from 'styled-components';
import MarkdownRenderer, { MarkdownContainer } from '~/components/MarkdownRenderer';
import * as Typography from '~/components/Typography';
import red from '~/sections/Red/content.md';
import white from '~/sections/White/content.md';
import blue from '~/sections/Blue/content.md';
import conclusion from '~/sections/Conclusion/content.md';

const redContent = red
  .replace('{{START_TRUMP}}', '')
  .replace('{{END_TRUMP}}', '')
  .replace('<AnonLogo />', '');

const whiteContent = white
  .replace('{{ENTER_IPHONE}}', '')
  .replace('{{RACIST_KAREN}}', '')
  .replace('{{ANTI_MASK_KAREN}}', '')
  .replace('{{EXIT_IPHONE}}', '')
  .replace('<CovidParty />', '');

const blueContent = blue
  .replace('{{START_PROTEST}}', '')
  .replace('{{END_PROTEST}}', '')
  .replace('<Disclaimer />', '');

const content = `${redContent}\n${whiteContent}\n${blueContent}\n${conclusion}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  padding-bottom: 72px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: 148px;
  }

  ${MarkdownContainer} {
    @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
      margin-left: calc(256px + 24px + 5%);
    }
  }

  ${Typography.SectionTitle} {
    text-align: left;
    color: ${({ theme }) => theme.colors.black};
  }

  ${Typography.Paragraph} {
    color: ${({ theme }) => theme.colors.black};
  }

  ${Typography.Link} {
    text-decoration-color: ${({ theme }) => theme.colors.silver};

    &:hover {
      text-decoration-color: ${({ theme }) => theme.colors.black};
    }
  }

  hr {
    margin-top: 0;
    margin-bottom: 24px;
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

export default function TextOnly(props) {
  return (
    <Container>
      <MarkdownRenderer
        markup={content}
        overrides={{
          a: Typography.Link,
        }}
      />
    </Container>
  );
}

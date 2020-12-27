import styled, { css, keyframes } from 'styled-components';
import { MarkdownContainer } from '~/components/MarkdownRenderer';
import * as Typography from '~/components/Typography';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.darkRed}, ${({ theme }) => theme.colors.red});
  position: relative;
  padding-bottom: 72px;

  ${Typography.SectionTitle} {
    text-align: center;
    color: ${({ theme }) => theme.colors.lightRed};
  }

  ${Typography.Paragraph} {
    color: ${({ theme }) => theme.colors.white};
  }

  ${Typography.Link} {
    text-decoration-color: ${({ theme }) => theme.colors.lightRed};

    &:hover {
      text-decoration-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const TrumpMarkdownContainer = styled.div`
  ${MarkdownContainer} {
    max-width: 960px;
  }
`;

const backInUp = keyframes`
  0% {
    transform: translateY(1200px) scale(0.7);
    opacity: 0;
  }

  80% {
    transform: translateY(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const toFootnote = keyframes`
  0% {
    font-size: 28px;
    opacity: 1;
  }

  100% {
    font-size: 16px;
    opacity: 0.75;
  }
`;

export const TrumpParagraph = styled(Typography.Paragraph)`
  opacity: 0;

  &.--t-primary {
    display: block;
    font-size: 28px;
    text-align: center;
    margin-top: 24px;
    animation-name: ${backInUp};
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
  }

  &.--t-secondary {
    display: inline;
    text-align: left;
    margin-top: 0;
    animation-name: ${toFootnote};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;

    &:hover {
      opacity: 1 !important;
    }
  }
`;

export const QLogo = styled.span`
  width: 100%;
  height: 600px;
  max-width: 620px;
  position: absolute;

  &:after {
    content: 'Q';
    font-family: ${({ theme }) => theme.fonts.title};
    font-weight: 900;
    font-size: 256px;
    line-height: 1;
    color: ${({ theme }) => theme.colors.lightRed};
    text-transform: uppercase;
    position: absolute;
    left: 50%;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 512px;
      left: 75%;
    }
  }
`;

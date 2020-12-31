import styled from 'styled-components';
import { MarkdownContainer } from '~/components/MarkdownRenderer';
import * as Typography from '~/components/Typography';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  position: relative;
  padding-bottom: 72px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: 148px;
  }

  ${MarkdownContainer} {
    z-index: 1;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  ${Typography.SectionTitle} {
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
  }

  ${Typography.Paragraph} {
    color: ${({ theme }) => theme.colors.white};
  }

  hr {
    margin-top: 0;
    margin-bottom: 24px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

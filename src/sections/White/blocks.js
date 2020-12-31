import styled from 'styled-components';
import { MarkdownContainer } from '~/components/MarkdownRenderer';
import * as Typography from '~/components/Typography';

export const Section = styled.section`
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
    color: ${({ theme }) => theme.colors.silver};
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
`;

export const KarenSection = styled.div`
  z-index: 5;

  ${MarkdownContainer} {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

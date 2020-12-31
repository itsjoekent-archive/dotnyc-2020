import styled, { css } from 'styled-components';
import { MarkdownContainer } from '~/components/MarkdownRenderer';
import * as Typography from '~/components/Typography';
import cops from '~/sections/Blue/cops.png';

export const ProtestSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.navy};
  position: relative;

  &:after {
    content: '';
    width: 444px;
    height: 293px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    background-image: url(${cops});
  }

  ${MarkdownContainer} {
    z-index: 1;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  ${Typography.SectionTitle} {
    text-align: center;
    color: ${({ theme }) => theme.colors.white};

    span {
      border-bottom: 8px solid ${({ theme }) => theme.colors.blue};
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
  }

  ${Typography.Paragraph} {
    color: ${({ theme }) => theme.colors.white};
  }

  ${Typography.Link} {
    text-decoration-color: ${({ theme }) => theme.colors.blue};

    &:hover {
      text-decoration-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const PreProtestPadding = styled.span`
  display: block;
  width: 100%;
  height: 48px;
`;

export const PostProtestSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.navy}, ${({ theme }) => theme.colors.blue});
  position: relative;
  padding-bottom: 72px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: 148px;
  }

  ${({ isPhotoDisabled }) => !isPhotoDisabled && css`
    padding-top: 72px;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding-top: 148px;
    }
  `}

  ${Typography.Paragraph} {
    color: ${({ theme }) => theme.colors.white};
  }

  ${Typography.Link} {
    text-decoration-color: ${({ theme }) => theme.colors.blue};

    &:hover {
      text-decoration-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

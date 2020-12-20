import styled from 'styled-components';
import dumpsterFire from '~/assets/decorators/dumpster-fire.gif';

export const Hero = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow-y: hidden;
`;

export const HeroTitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
`;

export const WideTitleLine = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  letter-spacing: 8px;

  &:first-child {
    margin-bottom: 32px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 36px;
  }
`;

export const EmphasisTitleLine = styled.span`
  color: transparent;
  font-size: 96px;
  margin-bottom: 32px;

  background-clip: text;
  -webkit-background-clip: text;
  background-image: url(${dumpsterFire});
  background-size: cover;
  background-position: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 144px;
  }
`;

export const BylineRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  align-self: flex-end;
  align-items: center;
  z-index: 2;
`;

export const Byline = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 300;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 12px;
`;

export const TextOnlyLink = styled.button`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 300;
  font-size: 14px;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  background: none;
  border: none;
  padding: 0;
`;

export const Mascot = styled.img`
  display: block;
  width: 136px;
  position: absolute;
  bottom: -24px;
  left: -24px;
  z-index: 1;
  opacity: 0.5;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: 24px;
    opacity: 1;
  }
`;

export const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const WarningLayout = styled.div`
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  padding: 48px 24px;
`;

export const WarningParagraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  line-height: 32px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    font-weight: 700;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 22px;
  }
`;

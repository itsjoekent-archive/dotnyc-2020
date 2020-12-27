import styled from 'styled-components';

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: 900;
  font-size: 104px;
  line-height: 1;
  letter-spacing: 8px;
  text-transform: uppercase;
  margin-top: 72px;
  margin-bottom: 72px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 144px;
  }

  span {
    display: block;
    font-family: inherit;
    font-weight: inherit;
    font-size: 16px;
    line-height: inherit;
    letter-spacing: 3px;
    text-transform: inherit;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 22px;
    }
  }
`;

export const Paragraph = styled.p`
  display: block;
  position: relative;
  
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 20px;
  line-height: 1.45;
  margin-bottom: 32px;

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  i {

  }
`;

export const Link = styled.a`
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
`;

import React from 'react';
import styled, { keyframes } from 'styled-components';
import flagRed from '~/assets/flag-red.png';
import flagWhite from '~/assets/flag-white.png';
import flagBlue from '~/assets/flag-blue.png';

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100vw;

  position: fixed;
  z-index: 100;
  top: 0;

  background-color: ${({ theme }) => theme.colors.black};

  opacity: 0;
  animation-name: ${slideDown};
  animation-duration: 0.5s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
`;

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: 900;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2px;
  padding: 14px 16px;
`;

const FlagWrapper = styled.div`
  position: absolute;
  top: 4px;
  left: 12px;

  width: 61px;
  height: 32px;
`;

const FlagLayer = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
`;

export default function StickyNav() {
  const [opacity, setOpacity] = React.useState({ red: 0, white: 0, blue: 0 });

  React.useEffect(() => {
    let performTimeoutId = null;

    function performEffect() {
      const redElement = document.querySelectorAll('[data-section="red"]')[0];
      const whiteElement = document.querySelectorAll('[data-section="white"]')[0];
      const blueElement = document.querySelectorAll('[data-section="blue"]')[0];

      function calculateOpacity(element) {
        const boundingBox = element.getBoundingClientRect();
        return Math.min(Math.max(1 - (boundingBox.bottom / boundingBox.height), 0), 1);
      }

      setOpacity({
        red: calculateOpacity(redElement),
        white: calculateOpacity(whiteElement),
        blue: calculateOpacity(blueElement),
      });
    }

    function onScroll() {
      if (performTimeoutId) {
        window.clearTimeout(performTimeoutId);
      }

      performTimeoutId = window.setTimeout(performEffect, 250);
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);

      if (performTimeoutId) {
        window.clearTimeout(performTimeoutId);
      }
    };
  }, []);

  return (
    <Container>
      <Title>This is why 2020 broke me</Title>
      <FlagWrapper>
        <FlagLayer src={flagRed} alt="Red stripes of the American flag" style={{ opacity: opacity.red }} />
        <FlagLayer src={flagWhite} alt="White stripes and stars of the American flag" style={{ opacity: opacity.white }} />
        <FlagLayer src={flagBlue} alt="Blue background of the American flag" style={{ opacity: opacity.blue }} />
      </FlagWrapper>
    </Container>
  );
}

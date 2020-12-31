import React from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const BubbleContainer = styled.div`
  display: block;
  width: 100%;
  height: 0;
  position: relative;
  z-index: 1;
`;

const Bubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 256px;
  height: 256px;
  border-radius: 50%;

  position: absolute;
  z-index: -1;
  top: 96px;
  right: -128px;

  opacity: 0.5;
  background-color: ${({ theme }) => theme.colors.black};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: -256px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  border-radius: 50%;

  overflow: hidden;

  z-index: 2;
`;

const Video = styled.video`
  width: 200%;
  height: 200%;
  object-fit: cover;
  object-position: center;
`;

const ConfettiContainer = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  z-index: 1;
`;

export default function CovidParty() {
  return (
    <BubbleContainer>
      <Bubble>
        <VideoContainer>
          <Video autoPlay muted loop>
            <source src={`${process.env.ASSET_PATH}video/covid-party.webm`} type="video/webm" />
            <source src={`${process.env.ASSET_PATH}video/covid-party.mp4`} type="video/mp4" />
          </Video>
        </VideoContainer>
        <ConfettiContainer>
          <Confetti
            width={500}
            height={500}
            confettiSource={{ x: 225, y: 225, w: 50, h: 50 }}
            initialVelocityX={{ min: -6, max: 6 }}
            initialVelocityY={{ min: -8, max: -4 }}
          />
        </ConfettiContainer>
      </Bubble>
    </BubbleContainer>
  );
}

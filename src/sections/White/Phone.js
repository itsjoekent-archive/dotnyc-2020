import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import iphone from '~/sections/White/phone.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 277px;
  height: 562px;

  opacity: 0.25;
  transition: bottom 1s;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${({ isInView }) => isInView ? '-35%' : '-100%'};
  z-index: 4;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: unset;
    transform: unset;

    transition: bottom 1s, right 1s;

    bottom: ${({ isInView }) => isInView ? '-15%' : '-100%'};
    right: ${({ isInView }) => isInView ? '24px' : '-100%'};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    opacity: 0.75;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.largeLaptop}) {
    width: 370px;
    height: 750px;

    opacity: 1;
    transition: right 1s;

    width: 370px;
    height: 750px;

    bottom: unset;
    top: 50%;
  }
`;

const PhoneLayer = styled.img`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const VideoLayer = styled.video`
  display: block;
  width: 90%;
  height: 95%;
  object-fit: cover;
  object-position: center center;
  border-radius: 32px;
  z-index: 2;
`;

export default function Phone(props) {
  const {
    karenLedeInView = false,
    karenMainInView = false,
    karenRacistInView = false,
    karenAntiMaskInView = false,
  } = props;

  const videoRef = React.useRef(null);
  const [videoSrc, setVideoSrc] = React.useState('/video/karen-basic');

  const isInView = karenMainInView
    || karenRacistInView
    || karenAntiMaskInView;

  React.useEffect(() => {
    let targetSrc = videoSrc;

    if (karenMainInView) {
      targetSrc = '/video/karen-basic';
    }

    if (!karenLedeInView && karenRacistInView) {
      targetSrc = '/video/karen-racist';
    }

    if (karenAntiMaskInView) {
      targetSrc = '/video/karen-anti-mask';
    }

    if (targetSrc !== videoSrc && videoRef.current) {
      setVideoSrc(targetSrc);

      setTimeout(() => {
        videoRef.current.load();
        videoRef.current.play();
      });
    }
  }, [
    videoSrc,
    karenLedeInView,
    karenMainInView,
    karenRacistInView,
    karenAntiMaskInView,
  ]);

  return (
    <Container isInView={isInView}>
      <PhoneLayer src={iphone} alt="Iphone playing viral videos of Karen's" />
      <VideoLayer ref={videoRef} muted autoPlay loop>
        <source src={`${videoSrc}.mp4`} type="video/mp4" />
      </VideoLayer>
    </Container>
  );
}

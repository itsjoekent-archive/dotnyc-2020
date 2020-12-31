import React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { useInView } from 'react-intersection-observer';
import MarkdownRenderer, { MarkdownContainer } from '~/components/MarkdownRenderer';
import * as Typography from '~/components/Typography';

const steps = [
  [
    `It did not matter how many videos of [brazen police violence went viral around the internet](https://twitter.com/JordanUhl/status/1266917228752056320).`,
    'video/police-1',
  ],
  [
    `It did not matter that The New York Times [compiled dozens of videos of the NYPD over a two week period](https://www.nytimes.com/interactive/2020/07/14/nyregion/nypd-george-floyd-protests.html) showing the department acting more like a Mafia than “*New York’s Finest*”.`,
    'video/police-2',
  ],
  [
    `It did not matter that the Philadelphia SWAT team engaged in essentially [chemical warfare against civilians](https://www.nytimes.com/video/us/100000007174941/philadelphia-tear-gas-george-floyd-protests.html),`,
    'video/police-3',
  ],
  [
    `or that the Buffalo police [shoved an innocent old man on the ground who did nothing wrong and cracked his head open](https://twitter.com/DavidBegnaud/status/1268716877355810818).`,
    'video/police-4',
  ],
  [
    `It did not matter that the US Marshals flat out [assassinated an “Antifa activist”](https://www.nytimes.com/2020/10/13/us/michael-reinoehl-antifa-portland-shooting.html),`,
    '',
  ],
  [
    `or that a Los Angeles Sheriff Deputy [killed an innocent young 18-year old Latino as his initiation to join a cop gang](https://www.nbcnews.com/news/latino/family-andr-s-guardado-killed-sheriff-s-deputy-files-lawsuit-n1239024).`,
    ''
  ],
  [
    `Oh and how did the police respond to the increased media interest? [They shot at the press](https://freedom.press/news/press-freedom-violations-george-floyd-protests-numbers-shocking-and-unprecedented-level-attacks-journalists/).`,
    'video/police-7',
  ],
];

const Prompt = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 640px;
  padding: 24px;

  z-index: 5;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  position: relative;

  background-color: ${({ theme }) => theme.colors.black};

  ${Prompt} {
    ${MarkdownContainer} {
      padding: 0;
      padding-bottom: 12px;

      border-bottom: 8px solid ${({ theme }) => theme.colors.blue};
      margin-bottom: 12px;

      ${Typography.Link} {
        text-decoration-color: ${({ theme }) => theme.colors.silver};

        &:hover {
          text-decoration-color: ${({ theme }) => theme.colors.white};
        }
      }
    }
  }
`;

const NextButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NextButton = styled.button`
  display: flex;
  flex-direction: row;

  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 800;
  font-size: 18px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.white};

  background: none;
  border: none;
  padding: 0;

  cursor: pointer;

  svg {
    margin-${({ arrowMarginDirection }) => arrowMarginDirection}: 6px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.blue};

    svg path {
      fill: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const Video = styled.video`
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const VideoOverlay = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background: ${({ theme }) => css`
    linear-gradient(to bottom, ${rgba(theme.colors.navy, 0.3)}, ${rgba(theme.colors.navy, 1)})
  `};
`;

export default function Protest() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const hasReachedEnd = !(stepIndex < (steps.length - 1));

  const videoRef = React.useRef(null);

  const [promptRef, isPromptInView] = useInView({ threshold: 0.5 });

  React.useEffect(() => {
    if (!!steps[stepIndex][1] && isPromptInView) {
      setTimeout(() => {
        videoRef.current.load();
        videoRef.current.play();
      });
    }
  }, [
    stepIndex,
    isPromptInView,
  ]);

  React.useEffect(() => {
    if (isPromptInView && !videoRef.current.currentTime) {
      videoRef.current.play();
    }
  }, [
    isPromptInView,
  ]);

  return (
    <Container>
      <Prompt ref={promptRef}>
        <MarkdownRenderer
          markup={steps[stepIndex][0]}
          options={{
            forceBlock: true,
          }}
          overrides={{
            a: (anchorProps) => (
              <Typography.Link target="_blank" el="noopener noreferrer" {...anchorProps} />
            ),
          }}
        />
        <NextButtonRow>
          {!stepIndex && <span />}
          {!!stepIndex && (
            <NextButton arrowMarginDirection="right" onClick={() => setStepIndex(stepIndex - 1)}>
              <svg width="45" height="16" viewBox="0 0 45 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.292893 7.29289C-0.097631 7.68341 -0.0976311 8.31658 0.292893 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31945 8.07107 0.928929C7.68054 0.538405 7.04738 0.538405 6.65685 0.928929L0.292893 7.29289ZM45 7L1 7L1 9L45 9L45 7Z" fill="white"/>
              </svg>
              Previous
            </NextButton>
          )}
          {!hasReachedEnd && (
            <NextButton arrowMarginDirection="left" onClick={() => setStepIndex(stepIndex + 1)}>
              Continue
              <svg width="45" height="16" viewBox="0 0 45 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.7071 8.70711C45.0976 8.31658 45.0976 7.68342 44.7071 7.29289L38.3431 0.928932C37.9526 0.538408 37.3195 0.538408 36.9289 0.928932C36.5384 1.31946 36.5384 1.95262 36.9289 2.34315L42.5858 8L36.9289 13.6569C36.5384 14.0474 36.5384 14.6805 36.9289 15.0711C37.3195 15.4616 37.9526 15.4616 38.3431 15.0711L44.7071 8.70711ZM0 9H44V7H0V9Z" fill="white"/>
              </svg>
            </NextButton>
          )}
        </NextButtonRow>
      </Prompt>
      <VideoOverlay />
      {!!steps[stepIndex][1] && (
        <Video ref={videoRef} muted>
          <source src={`${process.env.ASSET_PATH}${steps[stepIndex][1]}.webm`} type="video/webm" />
          <source src={`${process.env.ASSET_PATH}${steps[stepIndex][1]}.mp4`} type="video/mp4" />
        </Video>
      )}
    </Container>
  );
}

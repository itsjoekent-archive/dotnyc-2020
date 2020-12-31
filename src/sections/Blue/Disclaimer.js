import React from 'react';
import styled, { css } from 'styled-components';

export const DisclaimerContext = React.createContext([false, () => {}]);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  margin-bottom: 72px;
`;

const WarningText = styled.p`
  display: block;
  position: relative;

  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 24px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 32px;

  strong {
    font-weight: 800;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${WarningText} {
    flex-shrink: 10;
    font-size: 12px;
    margin-bottom: 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobileLarge}) {
      font-size: 14px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 18px;
    }
  }
`;

const Checkbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;
  position: relative;
  border: 4px solid ${({ theme }) => theme.colors.white};
  cursor: pointer;

  margin-right: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-right: 12px;
  }

  &:hover, &:focus {
    background-color: ${({ theme }) => theme.colors.blue};
  }

  ${({ isChecked }) => isChecked && css`
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: ${({ theme }) => theme.colors.white};
    }
  `}
`;

export default function Disclaimer() {
  const [isPhotoDisabled, setIsPhotoDisabled] = React.useContext(DisclaimerContext);

  function onKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
      event.preventDefault();
      setIsPhotoDisabled(!isPhotoDisabled);
    }
  }

  return (
    <Container>
      <WarningText><strong>Please be advised, this section contains disturbing images and video of police violence that occurred during the 2020 Black Lives Matter protests.</strong> If you prefer, you may check the following box to read this section in a text-only format before you continue scrolling.</WarningText>
      <CheckboxRow>
        <Checkbox
          role="button"
          tabIndex="0"
          aria-label="Toggle images and video of police violence during the 2020 Black Lives Matter protests"
          aria-pressed={isPhotoDisabled}
          isChecked={isPhotoDisabled}
          onClick={() => setIsPhotoDisabled(!isPhotoDisabled)}
          onKeyDown={onKeyDown}
        />
        <WarningText>I would prefer to read the text only version</WarningText>
      </CheckboxRow>
    </Container>
  );
}

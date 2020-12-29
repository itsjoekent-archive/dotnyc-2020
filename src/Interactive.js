import React from 'react';
import styled from 'styled-components';
import Intro from '~/sections/Intro';
import Red from '~/sections/Red';

const Main = styled.main`
  position: relative;
  overflow: hidden;
`;

export default function Interactive(props) {
  const { setTextOnly } = props;

  return (
    <Main>
      <div id="magic-anchor-preview" />
      <Intro setTextOnly={setTextOnly} />
      <Red />
    </Main>
  );
}

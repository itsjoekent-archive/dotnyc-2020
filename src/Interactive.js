import React from 'react';
import styled from 'styled-components';
import Intro from '~/sections/Intro';
import Red from '~/sections/Red';
import { MagicAnchorContext } from '~/components/MagicAnchor';

const Main = styled.main`
  position: relative;
  overflow: hidden;
`;

export default function Interactive(props) {
  const { setTextOnly } = props;

  const [activeMagicLink, setActiveMagicLink] = React.useState(null);

  return (
    <Main>
      <div id="magic-anchor-preview" />
      <MagicAnchorContext.Provider value={[activeMagicLink, setActiveMagicLink]}>
        <Intro setTextOnly={setTextOnly} />
        <Red />
      </MagicAnchorContext.Provider>
    </Main>
  );
}
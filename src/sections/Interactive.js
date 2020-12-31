import React from 'react';
import styled from 'styled-components';
import Red from '~/sections/Red';
import White from '~/sections/White';
import Blue from '~/sections/Blue';
import Conclusion from '~/sections/Conclusion';
import { MagicAnchorContext } from '~/components/MagicAnchor';

const Main = styled.main`
  position: relative;
  overflow: hidden;
`;

export default function Interactive(props) {
  const [activeMagicLink, setActiveMagicLink] = React.useState(null);

  React.useEffect(() => {
    const isTouchDevice = () => !!('ontouchstart' in window || navigator.msMaxTouchPoints);

    if (isTouchDevice()) {
      return;
    }

    function onMouseEnter(event) {
      if (!event.srcElement.querySelectorAll(`[data-magic-anchor="${activeMagicLink}"]`).length) {
        setActiveMagicLink(null);
      }
    }

    if (activeMagicLink) {
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach((element) => element.addEventListener('mouseenter', onMouseEnter));

      return () => paragraphs.forEach((element) => element.removeEventListener('mouseenter', onMouseEnter));
    }
  }, [
    activeMagicLink,
  ]);

  return (
    <Main>
      <div id="magic-anchor-preview" />
      <MagicAnchorContext.Provider value={[activeMagicLink, setActiveMagicLink]}>
        <Red />
        <White />
        <Blue />
        <Conclusion />
      </MagicAnchorContext.Provider>
    </Main>
  );
}

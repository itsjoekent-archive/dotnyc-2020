import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import md5 from 'md5';
import { Link } from '~/components/Typography';
import external from '~/assets/external.png';

export const MagicAnchorContext = React.createContext([null, () => {}]);

const previewSlideUpMobile = keyframes`
  0% {
    transform: translateY(200%) translateX(-50%);
  }

  70% {
    transform: translateY(-10%) translateX(-50%);
  }

  85% {
    transform: translateY(5%) translateX(-50%);
  }

  100% {
    transform: translateY(0%) translateX(-50%);
  }
`;

const previewSlideUpDesktop = keyframes`
  0% {
    transform: translateY(200%);
  }

  70% {
    transform: translateY(-10%);
  }

  85% {
    transform: translateY(5%);
  }

  100% {
    transform: translateY(0%);
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;

  width: calc(100vw - 48px);
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);

  border-radius: 8px;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  animation: ${previewSlideUpMobile} 0.5s forwards linear;

  z-index: 100;

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    flex-direction: column;

    bottom: 24px;
    left: 24px;
    transform: translateX(0);
    animation: ${previewSlideUpDesktop} 0.5s forwards linear;

    width: 256px;
  }
`;

const PreviewImage = styled.img`
  display: block;
  width: 33.33%;
  height: auto;
  max-height: 72px;
  object-fit: cover;
  object-position: top left;
  cursor: default;

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 100%;
    object-position: center;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const MetaTitle = styled.h2`
  display: block;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 6px;

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 16px;
  }
`;

const MetaDescription = styled.p`
  display: none;;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 6px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MetaHostname = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 10px;
  line-height: 1.45;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray};
`;

function truncateMetaString(input, max = 128) {
  if (input.length <= max) {
    return input;
  }

  return input.substring(0, max - 3) + '...';
}

function MagicAnchorPreview(props) {
  const {
    id, href, title, description,
  } = props;

  const { hostname } = new URL(href);

  return ReactDOM.createPortal((
    <PreviewContainer>
      <PreviewImage src={`/previews/${id}-small.png`} alt="" />
      <MetaContainer>
        {title && (<MetaTitle>{truncateMetaString(title)}</MetaTitle>)}
        {description && (<MetaDescription>{truncateMetaString(description)}</MetaDescription>)}
        <MetaHostname>{hostname.replace('www.', '')}</MetaHostname>
      </MetaContainer>
    </PreviewContainer>
  ), document.getElementById('magic-anchor-preview'));
}

export default function MagicAnchor(props) {
  const {
    href,
    children,
    disableMobileMagicAnchor = false,
    disableDesktopMagicAnchor = false,
  } = props;

  const id = md5(href);

  const [activeMagicLink, setActiveMagicLink] = React.useContext(MagicAnchorContext);
  const isExpanded = activeMagicLink === id;

  const [meta, setMeta] = React.useState(null);

  const ref = React.useRef(null);

  function onMouseEnter() {
    if (disableDesktopMagicAnchor) {
      return;
    }

    setActiveMagicLink(id);
  }

  function onMouseLeave() {
    setActiveMagicLink(null);
  }

  React.useEffect(() => {
    if (isExpanded && !meta) {
      fetch(`/previews/${id}.json`)
        .then((response) => response.json())
        .then((data) => setMeta(data));
    }
  }, [
    meta,
    isExpanded,
  ]);

  React.useEffect(() => {
    const isScrollBased = () => !!('ontouchstart' in window || navigator.msMaxTouchPoints) && !disableMobileMagicAnchor;
    let performTimeoutId = null;

    function performEffect() {
      const elements = Array.from(document.querySelectorAll('[data-magic-anchor]'));

      const data = elements.map((element) => ([
        element.dataset.magicAnchor,
        element.getBoundingClientRect().top,
      ]));

      const activeLinks = data.filter((row) => row[1] > 0 && row[1] < (window.innerHeight / 2));

      const pick = activeLinks.reduce((acc, row) => (
        Math.abs(window.innerHeight - acc[1])
        < Math.abs(window.innerHeight - row[1])
      ) ? acc : row, []);

      if (!pick[0] && isExpanded) {
        setActiveMagicLink(null);
      }

      if (pick[0] === id && !isExpanded) {
        setActiveMagicLink(id);
      }
    }

    function onScroll() {
      if (isScrollBased()) {
        if (performTimeoutId) {
          window.clearTimeout(performTimeoutId);
        }

        performTimeoutId = window.setTimeout(performEffect, 250);
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);

      if (performTimeoutId) {
        window.clearTimeout(performTimeoutId);
      }
    };
  }, [
    id,
    isExpanded,
    setActiveMagicLink,
    disableMobileMagicAnchor,
  ]);

  return (
    <React.Fragment>
      <Link
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        ref={ref}
        data-magic-anchor={id}
      >
        {children}
      </Link>
      {isExpanded && (
        <MagicAnchorPreview id={id} href={href} {...meta} />
      )}
    </React.Fragment>
  );
}

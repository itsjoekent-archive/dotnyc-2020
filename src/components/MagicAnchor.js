import React from 'react';
import styled from 'styled-components';
import md5 from 'md5';
import { Link } from '~/components/Typography';
import external from '~/assets/external.png';

const PreviewContainer = styled.span`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: calc(100vw - 48px);
  max-width: 640px;

  border-radius: 8px;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  z-index: 10;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PreviewImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  object-position: center;
  cursor: default;
`;

const MetaContainer = styled.span`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const MetaTitle = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 16px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 6px;
`;

const MetaDescription = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};
`;

const MetaButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 6px;

  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.silver};

  &:hover {
    background-color: #a5a0a0;
  }

  img {
    display: block;
    width: 16px;
    height: 16px;
    object-fit: cover;
    object-position: center;
    margin-left: 6px;
  }
`;

export default function MagicAnchor(props) {
  const { href, children } = props;
  const id = md5(href);

  const ref = React.useRef(null);
  const previewRef = React.useRef(null);

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [meta, setMeta] = React.useState(null);

  function handleClick(event) {
    if (previewRef.current && previewRef.current.contains(event.target)) {
      return;
    }

    event.preventDefault();
    setIsExpanded(!isExpanded);
  }

  function handleKeyDown(event) {
    if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
      event.preventDefault();
      setIsExpanded(!isExpanded);
    }
  }

  React.useEffect(() => {
    function handleGlobalPress(event) {
      if (!isExpanded) {
        return;
      }

      if (
        (ref.current && !ref.current.contains(event.target))
        && (previewRef.current && !previewRef.current.contains(event.target))
      ) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleGlobalPress);
    document.addEventListener('touchstart', handleGlobalPress);

    return () => {
      document.removeEventListener('mousedown', handleGlobalPress);
      document.removeEventListener('touchstart', handleGlobalPress);
    };
  }, [
    isExpanded,
  ]);

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

  return (
    <Link
      as="span"
      role="button"
      tabindex="0"
      ref={ref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isExpanded}
    >
      {children}
      {isExpanded && (
        <PreviewContainer ref={previewRef}>
          <PreviewImage src={`/previews/${id}-small.png`} alt="" />
          {meta && (
            <React.Fragment>
              <MetaContainer>
                <MetaTitle>
                  {meta.title}
                </MetaTitle>
                {meta.description && (
                  <MetaDescription>
                    {meta.description}
                  </MetaDescription>
                )}
              </MetaContainer>
              <MetaButton href={href} target="_blank" rel="noopener noreferrer">
                Open in new tab <img src={external} alt="External tab icon" />
              </MetaButton>
            </React.Fragment>
          )}
        </PreviewContainer>
      )}
    </Link>
  );
}

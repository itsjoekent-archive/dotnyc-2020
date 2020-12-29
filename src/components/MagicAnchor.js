import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import md5 from 'md5';
import { Link } from '~/components/Typography';
import external from '~/assets/external.png';

const PreviewContainer = styled.span`
  display: flex;
  flex-direction: column;
  position: fixed;

  bottom: 24px;
  left: 24px;

  width: 256px;

  border-radius: 8px;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  z-index: 10;

  ${'' /* @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
  } */}
`;

const PreviewImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  object-position: center;
  cursor: default;
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
  font-size: 16px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 6px;
`;

const MetaDescription = styled.p`
  display: block;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 6px;
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

function MagicAnchorPreview(props) {
  const {
    id, href, title, description,
  } = props;

  const { hostname } = new URL(href);

  return ReactDOM.createPortal((
    <PreviewContainer>
      <PreviewImage src={`/previews/${id}-small.png`} alt="" />
      <MetaContainer>
        {title && (<MetaTitle>{title}</MetaTitle>)}
        {description && (<MetaDescription>{description}</MetaDescription>)}
        <MetaHostname>{hostname.replace('www.', '')}</MetaHostname>
      </MetaContainer>
    </PreviewContainer>
  ), document.getElementById('magic-anchor-preview'));
}

export default function MagicAnchor(props) {
  const { href, children } = props;
  const id = md5(href);

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [meta, setMeta] = React.useState(null);

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
    <React.Fragment>
      <Link
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        {children}
      </Link>
      {isExpanded && (
        <MagicAnchorPreview id={id} href={href} {...meta} />
      )}
    </React.Fragment>
  );
}

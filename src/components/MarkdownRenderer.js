import React from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import * as Typography from '~/components/Typography';

export const MarkdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;
  max-width: 620px;

  > div > *:last-child {
    margin-bottom: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export default function MarkdownRenderer(props) {
  const { markup = '', overrides = {}, options = {} } = props;

  const markdownOptions = {
    ...options,
    overrides: {
      h2: {
        component: Typography.SectionTitle,
      },
      p: {
        component: Typography.Paragraph,
      },
      a: {
        component: Typography.Link,
      },
      ...overrides,
    },
  };

  return (
    <MarkdownContainer>
      <Markdown options={markdownOptions}>{markup}</Markdown>
    </MarkdownContainer>
  );
}

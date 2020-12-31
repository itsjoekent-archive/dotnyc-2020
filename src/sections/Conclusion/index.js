import React from 'react';
import MarkdownRenderer from '~/components/MarkdownRenderer';
import * as Blocks from '~/sections/Conclusion/blocks';
import content from '~/sections/Conclusion/content.md';

export default function Conclusion(props) {
  return (
    <Blocks.Section>
      <MarkdownRenderer markup={content} />
    </Blocks.Section>
  );
}

import React from 'react';
import { InView } from 'react-intersection-observer';
import MarkdownRenderer from '~/components/MarkdownRenderer';
import * as RedBlocks from '~/sections/Red/blocks';
import content from '~/sections/Red/content.md';

const lede = content.slice(0, content.indexOf('{{START_TRUMP}}'));

const trump = content
  .slice(content.indexOf('{{START_TRUMP}}'), content.indexOf('{{END_TRUMP}}'))
  .replace('{{START_TRUMP}}', '')
  .split(',')
  .join(',\n\n');

const postTrump = content
  .slice(content.indexOf('{{END_TRUMP}}')).replace('{{END_TRUMP}}', '');

export default function Red() {
  const [isTrumpContentInView, setIsTrumpContentInView] = React.useState(false);

  function onTrumpInViewChange(inView) {
    if (!isTrumpContentInView && inView) {
      setIsTrumpContentInView(true);
    }
  }

  React.useEffect(() => {
    const trumpContentElement = document.getElementById('trump');
    const childElements = trumpContentElement.querySelectorAll('p');

    let index = 0;
    let updateId = null;

    function update() {
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        childElements[previousIndex].classList.add('--t-secondary');
        childElements[previousIndex].classList.remove('--t-primary');
      }

      if (index >= childElements.length) {
        clearInterval(updateId);
        return;
      }

      childElements[index].classList.add('--t-primary');

      index += 1;
    }

    if (isTrumpContentInView) {
      const timeoutId = setTimeout(() => {
        update();
        updateId = setInterval(update, 2000);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        clearInterval(updateId);
      };
    }
  }, [isTrumpContentInView]);

  return (
    <RedBlocks.Section>
      <MarkdownRenderer markup={lede} />
      <InView onChange={onTrumpInViewChange}>
        <RedBlocks.TrumpMarkdownContainer id="trump">
          <MarkdownRenderer
            markup={trump}
            overrides={{ p: RedBlocks.TrumpParagraph }}
          />
        </RedBlocks.TrumpMarkdownContainer>
      </InView>
      <MarkdownRenderer
        markup={postTrump}
        overrides={{ AnonLogo: RedBlocks.QLogo }}
      />
    </RedBlocks.Section>
  );
}

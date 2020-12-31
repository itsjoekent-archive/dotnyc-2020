import React from 'react';
import { useInView } from 'react-intersection-observer';
import MarkdownRenderer from '~/components/MarkdownRenderer';
import Phone from '~/sections/White/Phone';
import CovidParty from '~/sections/White/CovidParty';
import * as WhiteBlocks from '~/sections/White/blocks';
import content from '~/sections/White/content.md';

const [ledeContent, afterLede] = content.split('{{ENTER_IPHONE}}');
const [karenContent, afterKaren] = afterLede.split('{{RACIST_KAREN}}');
const [racistKarenContent, afterRacistKaren] = afterKaren.split('{{ANTI_MASK_KAREN}}');
const [antiMaskKarenContent, afterAntiMaskKaren] = afterRacistKaren.split('{{EXIT_IPHONE}}');

export default function White() {
  const karenLede = useInView({ threshold: 1 });
  const karenMain = useInView({ threshold: 0.75 });
  const karenRacist = useInView({ threshold: 0.5 });
  const karenAntiMask = useInView({ threshold: 0.5 });

  return (
    <WhiteBlocks.TopSection>
      <Phone
        karenLedeInView={karenLede.inView}
        karenMainInView={karenMain.inView}
        karenRacistInView={karenRacist.inView}
        karenAntiMaskInView={karenAntiMask.inView}
      />
      <WhiteBlocks.KarenSection>
        <div ref={karenLede.ref}>
          <MarkdownRenderer
            disableMobileMagicAnchor
            markup={ledeContent}
          />
        </div>
        <div ref={karenMain.ref}>
          <MarkdownRenderer
            disableMobileMagicAnchor
            markup={karenContent}
          />
        </div>
        <div ref={karenRacist.ref}>
          <MarkdownRenderer
            disableMobileMagicAnchor
            markup={racistKarenContent}
          />
        </div>
        <div ref={karenAntiMask.ref}>
          <MarkdownRenderer
            disableMobileMagicAnchor
            markup={antiMaskKarenContent}
          />
        </div>
      </WhiteBlocks.KarenSection>
      <MarkdownRenderer
        disableMobileMagicAnchor={karenAntiMask.inView}
        markup={afterAntiMaskKaren}
        overrides={{
          CovidParty: CovidParty,
        }}
      />
    </WhiteBlocks.TopSection>
  );
}

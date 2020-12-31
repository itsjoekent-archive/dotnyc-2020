import React from 'react';
import Disclaimer, { DisclaimerContext } from '~/sections/Blue/Disclaimer';
import Protest from '~/sections/Blue/Protest';
import * as BlueBlocks from '~/sections/Blue/blocks';
import MarkdownRenderer from '~/components/MarkdownRenderer';
import content from './content.md';

const [preProtestContent, afterPreProtest] = content.split('{{START_PROTEST}}');
const [protestContent, afterProtestContent] = afterPreProtest.split('{{END_PROTEST}}');

export default function Blue() {
  const [isPhotoDisabled, setIsPhotoDisabled] = React.useState(false);

  return (
    <DisclaimerContext.Provider value={[isPhotoDisabled, setIsPhotoDisabled]}>
      <BlueBlocks.ProtestSection>
        <MarkdownRenderer
          markup={preProtestContent}
          disableMobileMagicAnchor
          overrides={{
            Disclaimer,
          }}
        />
        {isPhotoDisabled && (
          <MarkdownRenderer
            markup={protestContent}
            disableMobileMagicAnchor
            disableDesktopMagicAnchor
          />
        )}
        {!isPhotoDisabled && (
          <React.Fragment>
            <BlueBlocks.PreProtestPadding />
            <Protest />
          </React.Fragment>
        )}
      </BlueBlocks.ProtestSection>
      <BlueBlocks.PostProtestSection isPhotoDisabled={isPhotoDisabled}>
        <MarkdownRenderer markup={afterProtestContent} />
      </BlueBlocks.PostProtestSection>
    </DisclaimerContext.Provider>
  );
}

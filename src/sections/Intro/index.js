import React from 'react';
import * as IntroBlocks from '~/sections/Intro/blocks';
import thisIsFine from '~/assets/decorators/this-is-fine.png';

export default function Intro(props) {
  const { setTextOnly } = props;

  return (
    <React.Fragment>
      <IntroBlocks.Hero>
        <IntroBlocks.HeroTitleLayout>
          <IntroBlocks.Title>
            <IntroBlocks.WideTitleLine>This is why</IntroBlocks.WideTitleLine>
            <IntroBlocks.EmphasisTitleLine>2020</IntroBlocks.EmphasisTitleLine>
            <IntroBlocks.WideTitleLine>Broke me</IntroBlocks.WideTitleLine>
          </IntroBlocks.Title>
        </IntroBlocks.HeroTitleLayout>
        <IntroBlocks.BylineRow>
          <IntroBlocks.Byline>By Joe Kent</IntroBlocks.Byline>
          <IntroBlocks.TextOnlyLink onClick={() => setTextOnly(true)}>
            Read the text only version
          </IntroBlocks.TextOnlyLink>
        </IntroBlocks.BylineRow>
        <IntroBlocks.Mascot src={thisIsFine} alt="Popular comic character used to portray everything is on fire" />
      </IntroBlocks.Hero>
      <IntroBlocks.WarningContainer>
        <IntroBlocks.WarningLayout>
          <IntroBlocks.WarningParagraph>
            Fair warning, I’m leaving all of my thoughts on the field. It’s mildly chaotic. You won’t be more joyful by the end. I’m mostly doing this as a visual archive of how awful this year was.
          </IntroBlocks.WarningParagraph>
          <IntroBlocks.WarningParagraph>
            <strong>
              Honestly, you shouldn’t even read this.
            </strong>
          </IntroBlocks.WarningParagraph>
        </IntroBlocks.WarningLayout>
      </IntroBlocks.WarningContainer>
    </React.Fragment>
  );
}

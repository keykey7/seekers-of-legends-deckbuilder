import DeckAvatar from './DeckAvatar.tsx';
import {Box, List} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import {createRef, ReactNode, useLayoutEffect} from 'react';
import {getDeck} from '../core/DeckSignals.ts';
import {deckAnimationSignal, Rect} from '../particles/ParticleSignals.ts';
import {useComputed} from '@preact/signals';
import {useComputedCards} from '../Util.ts';
import {Card} from '../core/Card.ts';

function AnimatableDeckItem({
  card,
  children,
}: Readonly<{card: Card | undefined, children: ReactNode}>) {
  const ref = createRef();
  const isSetTargetRequired = useComputed(() =>
    card !== undefined &&
    deckAnimationSignal.value?.card === card).value &&
    deckAnimationSignal.value?.target === undefined;
  useLayoutEffect(() => {
    if (isSetTargetRequired) {
      console.log("setting target to ", card?.name)
      // we have to wait until after rendering to know the final position of the animation target
      let targetRect: Rect = ref.current.getBoundingClientRect();
      if (targetRect.width === 0) { // this is a hack in case the deck is collapsed
        targetRect = {
          width: 32,
          height: 24,
          top: 14,
          left: window.innerWidth - 24 - 32,
        };
      }
      deckAnimationSignal.value = {...deckAnimationSignal.value!, target:targetRect};
    }
  }, [card, ref, isSetTargetRequired]);
  return <Box ref={ref}>{children}</Box>;
}

function DeckContent() {
  const deckAvatar = useComputed(() => getDeck().value.avatar).value;
  const deckCards = useComputedCards(() => getDeck().value.cards.map(x => x.card)).value;
  return (<List>
    <AnimatableDeckItem card={deckAvatar}>
      <DeckAvatar avatar={deckAvatar} />
    </AnimatableDeckItem>
    {deckCards.map(card => <AnimatableDeckItem key={`kk7-deckItem${card.id}`}
      card={card}>
      <DeckItem card={card} />
    </AnimatableDeckItem>)}
  </List>);
}

export default DeckContent;

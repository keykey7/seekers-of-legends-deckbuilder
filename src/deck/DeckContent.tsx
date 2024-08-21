import DeckAvatar from './DeckAvatar.tsx';
import {Box, List} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import {createRef, ReactNode, useLayoutEffect} from 'react';
import {getDeck} from '../core/DeckSignals.ts';
import {deckAnimationSignal, deckAnimationTargetSignal, Rect} from '../particles/ParticleSignals.ts';
import {useComputed} from '@preact/signals';
import {useComputedCards} from '../Util.ts';
import {Card} from '../core/Card.ts';

function AnimatableDeckItem({
  card,
  children,
}: Readonly<{card: Card | undefined, children: ReactNode}>) {
  const ref = createRef();
  const isAnimationRequired = useComputed(() => deckAnimationSignal.value !== undefined && deckAnimationSignal.value.card === card).value;
  useLayoutEffect(() => {
    if (isAnimationRequired) {
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
      deckAnimationTargetSignal.value = targetRect;
    }
  }, [card, ref, isAnimationRequired]);
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

import DeckAvatar from './DeckAvatar.tsx';
import {Box, List} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import {useLayoutEffect, useRef} from 'react';
import {getDeck} from '../core/DeckSignals.ts';
import {DeckAnimationType, Rect, useDeckAnimation} from '../particles/ParticleSignals.ts';
import {useComputed} from '@preact/signals';
import {useComputedCards} from '../Util.ts';

function useAnimationTargetRef(lastEvent: DeckAnimationType | undefined, setParticleTarget: (arg: Rect) => void) {
  const animationTargetRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    // we have to wait until after rendering to know the final position of the animation target
    if (animationTargetRef.current) {
      let targetRect: Rect = animationTargetRef.current.getBoundingClientRect();
      if (targetRect.width === 0) { // this is a hack in case the deck is collapsed
        targetRect = {
          width: 32,
          height: 24,
          top: 14,
          left: window.innerWidth - 24 - 32,
        };
      }
      setParticleTarget(targetRect);
    }
  }, [lastEvent, setParticleTarget]);
  return animationTargetRef;
}

interface DeckContentProps {
  setParticleTarget: (arg: Rect) => void;
}

function DeckContent({setParticleTarget}: Readonly<DeckContentProps>) {
  const deckAvatar = useComputed(() => getDeck().value.avatar).value;
  const deckCards = useComputedCards(() => getDeck().value.cards.map(x => x.card)).value;
  const deckAnimation = useDeckAnimation().value;
  const animationTargetRef = useAnimationTargetRef(deckAnimation, setParticleTarget);
  // all cards of the deck
  const deckItems = deckCards.map(card => {
    let thisRef = null;
    if (card.id === deckAnimation?.card.id) {
      thisRef = animationTargetRef;
    }
    return <Box key={`kk7-deckItem${card.id}`}
      ref={thisRef}>
      <DeckItem card={card} />
    </Box>;
  });
  // handle avatar click target
  let avatarRef = null;
  if (deckAvatar && deckAvatar.id === deckAnimation?.card.id) {
    avatarRef = animationTargetRef;
  }
  return (<List>
    <Box ref={avatarRef}>
      <DeckAvatar avatar={deckAvatar} />
    </Box>
    {deckItems}
  </List>);
}

export default DeckContent;

import DeckAvatar from './DeckAvatar.tsx';
import {Box, List} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import {useDeck} from './context/DeckProvider.tsx';
import ParticleAnimation, {Rect} from '../particles/ParticleAnimation.tsx';
import {useLayoutEffect, useRef, useState} from 'react';

function DeckContent() {
  const deck = useDeck();
  const [particleTarget, setParticleTarget] = useState<Rect>();
  const animationTargetRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    // we have to wait until after rendering to know the final position of the animation target
    if (animationTargetRef.current) {
      setParticleTarget(animationTargetRef.current.getBoundingClientRect());
    }
  }, [deck.lastEvent]);
  // all cards of the deck
  const deckItems = deck.cards.map(cardAndCount => {
    const card = cardAndCount[0];
    const cost = card.cost;
    const mod = deck.avatar?.costModifier(card.fraction) ?? 0;
    let costStr: string;
    if (mod === 0) {
      costStr = cost.toString();
    } else if (cost === 'X') {
      costStr = 'X+' + mod;
    } else {
      costStr = (cost + mod).toString();
    }
    let thisRef = null;
    if (card.id === deck.lastEvent?.card.id) {
      thisRef = animationTargetRef;
    }
    return (
      <Box key={'deckItem' + card.id} ref={thisRef}>
        <DeckItem cardId={card.id} actualCost={costStr} costModifier={mod} amount={cardAndCount[1]} />
      </Box>
    );
  });
  // handle avatar click target
  let avatarRef = null;
  if(deck.avatar && deck.avatar.id === deck.lastEvent?.card.id) {
    avatarRef = animationTargetRef;
  }
  // the invisible animation node
  let animation = <></>;
  if (deck.lastEvent && particleTarget) {
    animation = <ParticleAnimation from={deck.lastEvent.eventOrigin} to={particleTarget} />;
  }
  return (
    <List>
      {animation}
      <Box ref={avatarRef}>
        <DeckAvatar cardId={deck.avatar?.id} />
      </Box>
      {deckItems}
    </List>
  );
}

export default DeckContent;

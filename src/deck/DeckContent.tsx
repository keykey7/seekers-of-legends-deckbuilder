import DeckAvatar from './DeckAvatar.tsx';
import {Box, Divider, List} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import {useDeck} from './context/DeckProvider.tsx';
import ParticleAnimation, {Rect} from '../particles/ParticleAnimation.tsx';
import {useLayoutEffect, useRef, useState} from 'react';

function DeckContent() {
  const deck = useDeck();
  const [particleTarget, setParticleTarget] = useState<Rect>();
  const animationTargetRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    console.log("useLayoutEffect", animationTargetRef.current)
    if (animationTargetRef.current) {
      setParticleTarget(animationTargetRef.current.getBoundingClientRect());
    }
  }, [deck.lastEvent]);

  const deckItems = deck.cards.map(cardAndCount => {
    const card = cardAndCount[0];
    const cost = card.cost;
    const mod = deck.avatar?.costModifier(card.fraction) ?? 0;
    let costStr : string;
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
      <Box key={"deckItem" + card.id} ref={thisRef}>
        <DeckItem cardId={card.id} actualCost={costStr} costModifier={mod} amount={cardAndCount[1]} />
      </Box>
    );
  })
  let animation = <></>;
  if (deck.lastEvent && particleTarget) {
    animation = <ParticleAnimation from={deck.lastEvent.eventOrigin} to={particleTarget}/>
  }
  return (
    <List>
      {animation}
      <DeckAvatar cardId={deck.avatar?.id} />
      <Divider />
      {deckItems}
    </List>
  );
}

export default DeckContent;

import DeckAvatar from './DeckAvatar.tsx';
import {Box, List} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import {useDeck} from './context/DeckProvider.tsx';
import {RefObject, useLayoutEffect, useRef} from 'react';
import {Rect} from '../particles/ParticleAnimation.tsx';
import {CardAndCount, DeckActionType} from './context/DeckContext.tsx';
import {Card} from '../Card.ts';

interface DeckItemWithCostProps {
  cardAndCount: CardAndCount;
  avatar: Card | undefined;
  thisRef: RefObject<HTMLDivElement> | null;
}

/** enhance by the actual cost of the card */
function DeckItemWithCost(props: Readonly<DeckItemWithCostProps>) {
  const [card, count] = props.cardAndCount;
  const {cost} = card;
  const mod = props.avatar?.costModifier(card.fraction) ?? 0;
  let costStr: string;
  if (mod === 0) {
    costStr = cost.toString();
  } else if (cost === 'X') {
    costStr = `X+${mod}`;
  } else {
    costStr = (cost + mod).toString();
  }
  return (<Box ref={props.thisRef}>
    <DeckItem cardId={card.id}
      actualCost={costStr}
      costModifier={mod}
      amount={count} />
  </Box>);
}

function useAnimationTargetRef(lastEvent: DeckActionType | undefined, setParticleTarget: (arg: Rect) => void) {
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
  const deck = useDeck();
  const animationTargetRef = useAnimationTargetRef(deck.lastEvent, setParticleTarget);
  // all cards of the deck
  const deckItems = deck.cards.map(cardAndCount => {
    const card = cardAndCount[0];
    let thisRef = null;
    if (card.id === deck.lastEvent?.card.id) {
      thisRef = animationTargetRef;
    }
    return <DeckItemWithCost key={`kk7-deckItem${card.id}`} cardAndCount={cardAndCount} avatar={deck.avatar} thisRef={thisRef} />
  });
  // handle avatar click target
  let avatarRef = null;
  if (deck.avatar && deck.avatar.id === deck.lastEvent?.card.id) {
    avatarRef = animationTargetRef;
  }
  return (<List>
    <Box ref={avatarRef}>
      <DeckAvatar cardId={deck.avatar?.id} />
    </Box>
    {deckItems}
  </List>);
}

export default DeckContent;

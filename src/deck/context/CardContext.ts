import {createContext, useContext} from 'react';
import {Card, CardType} from '../../core/Card.ts';
import {CardCountOr0} from '../../core/Deck.ts';

export const CardContext = createContext<Card | undefined>(undefined);

export const CardCount = createContext<CardCountOr0 | undefined>(undefined);

export const useCard = (): Card => {
  const card = useContext(CardContext);
  if (card === undefined) {
    throw new Error('card is not defined in context');
  }
  return card;
};

export const useCardCount = (): CardCountOr0 => {
  const count = useContext(CardCount);
  if (count === undefined) {
    throw new Error('card is not defined in context');
  }
  return count;
}

export const useIsMaxCount = (): boolean => {
  const count = useCardCount();
  const card = useCard();
  const max = card.type === CardType.Avatar ? 1 : 4;
  return count >= max;
}

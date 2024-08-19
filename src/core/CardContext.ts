import {createContext, useContext} from 'react';
import {Card} from './Card.ts';

export const CardContext = createContext<Card | undefined>(undefined);

export const useCard = (): Card => {
  const card = useContext(CardContext);
  if (card === undefined) {
    throw new Error('card is not defined in context');
  }
  return card;
};

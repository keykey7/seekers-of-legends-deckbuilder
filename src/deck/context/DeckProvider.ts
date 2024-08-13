import React, {createContext, useContext, useReducer} from 'react';
import {AvatarAndCards, DeckActionType, deckReducer, initialDeck} from './DeckContext.ts';
import {Card, CardType} from '../../Card.ts';

export const DeckContext = createContext<AvatarAndCards>(initialDeck);

export const DeckDispatchContext = createContext<React.Dispatch<DeckActionType>>(() => {});

export const useDeck = () => useContext(DeckContext);

export const useDeckDispatch = () => useContext(DeckDispatchContext);

export const useDeckReducer = () => useReducer(deckReducer, initialDeck);

export const useIsCardMaxReached = (card : Card) => {
  const count = useDeck().countByType(card);
  return count === (card.type === CardType.Avatar ? 1 : 4);
}

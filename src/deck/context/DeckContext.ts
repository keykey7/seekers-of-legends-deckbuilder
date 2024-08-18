import {Card, CardType} from '../../core/Card.ts';
import {fromUrl} from '../StableUrl.ts';
import {AvatarAndCards, InvalidDeckOperation} from '../../core/Deck.ts';
import React, {createContext, useContext, useReducer} from 'react';

export interface DeckActionType {
  readonly type: 'add' | 'remove',
  readonly card: Card,
  readonly eventOrigin: DOMRectReadOnly,
}

export const initialDeck = fromUrl();

export function deckReducer(deck: AvatarAndCards, action: DeckActionType): AvatarAndCards {
  switch (action.type) {
    case 'add': {
      try {
        return deck.withAnyCard(action.card)
          .withEvent(action);
      } catch (e) {
        if (e instanceof InvalidDeckOperation) {
          console.debug(e.message);
          return deck;
        }
        throw e;
      }
    }
    case 'remove': {
      return deck.withoutCard(action.card)
        .withEvent(action);
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

export const DeckContext = createContext<AvatarAndCards>(initialDeck);

export const DeckDispatchContext = createContext<React.Dispatch<DeckActionType>>(() => {
});

export const useDeck = () => useContext(DeckContext);

export const useDeckDispatch = () => useContext(DeckDispatchContext);

export const useDeckReducer = () => useReducer(deckReducer, initialDeck);

export const useIsCardMaxReached = (card: Card) => {
  const count = useDeck()
    .countByType(card);
  return count === (card.type === CardType.Avatar ? 1 : 4);
};

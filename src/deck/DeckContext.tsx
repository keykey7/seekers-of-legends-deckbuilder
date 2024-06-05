import React, {createContext, useContext, useReducer} from 'react';
import {Card, CardType} from '../Card.tsx';

type CardAndCount = [Card, 1 | 2 | 3 | 4];

class InvalidDeckOperation extends Error {}

export class DeckContextType {

  constructor(public avatar: Card | undefined, public cards: CardAndCount[]) {}

  count(card: Card): number {
    if (card.equals(this.avatar)) {
      return 1;
    }
    const thisTuple = this.cards.filter(x => x[0].equals(card));
    return thisTuple.length === 0 ? 0 : thisTuple[0][1];
  }

  contains(card: Card): boolean {
    return this.count(card) > 0;
  }

  withAnyCard(newCard: Card): DeckContextType {
    const existingCount = this.count(newCard);
    if (newCard.type === CardType.Avatar && existingCount > 0) {
      throw new InvalidDeckOperation('already an avatar of same type in deck');
    }
    if (existingCount > 3) {
      throw new InvalidDeckOperation('cannot have more than 4 cards of the same type in a deck');
    }
    // at this point we are sure we can add the card
    if(newCard.type === CardType.Avatar && this.avatar === undefined) {
      return new DeckContextType(newCard, this.cards);
    }
    if (existingCount === 0) { // append to end
      return new DeckContextType(this.avatar, [ ...this.cards, [newCard, 1]]);
    }
    // increment count of cards only
    return new DeckContextType(this.avatar, this.cards.map(tuple => {
      if (tuple[0].equals(newCard)) {
        return [tuple[0], tuple[1] + 1] as CardAndCount;
      }
      return tuple;
    }));
  }

  withoutCard(card: Card): DeckContextType {
    if (card.equals(this.avatar)) {
      return new DeckContextType(undefined, this.cards);
    }
    let found = false;
    const updatedCards = this.cards.map(x => {
      if (x[0].equals(card)) {
        found = true;
        if (x[1] === 1) {
          return null;
        }
        return [card, x[1] - 1];
      }
      return x;
    }).filter(x => x !== null) as CardAndCount[];
    if(!found) {
      throw new InvalidDeckOperation('cannot remove a card which is missing in the deck');
    }
    return new DeckContextType(this.avatar, updatedCards);
  }
}

const initialDeck = new DeckContextType(undefined, []);

const DeckContext = createContext<DeckContextType>(initialDeck);

const DeckDispatchContext = createContext<React.Dispatch<DeckActionType>>(() => {});

export function DeckProvider({ children }: Readonly<{children: React.ReactNode}>) {
  const [tasks, dispatch] = useReducer(
    deckReducer,
    initialDeck,
  );
  return (
    <DeckContext.Provider value={tasks}>
      <DeckDispatchContext.Provider value={dispatch}>
        {children}
      </DeckDispatchContext.Provider>
    </DeckContext.Provider>
  );
}


export function useDeck() {
  return useContext(DeckContext);
}

export function useDeckDispatch() {
  return useContext(DeckDispatchContext);
}

interface DeckActionType {
  type: 'add' | 'remove',
  card: Card,
}

function deckReducer(deck: DeckContextType, action: DeckActionType): DeckContextType {
  console.debug("deckReducer", action);
  switch (action.type) {
    case 'add': {
      return deck.withAnyCard(action.card);
    }
    case 'remove': {
      return deck.withoutCard(action.card);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

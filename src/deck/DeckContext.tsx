import React, {createContext, useContext, useReducer} from 'react';
import {Card, CardType} from '../Card.tsx';

type CardAndCount = [Card, number];

export class DeckContextType {
  constructor(public avatar: Card | undefined, public cards: CardAndCount[]) {}

  withDeckCard(card: Card): DeckContextType {
    let found = false;
    let newCards: CardAndCount[] = this.cards.map(tuple => {
      if(tuple[0].id === card.id) {
        found = true;
        return [tuple[0], tuple[1] + 1];
      }
      return tuple;
    })
    if (!found) {
      newCards = [ ...this.cards, [card, 1]]
    }
    return new DeckContextType(this.avatar, newCards);
  }

  withAnyCard(newCard: Card): DeckContextType {
    if(newCard.type === CardType.Avatar && this.avatar === undefined) {
      return new DeckContextType(newCard, this.cards);
    } else {
      return this.withDeckCard(newCard);
    }
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
  switch (action.type) {
    case 'add': {
      return deck.withAnyCard(action.card);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

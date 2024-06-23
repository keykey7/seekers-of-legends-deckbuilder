import React, {createContext, useContext, useReducer} from 'react';
import {AvatarAndCards, DeckActionType, deckReducer, emptyDeck} from './DeckContext.tsx';

export const DeckContext = createContext<AvatarAndCards>(emptyDeck);

export const DeckDispatchContext = createContext<React.Dispatch<DeckActionType>>(() => {});

export default function DeckProvider({ children }: Readonly<{children: React.ReactNode}>) {
  const [deck, dispatch] = useReducer(
    deckReducer,
    emptyDeck,
  );
  return (
    <DeckContext.Provider value={deck}>
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

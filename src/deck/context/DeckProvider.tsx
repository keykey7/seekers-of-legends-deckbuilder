import React, {createContext, useContext, useReducer} from 'react';
import {AvatarAndCards, DeckActionType, deckReducer, initialDeck} from './DeckContext.tsx';

export const DeckContext = createContext<AvatarAndCards>(initialDeck);

export const DeckDispatchContext = createContext<React.Dispatch<DeckActionType>>(() => {
});

export default function DeckProvider({children}: Readonly<{children: React.ReactNode}>) {
  const [deck, dispatch] = useReducer(deckReducer, initialDeck);
  return <DeckContext.Provider value={deck}>
    <DeckDispatchContext.Provider value={dispatch}>
      {children}
    </DeckDispatchContext.Provider>
  </DeckContext.Provider>;
}

export const useDeck = () => useContext(DeckContext);

export const useDeckDispatch = () => useContext(DeckDispatchContext);

import {DeckContext, DeckDispatchContext, useDeckReducer} from './DeckProvider.ts';
import React from 'react';

export default function DeckProvider({children}: Readonly<{children: React.ReactNode}>) {
  const [deck, dispatch] = useDeckReducer();
  return <DeckContext.Provider value={deck}>
    <DeckDispatchContext.Provider value={dispatch}>
      {children}
    </DeckDispatchContext.Provider>
  </DeckContext.Provider>;
}

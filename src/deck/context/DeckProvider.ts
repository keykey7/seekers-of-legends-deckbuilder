import React, {createContext, useContext, useReducer} from 'react';
import {AvatarAndCards, DeckActionType, deckReducer, initialDeck} from './DeckContext.ts';

export const DeckContext = createContext<AvatarAndCards>(initialDeck);

export const DeckDispatchContext = createContext<React.Dispatch<DeckActionType>>(() => {});

export const useDeck = () => useContext(DeckContext);

export const useDeckDispatch = () => useContext(DeckDispatchContext);

export const useDeckReducer = () => useReducer(deckReducer, initialDeck);

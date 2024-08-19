import {Card} from './Card.ts';
import {CardContext} from './CardContext.ts';
import {ReactNode} from 'react';

export interface CardProviderProps {
  card: Card,
  children: ReactNode,
}

export function CardProvider({
  card,
  children,
}: Readonly<CardProviderProps>) {
  return <CardContext.Provider value={card}>
    {children}
  </CardContext.Provider>;
}

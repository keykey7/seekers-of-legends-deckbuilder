import {CardContext, CardCount} from './CardContext.ts';
import {DependencyList, ReactNode, useMemo} from 'react';
import {Card} from '../../core/Card.ts';
import {CardCountOr0} from '../../core/Deck.ts';

export interface CardProviderProps {
  card: Card,
  count: CardCountOr0,
  children: ReactNode,
}

export function CardProvider({
  card,
  count,
  children,
}: Readonly<CardProviderProps>) {
  return <CardContext.Provider value={card}>
    <CardCount.Provider value={count}>
      {children}
    </CardCount.Provider>
  </CardContext.Provider>;
}

export interface CachedProps {
  children: ReactNode,
  deps: DependencyList,
}

export function Cached({children, deps}: Readonly<CachedProps>) {
  return useMemo(() => children, deps);
}

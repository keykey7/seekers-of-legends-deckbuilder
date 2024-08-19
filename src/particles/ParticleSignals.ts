import {Card} from '../core/Card.ts';
import {computed, signal} from '@preact/signals-react';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface DeckAnimationType {
  card: Card,
  origin: Rect,
}

export const deckAnimationSignal = signal<DeckAnimationType | undefined>(undefined);

export const useDeckAnimation = () => computed(() => deckAnimationSignal.value);

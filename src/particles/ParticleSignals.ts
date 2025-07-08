import {Card} from '../core/Card.ts';
import {computed, signal} from "@preact/signals";

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface DeckAnimationType {
  card: Card,
  origin: Rect,
  target: Rect | undefined,
}

export const deckAnimationSignal = signal<DeckAnimationType>();

export const useDeckAnimation = () => computed(() => deckAnimationSignal.value);

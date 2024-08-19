import {Card} from './Card.ts';
import {fromUrl, toUrl} from '../deck/StableUrl.ts';
import {batch, computed, effect, signal} from '@preact/signals-react';
import {Rect} from '../particles/ParticleAnimation.tsx';

const deckSignal = signal(fromUrl());

effect(() => {
  console.debug('deck update', deckSignal.value);
  document.location.hash = toUrl(deckSignal.value);
});

export const getDeck = () => computed(() => deckSignal.value);

export interface DeckAnimationType {
  card: Card,
  origin: Rect,
}

const deckAnimationSignal = signal<DeckAnimationType | undefined>(undefined);

export const useDeckAnimation = () => computed(() => deckAnimationSignal.value);

export const addCardToDeck = (card: Card, origin: Rect) => {
  batch(() => {
    deckSignal.value = deckSignal.value.withAnyCard(card);
    deckAnimationSignal.value = {
      card,
      origin,
    };
  });
}

export const removeCardFromDeck = (card: Card, origin: Rect) => {
  batch(() => {
    deckSignal.value = deckSignal.value.withoutCard(card);
    deckAnimationSignal.value = {
      card,
      origin,
    };
  });
}

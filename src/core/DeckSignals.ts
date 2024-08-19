import {Card} from './Card.ts';
import {fromUrl, toUrl} from '../deck/StableUrl.ts';
import {batch, computed, effect, signal} from '@preact/signals-react';
import {allCards} from './CardData.ts';
import {Rect} from '../particles/ParticleAnimation.tsx';

const deckSignal = signal(fromUrl());

effect(() => {
  console.debug('deck update', deckSignal.value);
  document.location.hash = toUrl(deckSignal.value);
});

export const useDeck = () => computed(() => deckSignal.value); // not really a hook

export interface DeckAnimationType {
  card: Card,
  origin: Rect,
}

const deckAnimationSignal = signal<DeckAnimationType | undefined>(undefined);

export const useDeckAnimation = () => computed(() => deckAnimationSignal.value);

const cardCountSignals = allCards.map(card => computed(() => deckSignal.value.countByType(card)));

export const getCountSignalFor = (card: Card) => cardCountSignals[card.id - 1];

const cardIsMaxSignals = allCards.map(card => {
  const thisIsMaxSignal = computed(() => deckSignal.value.isMaxCount(card));
  effect(() => {
    console.debug(`card ${card.name} count update`, thisIsMaxSignal.value);
  });
  return thisIsMaxSignal;
});

export const getIsMaxSignalFor = (card: Card) => cardIsMaxSignals[card.id - 1];

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

import {Card} from './Card.ts';
import {fromUrl, toUrl} from '../deck/StableUrl.ts';
import {batch, computed, effect, signal} from '@preact/signals';
import {deckAnimationSignal, Rect} from '../particles/ParticleSignals.ts';

const deckSignal = signal(fromUrl());

effect(() => {
  console.debug('deck update', deckSignal.value);
  document.location.hash = toUrl(deckSignal.value);
});

export const avatarSignal = computed(() => deckSignal.value.avatar);

export const getDeck = () => computed(() => deckSignal.value);

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

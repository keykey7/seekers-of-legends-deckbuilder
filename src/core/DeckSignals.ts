import {Card} from './Card.ts';
import {fromUrl, toUrl} from '../deck/StableUrl.ts';
import {batch, computed, effect, signal} from '@preact/signals';
import {deckAnimationSignal, Rect} from '../particles/ParticleSignals.ts';

const deckSignal = signal(fromUrl());

effect(() => {
  const newHash = toUrl(deckSignal.value);
  if (newHash.length === 0) {
    // drop hash from URL: https://stackoverflow.com/a/5298684
    history.pushState('', document.title, window.location.pathname + window.location.search);
  } else {
    document.location.hash = newHash;
  }
});

export const getDeck = () => computed(() => deckSignal.value);

export const addCardToDeck = (card: Card, origin: Rect) => {
  if (deckSignal.value.isMaxCount(card)) {
    return; // noop
  }
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

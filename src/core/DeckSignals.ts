import { Card, CardType } from './Card.ts';
import { fromUrl, toUrl } from '../deck/StableUrl.ts';
import { batch, computed, effect, signal } from '@preact/signals';
import { deckAnimationSignal, Rect } from '../particles/ParticleSignals.ts';
import { AvatarAndCards } from './Deck.ts';
import { filterSignal } from '../compendium/CardFilter.ts';
import { AVATAR_FILTER_TEXT } from '../deck/DeckAvatar.tsx';

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
    if (deckSignal.value.avatar === undefined && card.type === CardType.Avatar && filterSignal.value.filterText ===
      AVATAR_FILTER_TEXT) {
      // if the deck didn't have an avatar yet, and the user clicked on the avatar filter before, we unset that one here
      filterSignal.value = {
        ...filterSignal.value,
        filterText: '',
      };
    }
    deckSignal.value = deckSignal.value.withAnyCard(card);
    deckAnimationSignal.value = {
      card,
      origin,
    };
  });
};

export const removeCardFromDeck = (card: Card, origin: Rect) => {
  batch(() => {
    deckSignal.value = deckSignal.value.withoutCard(card);
    deckAnimationSignal.value = {
      card,
      origin,
    };
  });
};

export const clearDeck = () => {
  deckSignal.value = AvatarAndCards.empty();
};

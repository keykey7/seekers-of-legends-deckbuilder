import {signal} from '@preact/signals';
import {CharacterInPlay} from './GameEngine.ts';
import {cardById} from '../core/CardData.ts';

export const tableSelf = signal<CharacterInPlay>({
  effects: [],
  isExhausted: false,
  isFirstRound: false,
  tokenCount: 0,
  currentHealth: 1,
  gameCard: {
    uid
    card: cardById(17),
  }
})

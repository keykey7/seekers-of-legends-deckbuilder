import {Card, CardType, DeckSort} from '../../Card.tsx';
import {fromUrl} from '../StableUrl.tsx';

export type CardAndCount = [Card, 1 | 2 | 3 | 4];

class InvalidDeckOperation extends Error {}

export interface DeckActionType {
  type: 'add' | 'remove',
  card: Card,
  eventOrigin: DOMRectReadOnly,
}

export class AvatarAndCards {

  constructor(public avatar: Card | undefined, public cards: CardAndCount[], public lastEvent: DeckActionType | undefined) {}

  countByType(card: Card): number {
    if (card.equals(this.avatar)) {
      return 1;
    }
    const thisTuple = this.cards.filter(x => x[0].equals(card));
    return thisTuple.length === 0 ? 0 : thisTuple[0][1];
  }

  count(): number {
    return this.cards.map(x => x[1]).reduce((a, b) => a + b, this.avatar === undefined ? 0 : 1);
  }

  withAnyCard(newCard: Card): AvatarAndCards {
    const existingCount = this.countByType(newCard);
    if (newCard.type === CardType.Avatar && existingCount > 0) {
      throw new InvalidDeckOperation('already an avatar of same type in deck');
    }
    if (existingCount > 3) {
      throw new InvalidDeckOperation('cannot have more than 4 cards of the same type in a deck');
    }
    // at this point we are sure we can add the card
    if(newCard.type === CardType.Avatar && this.avatar === undefined) {
      return this.withAvatar(newCard);
    }
    if (existingCount === 0) { // append to end
      return this.withCards([ ...this.cards, [newCard, 1]]);
    }
    // increment count of cards only
    return this.withCards(this.cards.map(tuple => {
      if (tuple[0].equals(newCard)) {
        return [tuple[0], tuple[1] + 1] as CardAndCount;
      }
      return tuple;
    }));
  }

  withAvatar(avatar: Card | undefined) {
    return new AvatarAndCards(avatar, this.cards, this.lastEvent).sorted();
  }

  private sorted(): AvatarAndCards {
    return new AvatarAndCards(this.avatar, this.cards.slice()
        .sort((a, b) => DeckSort.byFraction(a[0], b[0]))
        .sort((a, b) => a[0].costNumber(this.avatar?.fraction) - b[0].costNumber(this.avatar?.fraction)),
      this.lastEvent);
  }

  withCards(cards: CardAndCount[]) {
    return new AvatarAndCards(this.avatar, cards, this.lastEvent).sorted();
  }

  withEvent(event: DeckActionType) {
    return new AvatarAndCards(this.avatar, this.cards, event);
  }

  withoutCard(card: Card): AvatarAndCards {
    if (card.equals(this.avatar)) {
      return this.withAvatar(undefined);
    }
    let found = false;
    const updatedCards = this.cards.map(x => {
      if (x[0].equals(card)) {
        found = true;
        if (x[1] === 1) {
          return null;
        }
        return [card, x[1] - 1];
      }
      return x;
    }).filter(x => x !== null) as CardAndCount[];
    if(!found) {
      throw new InvalidDeckOperation('cannot remove a card which is missing in the deck');
    }
    return this.withCards(updatedCards);
  }
}

export const initialDeck = fromUrl();

export function deckReducer(deck: AvatarAndCards, action: DeckActionType): AvatarAndCards {
  switch (action.type) {
    case 'add': {
      try {
        return deck.withAnyCard(action.card).withEvent(action);
      } catch (e) {
        if (e instanceof InvalidDeckOperation) {
          console.debug(e.message);
          return deck;
        }
        throw e;
      }
    }
    case 'remove': {
      return deck.withoutCard(action.card).withEvent(action);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

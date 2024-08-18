import {Card, CardType, DeckSort} from './Card.ts';
import {DeckActionType} from '../deck/context/DeckContext.ts';

export type CardCount = 1 | 2 | 3 | 4;

export class CardAndCount {
  constructor(public readonly card: Card, public readonly count: CardCount) {
    this.validate();
  }

  static oneOf(card: Card) {
    return new CardAndCount(card, 1);
  }

  maxCount(): 1 | 4 {
    return this.card.type === CardType.Avatar ? 1 : 4;
  }

  validate() {
    if (this.count < 1 || this.maxCount() < this.count) {
      throw new Error(`invalid amount ${this.count} for card ${this.card.id}`);
    }
  }

  withDecrement() {
    return this.withCount(this.count - 1 as CardCount);
  }

  withIncrement() {
    return this.withCount(this.count + 1 as CardCount);
  }

  withCount(count: CardCount): CardAndCount {
    return new CardAndCount(this.card, count);
  }
}

export class InvalidDeckOperation extends Error {
}

export class AvatarAndCards {

  static empty(): AvatarAndCards {
    return new AvatarAndCards(undefined, [], undefined);
  }

  private constructor(public readonly avatar: Card | undefined, public readonly cards: CardAndCount[], public readonly lastEvent: DeckActionType | undefined) {
  }

  allCards(): CardAndCount[] {
    if (this.avatar === undefined) {
      return this.cards;
    }
    return [CardAndCount.oneOf(this.avatar), ...this.cards];
  }

  countByType(card: Card): number {
    const thisTuple = this.allCards()
      .filter(x => x.card.equals(card));
    return thisTuple.length === 0 ? 0 : thisTuple[0].count;
  }

  count(): number {
    return this.allCards()
      .map(x => x.count)
      .reduce((a, b) => a + b, 0);
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
    if (newCard.type === CardType.Avatar && this.avatar === undefined) {
      return this.withAvatar(newCard);
    }
    if (existingCount === 0) { // append to end
      return this.withCards([...this.cards, CardAndCount.oneOf(newCard)]);
    }
    // increment count of cards only
    return this.withCards(this.cards.map(x => {
      if (x.card.equals(newCard)) {
        return x.withIncrement();
      }
      return x;
    }));
  }

  withAvatar(avatar: Card | undefined) {
    return new AvatarAndCards(avatar, this.cards, this.lastEvent).sorted();
  }

  private sorted(): AvatarAndCards {
    const sortedCards = this.cards.slice()
      .sort((a, b) => DeckSort.byId(a.card, b.card))
      .sort((a, b) => a.card.costNumber(this.avatar?.fraction) - b.card.costNumber(this.avatar?.fraction));
    return new AvatarAndCards(this.avatar, sortedCards, this.lastEvent);
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
      if (x.card.equals(card)) {
        found = true;
        if (x.count === 1) {
          return null;
        }
        return x.withDecrement();
      }
      return x;
    })
      .filter(x => x !== null) as CardAndCount[];
    if (!found) {
      throw new InvalidDeckOperation('cannot remove a card which is missing in the deck');
    }
    return this.withCards(updatedCards);
  }
}

import {AvatarStats, Card} from '../core/Card.ts';

type PlayerId = number;
type GameCardId = number;

export interface Deck {
  avatar: Card;
  cards: {
    card: Card; count: 1 | 2 | 3 | 4;
  }[];
}

export class GameCard {
  private static freeUid = 1000;

  private constructor(readonly uid: GameCardId,
    readonly card: Card,
    readonly ownerId: PlayerId,
    readonly customState?: object) {
  }

  static fromCard(card: Card, ownerId: PlayerId) {
    return new GameCard(GameCard.freeUid++, card, ownerId);
  }
}

export interface LastingCard {
  // the actual card
  readonly gameCard: GameCard;
  // card is turned sideways: will be restored at the beginning of your round
  isExhausted: boolean;
}

export class Throne {
  constructor(// Avatar of the current game, can be resting or be an active character on the board
    readonly avatar: GameCard, // number of times the Avatar was killed in battle, makes it more expensive to replay
    deathCounter: number) {
  }

  static fromCard(avatar: GameCard): Throne {
    return new Throne(avatar, 0);
  }
}

export interface CharacterInPlay extends LastingCard {
  // Hint that this cards was played in the current round.
  isFirstRound: boolean;
  // health of the card: resets at the end of every round
  currentHealth: number;
  // Attached items (effects) and temporary actions.
  effects: GameCard[];
  // "Zählter", amount of [+1/+1] tokens attachted to this character.
  tokenCount: number;
}

export class Player {
  private static freeUid = 0;

  constructor(private readonly uid: PlayerId,
    // Current health of the player. Initially defined by the Avatar. Dead when it reaches zero.
    health: number,
    // Items (and other temporary cards) that are paid but not yet in use
    effectStash: GameCard[],
    // All cards currently in hand.
    hand: GameCard[],
    // Lazarett/sick bay: where all cards usually go when removed from the game.
    hospital: GameCard[],
    // The place to draw new cards from. Game is lost when no card can be drawn.
    stack: GameCard[],
    // "Macht"... used to pay for cards.
    power: LastingCard[],
    // Active characters in play owned by the current character.
    table: CharacterInPlay[],
    // Where the Avatar is defined.
    throne: Throne) {
  }

  static fromDeck(deck: Deck): Player {
    const playerId = Player.freeUid++;
    const health = (deck.avatar.stats as AvatarStats).health;
    const throne = Throne.fromCard(GameCard.fromCard(deck.avatar, playerId));
    const stack = deck.cards.flatMap(
      cardAndCount => [...Array(cardAndCount.count)].map(() => GameCard.fromCard(cardAndCount.card, playerId)));
    return new Player(playerId, health, [], [], [], stack, [], [], throne);
  }

  function playCardToTable(gameCard: GameCard) {
    this.
  }
}

export interface DeclaredAttack {
  // The attaching character
  from: CharacterInPlay;
  // The target of the attack
  to: CharacterInPlay | 'player';
  // TODO: maybe this does not depend on the individual attach, but could be global
  phase: 'declared' | 'first-strike-done' | 'strike-done' | 'post-strike-done';
}

export class TurnPhase {
  private constructor(type: 'recover' | 'draw' | 'prep' | 'fight' | 'linger' | 'finish',
    isPowerPlayed: boolean,
    attacks: DeclaredAttack[],
    blocks: DeclaredAttack[]){}

  static newTurn() {
    return new TurnPhase('recover', false, [], []);
  }
}

export class GameState {
  constructor(players: Player[],
    activePlayerUid: PlayerId,
    turnCount: number,
    turnPhase: TurnPhase) {
  }

  static fromDecks(decks: Deck[]): GameState {
    const players = decks.map(deck => Player.fromDeck(deck));
    return new GameState(players, players[0].uid, 0, TurnPhase.newTurn());
  }
}


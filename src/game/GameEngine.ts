type CardId = number;

/**
 * Defines the set of cards a single player will use.
 * Only relevant at the start of the game.
 */
type Deck = {
  readonly avatar: CardId
  readonly cards: {
    readonly card: CardId
    readonly count: 1 | 2 | 3 | 4
  }[]
}

type PlayerId = number;
type GameCardId = number;
type Serializable = object;

/**
 * An actual card which is part of the game (hand, deck,... anywhere).
 * The physical card is uniquely identifyable by this (in contrast to Card).
 */
type GameCard = {
  // Unique id of that card over the whole lifetime of a game
  readonly uid: GameCardId
  readonly card: CardId
  // The player that had this card in her deck initially.
  // Not required to be in her posession atm.
  readonly ownerId: PlayerId
  // some complex cards need to hold custom state
  customState?: Serializable
}

type LastingCard = {
  readonly card: GameCard
  // card is turned sideways: it is usually restored at the beginning of your round
  isExhausted: boolean
}

/**
 * defines the throne (no matter if occupied or not)
 */
type Throne = {
  readonly avatar: GameCardId
  deathCounter: number
}

/**
 * A character (or avatar) that rests face-up on the table.
 */
type CharacterInPlay = LastingCard & {
  // Hint that this cards was played in the current round.
  isFirstRound: boolean
  // health of the card: resets at the end of every round
  currentHealth: number
  // Attached items (effects) and temporary actions.
  effects: GameCardId[]
  // "Zählter", amount of [+1/+1] tokens attachted to this character.
  tokenCount: number
}

type PowerInPlay = LastingCard

/**
 * The player "Spieler" aka human.
 */
type Player = {
  // Current health of the player. Initially defined by the Avatar. Dead when it reaches zero.
  health: number
  // Items (and other temporary cards) that are paid but not yet in use
  effectStash: GameCardId[]
  // All cards currently in hand.
  hand: GameCardId[]
  // Lazarett/sick bay: where all cards usually go when removed from the game.
  hospital: GameCardId[]
  // The place to draw new cards from. Game is lost when no card can be drawn.
  stack: GameCardId[]
  // "Macht"... used to pay for cards.
  power: PowerInPlay[]
  // Active characters in play owned by the current character.
  table: CharacterInPlay[]
  // Where the Avatar is defined.
  readonly throne: Throne
}

/**
 * A CardInPlay declaring an attack on another CardInPlay or the opponent.
 */
type AttackDeclaration = {
  // The attacking character
  readonly from: GameCardId
  // The target of the attack
  readonly to: GameCardId | PlayerId
}

/**
 * Declaration of a card being played and what it does/targets.
 */
type CardAction = {
  // who did the action
  readonly player: PlayerId
  // what card was affected (often-times a played card)
  readonly card: GameCardId
  readonly event: 'wirken' | 'neutralisieren' | 'other' // needed??
  // the target of the attack
  readonly target: PlayerId | GameCardId | 'no-target' // likely a list in some cases??
}

type ActionChain = {
  // the player having priority and is allowed to define actions
  activePlayer: PlayerId
  // a stack of actions, to be resolved from the end
  actionsChain: CardAction[] // maybe a list of chain-links??
}

type MainTurnPhase = 'recover' | 'draw' | 'prep' | 'fight' | 'linger' | 'finish'
type FightTurnPhase = 'declared' | 'blocked' | 'first-striked' | 'striked' | 'post-striked';

type RoundState = {
  // currently active player
  readonly activePlayer: PlayerId
  // official phase we are in (fighting or playing cards)
  phase: MainTurnPhase | FightTurnPhase
  // if the "free" power is played, more power might be played depending on cards
  isPowerPlayed: boolean
  // whenever a card was played, not defined while the game is "quiet"
  openActions?: ActionChain
  attacks: AttackDeclaration[]
  blocks: AttackDeclaration[]
}

type GameState = {
  readonly players: Player[]
  round: RoundState
  seed: number
}

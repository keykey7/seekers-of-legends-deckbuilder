import {Card} from '../core/Card.ts';

interface GameCard {
  readonly uid: number;
  readonly card: Card;
  readonly owner: Player;
  customState?: object;
}

interface LastingCard {
  readonly gameCard: GameCard;
  isExhausted: boolean;
}

interface Throne {
  readonly avatar: GameCard;
  isResting: boolean;
  deathCounter: number;
}

interface CharacterInPlay extends LastingCard {
  isFirstRound: boolean;
  currentHealth: number;
  effects: GameCard[];
  tokenCount: number;
}

interface Player {
  readonly uid: number;
  health: number;
  effectStash: GameCard[];
  hand: GameCard[];
  hospital: GameCard[];
  stack: GameCard[];
  force: LastingCard[];
  table: CharacterInPlay[];
  throne: Throne;
}

interface DeclaredAttack {
  from: CharacterInPlay;
  to: CharacterInPlay | 'player';
  phase: 'declared' | 'first-strike-done' | 'strike-done' | 'post-strike-done';
}

interface TurnPhase {
  type: 'recover' | 'draw' | 'prep' | 'fight' | 'linger' | 'finish';
  isForcePlayed: boolean;
  fightState: {
    attacks: DeclaredAttack[];
    blocks: DeclaredAttack[];
  };
}

interface GameState {
  players: Player[];
  activePlayer: Player;
  field: GameCard[];
  // customState: [string]: string;
  turnCount: number;
  turnPhase: TurnPhase;
}

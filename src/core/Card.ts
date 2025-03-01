export const Fractions = ['BLUE', 'RED', 'VIOLET', 'WHITE', 'YELLOW', 'BLACK', 'GREEN', 'BROWN'];
export const FractionNames = [
  'Vaiunas', 'Vaakhil', 'Tempestrier', 'Renischen', 'Heepurianer', 'Dunlaar', 'Cofaleri', 'Archtaren',
];
export const FractionsColors = ['#437282', '#b71d25', '#6e439f', '#d5d5d5', '#bdb218', '#1b191a', '#2f963d', '#583016'];
export type Fraction = typeof Fractions[number];

export enum CardType {Avatar, Charakter, Einfluss, Aktion, Feld }

export type CardCost = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'X';

export type CardCostModifier = 0 | 1 | 2;

export enum Skill {
  Flug = 'Flug',
  Fernkampf = 'Fernkampf', // legacy naming: Reichweite
  Hast = 'Hast',
  Ausdauer = 'Ausdauer',
  Lebensraub = 'Lebensraub',
  Ersthieb = 'Ersthieb',
  Doppelhieb = 'Doppelhieb',
  Dreifachhieb = 'Dreifachhieb',
  Durchbruch = 'Durchbruch',
  Duellant = 'Duellant',
  Faeulnis = 'Fäulnis',
  Ansturm = 'Ansturm',
  Festigung = 'Festigung',
  Verhuellung = 'Verhüllung',
  Schild = 'Schild',
  Unbesiegbarkeit = 'Unbesiegbarkeit',
  Schnelligkeit = 'Schnelligkeit',
}

export interface CharacterStats {
  attack: number | 'X',
  defence: number | 'X',
}

export interface AvatarStats extends CharacterStats {
  health: number,
}

export class Card {
  // eslint-disable-next-line max-params
  constructor(public readonly id: number,
    public readonly cost: CardCost,
    public readonly name: string,
    public readonly type: CardType,
    public readonly fraction: Fraction,
    public readonly description: string,
    public readonly stats: CharacterStats | AvatarStats | null = null,
    public readonly skill: Skill[] = []) {
    if ((this.type === CardType.Charakter || this.type === CardType.Avatar) && this.stats === null) {
      throw new Error(`character ${id} missing stats`);
    }
    if (this.type === CardType.Avatar && (this.stats === null || !('health' in this.stats))) {
      throw new Error(`avatar ${id} missing stats`);
    }
    if (this.type === CardType.Charakter && (this.stats === null || ('health' in this.stats))) {
      throw new Error(`character ${id} has health`);
    }
    if ((this.type === CardType.Feld || this.type === CardType.Aktion || this.type === CardType.Einfluss) && stats !== null) {
      throw new Error(`non-character ${id} has stats`);
    }
  }

  getMaxCount(): 1 | 4 {
    return this.type === CardType.Avatar ? 1 : 4;
  }

  costNumber(avatarFraction: Fraction | undefined = undefined): number {
    return this.cost === 'X' ? 1 : this.cost + this.costModifier(avatarFraction);
  }

  equals(other: Card | undefined): boolean {
    return this.id === other?.id;
  }

  imageSrc(): string {
    return `/cards/card-${String(this.id).padStart(3, '0')}.jpg`;
  }

  costModifier(avatarFraction: Fraction | undefined): CardCostModifier {
    if (avatarFraction === undefined || avatarFraction === this.fraction) {
      return 0;
    }
    const expensiveMap: { [key in Fraction]: Fraction } = {
      BLUE: 'YELLOW',
      RED: 'BLUE',
      VIOLET: 'GREEN',
      WHITE: 'BLACK',
      YELLOW: 'BROWN',
      BLACK: 'WHITE',
      GREEN: 'RED',
      BROWN: 'VIOLET',
    };
    if (expensiveMap[avatarFraction] === this.fraction) {
      return 2;
    }
    return 1;
  }
}

export const DeckSort = {
  byId: (a: Card, b: Card) => a.id - b.id,
  byFraction: (a: Card, b: Card) => Fractions.indexOf(a.fraction) - Fractions.indexOf(b.fraction),
  byCost: (a: Card, b: Card) => a.costNumber() - b.costNumber(),
  byType: (a: Card, b: Card) => a.type - b.type,
};

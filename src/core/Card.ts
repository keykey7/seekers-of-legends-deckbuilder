export const Fractions = ['BLUE', 'RED', 'VIOLET', 'WHITE', 'YELLOW', 'BLACK', 'GREEN', 'BROWN'];
export const FractionNames = ['', 'Vaakhil', '', '', 'Heepurianer', '', '', 'Archtaren'];
export const FractionsColors = ['#437282', '#b71d25', '#6e439f', '#d5d5d5', '#bdb218', '#1b191a', '#2f963d', '#583016'];
export type Fraction = typeof Fractions[number];

export enum CardType {Avatar, Charakter, Einfluss, Aktion, Feld }

export type CardCost = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'X';

export type CardCostModifier = 0 | 1 | 2;

export enum Skill {
  Flug,
  Fernkampf,
  Hast,
  Ausdauer,
  Lebensraub,
  Ersthieb,
  Doppelhieb,
  Dreifachhieb,
  Durchbruch,
  Duellant,
  Faeulnis,
  Ansturm,
  Festigung,
  Verhuellung,
  Schild,
  Unbesiegbarkeit,
  Schnelligkeit,
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
  constructor(
    public readonly id: number,
    public readonly cost: CardCost,
    public readonly name: string,
    public readonly type: CardType,
    public readonly fraction: Fraction,
    public readonly description: string,
    public readonly stats: CharacterStats | AvatarStats | null = null,
    public readonly skill: Skill[] = [],
  ) {
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

  costModifier(targetFraction: Fraction | undefined): CardCostModifier {
    if (targetFraction === undefined || targetFraction === this.fraction) {
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
    if (expensiveMap[this.fraction] === targetFraction) {
      return 2;
    }
    return 1;
  }

  matchesText(text: string): boolean {
    // lowercase, then drop accents (ä -> a), then we drop non-ascii
    const normalize = (x: string) => x.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9+]/ug, ' ');
    const needle = normalize(text).trim();
    const haystack = normalize(' ' + this.name + ' ' + this.description);
    return haystack.includes(' ' + needle)
      // eslint-disable-next-line eqeqeq
      || this.cost == needle
      || CardType[this.type].toLowerCase().startsWith(needle)
      || this.skill.find(skill => Skill[skill].toLowerCase().startsWith(needle)) !== undefined;
  }
}

export const DeckSort = {
  byId: (a: Card, b: Card) => a.id - b.id,
  byFraction: (a: Card, b: Card) => Fractions.indexOf(a.fraction) - Fractions.indexOf(b.fraction),
  byCost: (a: Card, b: Card) => a.costNumber() - b.costNumber(),
  byType: (a: Card, b: Card) => a.type - b.type,
};

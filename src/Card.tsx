export const Fractions = ["BLUE" , "RED" , "VIOLET" , "WHITE" , "YELLOW" , "BLACK" , "GREEN" , "BROWN"];
export const FractionNames = ["", "Vaakhil", "", "", "Heepurianer", "", "", "Archtaren"]
export const FractionsColors = ["#437282" , "#b71d25" , "#6e439f" , "#d5d5d5" , "#bdb218" , "#1b191a" , "#2f963d" , "#583016"];
export type Fraction = typeof Fractions[number];

// eslint-disable-next-line no-shadow
export enum CardType {Avatar, Charakter, Einfluss, Aktion, Feld }

export type CardCost = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'X';

export type CardCostModifier = 0 | 1 | 2;

// eslint-disable-next-line no-shadow
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

interface CharacterStats {
  attack: number | 'X',
  defence: number | 'X',
}

interface AvatarStats extends CharacterStats {
  health: number,
}

function s(attack: number | 'X', defence: number | 'X', health: number | null = null): CharacterStats | AvatarStats {
  const characterStats = {
    attack,
    defence,
  };
  if (health === null) {
    return characterStats;
  }
  return {
    ...characterStats,
    health,
  };
}

export class Card {
  // eslint-disable-next-line max-params
  constructor(
    public readonly id: number,
    public readonly cost: CardCost,
    public readonly name: string,
    public readonly type: CardType,
    public readonly fraction: Fraction,
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

  costNumber(avatarFraction: Fraction | undefined = undefined) : number {
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
      'BLUE': 'YELLOW',
      'RED': 'BLUE',
      'VIOLET': 'GREEN',
      'WHITE': 'BLACK',
      'YELLOW': 'BROWN',
      'BLACK': 'WHITE',
      'GREEN': 'RED',
      'BROWN': 'VIOLET',
    };
    if (expensiveMap[this.fraction] === targetFraction) {
      return 2;
    }
    return 1;
  }

  matchesText(text: string): boolean {
    const lc = text.toLowerCase();
    return this.name.toLowerCase().includes(lc)
      // eslint-disable-next-line eqeqeq
      || this.cost == lc
      || CardType[this.type].toLowerCase().startsWith(lc)
      || this.skill.find(skill => Skill[skill].toLowerCase().startsWith(lc)) !== undefined;
  }
}

export const DeckSort = {
  byFraction: (a: Card, b: Card) => Fractions.indexOf(a.fraction) - Fractions.indexOf(b.fraction),
  byCost: (a: Card, b: Card) => a.costNumber() - b.costNumber(),
  byType: (a: Card, b: Card) => a.type - b.type,
}

export const allCards: Readonly<Card[]> = [
  new Card(1, 5, 'Neues Land entdecken', CardType.Aktion, 'BLUE'),
  new Card(2, 4, 'Lazaros, der Wächter', CardType.Avatar, 'BLUE', s(3, 5, 40)),
  new Card(3, 4, 'Wasserwandlerin', CardType.Charakter, 'BLUE', s('X', 'X')),
  new Card(4, 1, 'Wasserritual', CardType.Aktion, 'BLUE', null, [Skill.Schnelligkeit]),
  new Card(5, 1, 'Versinken', CardType.Aktion, 'BLUE'),
  new Card(6, 3, 'Tiefsee', CardType.Feld, 'BLUE'),
  new Card(7, 3, 'Stürmische See', CardType.Feld, 'BLUE'),
  new Card(8, 2, 'Schwert des Wassers', CardType.Einfluss, 'BLUE'),
  new Card(9, 2, 'Tiefenkrieger', CardType.Charakter, 'BLUE', s(3, 5), [Skill.Schnelligkeit]),
  new Card(10, 3, 'Psari Klonos', CardType.Charakter, 'BLUE', s('X', 'X')),
  new Card(11, 3, 'Prinzessin Amaryllis', CardType.Avatar, 'BLUE', s(4, 8, 45)),
  new Card(12, 5, 'Panzerspeer Okeanos', CardType.Avatar, 'BLUE', s(5, 10, 40)),
  new Card(13, 4, 'Mächtiger Wasserschild', CardType.Aktion, 'BLUE', null, [Skill.Schnelligkeit]),
  new Card(14, 3, 'Kirian', CardType.Charakter, 'BLUE', s(3, 2), [Skill.Schnelligkeit]),
  new Card(15, 1, 'Kartographieren', CardType.Aktion, 'BLUE', null, [Skill.Schnelligkeit]),
  new Card(16, 2, 'Eindringen in die Seele', CardType.Aktion, 'BLUE'),
  new Card(17, 3, 'Durch den Strudel', CardType.Aktion, 'BLUE'),
  new Card(18, 3, 'Chiton Thorax', CardType.Charakter, 'BLUE', s(7, 5)),
  new Card(19, 1, 'Auf den Meeresgrund versenken', CardType.Aktion, 'BLUE', null, [Skill.Schnelligkeit]),
  new Card(20, 7, 'Anisy Thalassa', CardType.Charakter, 'BLUE', s(14, 16), [Skill.Schnelligkeit]),
  new Card(21, 1, 'Zersplittern', CardType.Aktion, 'RED', null, [Skill.Schnelligkeit]),
  new Card(22, 1, 'Siwarat', CardType.Charakter, 'RED', s(3, 1)),
  new Card(23, 3, 'Mirza Feuerchimäre', CardType.Charakter, 'RED', s(10, 2), [Skill.Durchbruch, Skill.Schild]),
  new Card(24, 2, 'Lavastürmerin', CardType.Charakter, 'RED', s(2, 2)),
  new Card(25, 2, 'Lavakristallmagier', CardType.Charakter, 'RED', s(1, 1), [Skill.Schnelligkeit]),
  new Card(26, 2, 'Freisetzung der Feuersbrunst', CardType.Aktion, 'RED'),
  new Card(27, 3, 'Erbstück des Feuers', CardType.Einfluss, 'RED'),
  new Card(28, 'X', 'Beschwörung des Infernos', CardType.Aktion, 'RED'),
  new Card(29, 'X', 'Späherin Nima', CardType.Charakter, 'RED', s(0, 0)),
  new Card(30, 3, 'Raneneeti Akshara', CardType.Avatar, 'RED', s(5, 5, 40)),
  new Card(31, 2, 'Magmakammer', CardType.Feld, 'RED'),
  new Card(32, 4, 'Harleen, die Quartiermeisterin', CardType.Charakter, 'RED', s(8, 6)),
  new Card(33, 4, 'Harjit Uruk', CardType.Avatar, 'RED', s(6, 8, 35)),
  new Card(34, 5, 'Flammenvedan', CardType.Charakter, 'RED', s(10, 8)),
  new Card(35, 2, 'Feuerarena', CardType.Feld, 'RED'),
  new Card(36, 2, 'Arjuna Feuerbeschwörer', CardType.Charakter, 'RED', s(5, 3)),
  new Card(37, 1, 'Völlerei', CardType.Aktion, 'RED', null, [Skill.Schnelligkeit]),
  new Card(38, 2, 'Jaspal', CardType.Charakter, 'RED', s(2, 4)),
  new Card(39, 2, 'Feuerring', CardType.Aktion, 'RED', null, [Skill.Schnelligkeit]),
  new Card(40, 3, 'Dinesh Bhasin', CardType.Avatar, 'RED', s(6, 3, 30), [Skill.Hast]),
  new Card(41, 2, 'Zeit zurückdrehen', CardType.Aktion, 'VIOLET', null, [Skill.Schnelligkeit]),
  new Card(42, 1, 'Weissagung der Wolken', CardType.Aktion, 'VIOLET'),
  new Card(43, 1, 'Wanderin Yui', CardType.Charakter, 'VIOLET', s(3, 1), [Skill.Verhuellung]),
  new Card(44, 4, 'Tenshi Jakun', CardType.Charakter, 'VIOLET', s(4, 2)),
  new Card(45, 2, 'Sturmbastion', CardType.Feld, 'VIOLET'),
  new Card(46, 8, 'Sasaki Jojiro', CardType.Avatar, 'VIOLET', s(10, 12, 45)),
  new Card(47, 3, 'Ratsältester Kankei', CardType.Avatar, 'VIOLET', s(8, 2, 35)),
  new Card(48, 3, 'Naoki, der Windgeist', CardType.Charakter, 'VIOLET', s(4, 3), [Skill.Festigung, Skill.Flug]),
  new Card(49, 3, 'Kaze Oni', CardType.Charakter, 'VIOLET', s(5, 2), [Skill.Schnelligkeit, Skill.Flug]),
  new Card(50, 2, 'Katano Hikaoki', CardType.Avatar, 'VIOLET', s(4, 2, 40)),
  new Card(51, 2, 'Karasu Späher', CardType.Charakter, 'VIOLET', s(1, 1), [Skill.Flug]),
  new Card(52, 1, 'Ins Glas einschliessen', CardType.Aktion, 'VIOLET', null, [Skill.Schnelligkeit]),
  new Card(53, 4, 'Hitomi Arashi', CardType.Charakter, 'VIOLET', s(2, 2), [Skill.Flug]),
  new Card(54, 2, 'Gewitterring', CardType.Einfluss, 'VIOLET'),
  new Card(55, 10, 'Asuka Hitama', CardType.Charakter, 'VIOLET', s(10, 10), [Skill.Schild]),
  new Card(56, 2, 'Amethystabwehr', CardType.Aktion, 'VIOLET', null, [Skill.Schnelligkeit]),
  new Card(57, 3, 'Zeit zerschneiden', CardType.Aktion, 'VIOLET', null, [Skill.Schnelligkeit]),
  new Card(58, 3, 'Nebeltrunk', CardType.Aktion, 'VIOLET'),
  new Card(59, 4, 'Halluzination', CardType.Aktion, 'VIOLET'),
  new Card(60, 6, 'En No Ozuno', CardType.Charakter, 'VIOLET', s(8, 12), [Skill.Verhuellung]),
  new Card(61, 2, 'Zeitsprungritual', CardType.Aktion, 'WHITE'),
  new Card(62, 6, 'Vereinigung mit dem Licht', CardType.Aktion, 'WHITE'),
  new Card(63, 6, 'Tarshishim Prinzessin', CardType.Charakter, 'WHITE', s(10, 10), [Skill.Flug, Skill.Ausdauer]),
  new Card(64, 7, 'Shianim Prinz', CardType.Charakter, 'WHITE', s(12, 12), [Skill.Flug, Skill.Verhuellung]),
  new Card(65, 1, 'Schwereloser Bogen', CardType.Einfluss, 'WHITE'),
  new Card(66, 3, 'Malakim Späherin', CardType.Charakter, 'WHITE', s(4, 3), [Skill.Flug]),
  new Card(67, 2, 'Magisches Schachbrett', CardType.Feld, 'WHITE'),
  new Card(68, 5, 'Leuchtender Ishim', CardType.Charakter, 'WHITE', s(4, 4), [Skill.Flug]),
  new Card(69, 3, 'Kristallheilung', CardType.Aktion, 'WHITE'),
  new Card(70, 2, 'Himmlische Intervention', CardType.Aktion, 'WHITE', null, [Skill.Schnelligkeit]),
  new Card(71, 3, 'Heilige Shahal', CardType.Charakter, 'WHITE', s(4, 6), [Skill.Flug, Skill.Schild]),
  new Card(72, 4, 'Hashmallim des Schwertes', CardType.Charakter, 'WHITE', s(6, 6), [Skill.Festigung]),
  new Card(73, 2, 'Erelim Medium', CardType.Charakter, 'WHITE', s(1, 1), [Skill.Flug]),
  new Card(74, 1, 'Erelim Erzählerin', CardType.Charakter, 'WHITE', s(2, 1), [Skill.Flug]),
  new Card(75, 2, 'Elohim Infanterie', CardType.Charakter, 'WHITE', s(2, 2), [Skill.Flug, Skill.Durchbruch]),
  new Card(76, 4, 'Amos Agron', CardType.Avatar, 'WHITE', s(5, 5, 35), [Skill.Flug]),
  new Card(77, 6, 'Zuriel, das sanfte Licht', CardType.Avatar, 'WHITE', s(4, 10, 40), [Skill.Ausdauer]),
  new Card(78, 4, 'Shamayim, die Himmlische', CardType.Avatar, 'WHITE', s(6, 4, 40), [Skill.Flug, Skill.Ersthieb]),
  new Card(79, 1, 'Segnung des Trankes', CardType.Aktion, 'WHITE', null, [Skill.Schnelligkeit]),
  new Card(80, 1, 'Einhornrune', CardType.Einfluss, 'WHITE'),
  new Card(81, 4, 'Vis, die Entscheiderin', CardType.Avatar, 'YELLOW', s(6, 4, 35), [Skill.Ersthieb]),
  new Card(82, 2, 'Vereidigender Triarius', CardType.Charakter, 'YELLOW', s(6, 2), [Skill.Fernkampf, Skill.Festigung]),
  new Card(83, 3, 'Thulius Feuerblitz', CardType.Avatar, 'YELLOW', s(4, 5, 30), [Skill.Hast]),
  new Card(84, 2, 'Seemanöver', CardType.Aktion, 'YELLOW', null, [Skill.Schnelligkeit]),
  new Card(85, 1, 'Schützender Princeps', CardType.Charakter, 'YELLOW', s(1, 1)),
  new Card(86, 2, 'Schildwall', CardType.Aktion, 'YELLOW', null, [Skill.Schnelligkeit]),
  new Card(87, 2, 'Leuchtende Explorata', CardType.Charakter, 'YELLOW', s(6, 5), [Skill.Schnelligkeit]),
  new Card(88, 1, 'Impeta Fulgur', CardType.Charakter, 'YELLOW', s(4, 1), [Skill.Schnelligkeit]),
  new Card(89, 1, 'Hafenstadt', CardType.Feld, 'YELLOW', null, [Skill.Schnelligkeit]),
  new Card(90, 1, 'Feldweg', CardType.Feld, 'YELLOW'),
  new Card(91, 2, 'Fabrius Artificum', CardType.Charakter, 'YELLOW', s(1, 1)),
  new Card(92, 4, 'Custos Armorum', CardType.Charakter, 'YELLOW', s(2, 6), [Skill.Ansturm]),
  new Card(93, 3, 'Blitz Rorarius', CardType.Charakter, 'YELLOW', s(5, 3)),
  new Card(94, 2, 'Blaublitz Magus', CardType.Charakter, 'YELLOW', s(4, 1), [Skill.Ersthieb]),
  new Card(95, 2, 'Bellona, Anführerin der goldenen Legion', CardType.Avatar, 'YELLOW', s(3, 3, 40)),
  new Card(96, 1, 'Balanceakt', CardType.Aktion, 'YELLOW', null, [Skill.Schnelligkeit]),
  new Card(97, 1, 'Angreifender Hastatus', CardType.Charakter, 'YELLOW', s(2, 2), [Skill.Ansturm]),
  new Card(98, 4, 'Kommandierende Primus', CardType.Charakter, 'YELLOW', s(6, 4), [Skill.Ansturm]),
  new Card(99, 3, 'Wildnis', CardType.Feld, 'YELLOW'),
  new Card(100, 2, 'Verlorenes Arsenal', CardType.Einfluss, 'YELLOW'),
  new Card(101, 2, 'Verwesung', CardType.Aktion, 'BLACK', null, [Skill.Schnelligkeit]),
  new Card(102, 1, 'Versklavter Bypochtbonia', CardType.Charakter, 'BLACK', s(1, 1), [Skill.Faeulnis]),
  new Card(103, 1, 'Sog der Dunkelheit', CardType.Aktion, 'BLACK', null, [Skill.Schnelligkeit]),
  new Card(104, 1, 'Seelenverschlingendes Schwert', CardType.Einfluss, 'BLACK'),
  new Card(105, 3, 'Ritual der Verbannung', CardType.Aktion, 'BLACK'),
  new Card(106, 3, 'Pure Dunkelheit', CardType.Feld, 'BLACK'),
  new Card(107, 2, 'Misophaes Bote', CardType.Charakter, 'BLACK', s(1, 1), [Skill.Flug, Skill.Faeulnis]),
  new Card(108, 1, 'Gebundener Misophaes', CardType.Charakter, 'BLACK', s(0, 5), [Skill.Flug, Skill.Verhuellung]),
  new Card(109, 3, 'Enalia Wächterin', CardType.Charakter, 'BLACK', s(5, 3), [Skill.Flug, Skill.Lebensraub]),
  new Card(110, 3, 'Dunkle Auferstehung', CardType.Aktion, 'BLACK'),
  new Card(111, 2, 'Die Sündering Azazel', CardType.Avatar, 'BLACK', s(3, 2, 40), [Skill.Flug]),
  new Card(112, 3, 'Chthonia Kriegstreiber', CardType.Charakter, 'BLACK', s(4, 4), [Skill.Flug]),
  new Card(113, 4, 'Asbeel, der Aufgegebene', CardType.Avatar, 'BLACK', s(2, 8, 45), [Skill.Flug, Skill.Verhuellung]),
  new Card(114, 2, 'Albtraumflur', CardType.Feld, 'BLACK'),
  new Card(115, 4, 'Aeria Höllenbotin', CardType.Charakter, 'BLACK', s(4, 2), [Skill.Flug]),
  new Card(116, 2, 'Adelsfriedhof', CardType.Feld, 'BLACK'),
  new Card(117, 4, 'Schwarze Krönung', CardType.Aktion, 'BLACK'),
  new Card(118, 5, 'Ieshim, die Wächterin', CardType.Avatar, 'BLACK', s(6, 10, 35), [Skill.Lebensraub]),
  new Card(119, 3, 'Hyraia Wächterin', CardType.Charakter, 'BLACK', s(6, 4), [Skill.Lebensraub]),
  new Card(120, 2, 'Fluch des Ebenbilds', CardType.Aktion, 'BLACK'),
  new Card(121, 3, 'Wurzelspeer', CardType.Einfluss, 'GREEN'),
  new Card(122, 2, 'Wächter Chimali', CardType.Avatar, 'GREEN', s(1, 1, 45)),
  new Card(123, 1, 'Späherin Tochtli', CardType.Charakter, 'GREEN', s(1, 5), [Skill.Fernkampf]),
  new Card(124, 1, 'Rast im Grünen', CardType.Aktion, 'GREEN', null, [Skill.Schnelligkeit]),
  new Card(125, 3, 'Priesterin Amankaya', CardType.Avatar, 'GREEN', s(1, 7, 35), [Skill.Lebensraub]),
  new Card(126, 1, 'Neuer Anfang', CardType.Aktion, 'GREEN', null, [Skill.Schnelligkeit]),
  new Card(127, 2, 'Nagual Tauren', CardType.Charakter, 'GREEN', s(1, 1)),
  new Card(128, 2, 'Mayel, die Diplomatin', CardType.Charakter, 'GREEN', s(1, 1), [Skill.Ausdauer]),
  new Card(129, 2, 'Geisterwald', CardType.Feld, 'GREEN'),
  new Card(130, 3, 'Formwandler Itzli', CardType.Charakter, 'GREEN', s(1, 1), [Skill.Durchbruch]),
  new Card(131, 1, 'Einnahme des Lebenstranks', CardType.Aktion, 'GREEN', null, [Skill.Schnelligkeit]),
  new Card(132, 1, 'Cantico', CardType.Charakter, 'GREEN', s(1, 1)),
  new Card(133, 2, 'Buch der Natur', CardType.Einfluss, 'GREEN'),
  new Card(134, 1, 'Bad im heildenden See', CardType.Aktion, 'GREEN', null, [Skill.Schnelligkeit]),
  new Card(135, 2, 'Alter Xulan', CardType.Charakter, 'GREEN', s(1, 1), [Skill.Ausdauer, Skill.Lebensraub]),
  new Card(136, 2, 'Adeptin Payaan', CardType.Charakter, 'GREEN', s(5, 4), [Skill.Lebensraub]),
  new Card(137, 1, 'Verwurzelter Wald', CardType.Feld, 'GREEN'),
  new Card(138, 2, 'Gaten des Seelenfriedens', CardType.Feld, 'GREEN'),
  new Card(139, 3, 'Naay, die Weise', CardType.Charakter, 'GREEN', s(7, 5)),
  new Card(140, 6, 'Amoztli, die Hüterin', CardType.Avatar, 'GREEN', s(6, 6, 40), [Skill.Fernkampf]),
  new Card(141, 1, 'Tunnelgräber', CardType.Charakter, 'BROWN', s(1, 3), [Skill.Festigung]),
  new Card(142, 6, 'Trom Infanterie', CardType.Charakter, 'BROWN', s(14, 12), [Skill.Durchbruch, Skill.Schild]),
  new Card(143, 5, 'Trodaich Duellant', CardType.Charakter, 'BROWN', s(10, 12), [Skill.Duellant, Skill.Durchbruch]),
  new Card(144, 2, 'Steinerne Zukunft', CardType.Feld, 'BROWN'),
  new Card(145, 1, 'Steindornen', CardType.Aktion, 'BROWN', null, [Skill.Schnelligkeit]),
  new Card(146, 3, 'Späher Alf', CardType.Charakter, 'BROWN', s(1, 3), [Skill.Fernkampf]),
  new Card(147, 2, 'Radiumherz', CardType.Einfluss, 'BROWN'),
  new Card(148, 4, 'Mor Schildträger', CardType.Charakter, 'BROWN', s(2, 10), [Skill.Ausdauer, Skill.Festigung]),
  new Card(149, 4, 'Mienenausbau', CardType.Aktion, 'BROWN'),
  new Card(150, 2, 'Medium Roya', CardType.Avatar, 'BROWN', s(1, 5, 45), [Skill.Verhuellung]),
  new Card(151, 7, 'Leigir Ord Mor', CardType.Charakter, 'BROWN', s(6,6), [Skill.Schnelligkeit]),
  new Card(152, 5, 'Keir Steinbrecher', CardType.Avatar, 'BROWN', s(4, 8, 40)),
  new Card(153, 3, 'In Stein rahmen', CardType.Aktion, 'BROWN', null, [Skill.Schnelligkeit]),
  new Card(154, 2, 'Hartstein Hammer', CardType.Einfluss, 'BROWN'),
  new Card(155, 2, 'Erzfund', CardType.Aktion, 'BROWN'),
  new Card(156, 8, 'Eoghan', CardType.Avatar, 'BROWN', s(14, 12, 40), [Skill.Duellant, Skill.Durchbruch]),
  new Card(157, 5, 'Enya Dylan', CardType.Charakter, 'BROWN', s(6,6), [Skill.Verhuellung]),
  new Card(158, 2, 'Domhainn Zitadelle', CardType.Feld, 'BROWN'),
  new Card(159, 3, 'Baya, die Stürmerin', CardType.Charakter, 'BROWN', s(9,8)),
  new Card(160, 5, 'Söldner rekrutieren', CardType.Aktion, 'BROWN'),
];

export function cardById(id: number): Card {
  const card = allCards[id - 1];
  if (card === undefined) {
    throw new Error(`unknown cardId=${id}`);
  }
  return card;
}

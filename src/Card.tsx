export const Fractions = ["BLUE" , "RED" , "VIOLET" , "WHITE" , "YELLOW" , "BLACK" , "GREEN" , "BROWN"];
export type Fraction = typeof Fractions[number];

export enum CardType {Avatar, Charakter, Einfluss, Aktion, Feld }

export type CardCost = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'X';

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

export class Card {
  constructor(
    public readonly id: number,
    public readonly cost: CardCost,
    public readonly name: string,
    public readonly type: CardType,
    public readonly fraction: Fraction,
  ) {}

  imageSrc() : string {
    return "/cards/card-" + String(this.id).padStart(3, '0') + ".jpg"
  }

  costModifier(targetFraction: Fraction) : CardCostModifier {
    if (targetFraction == this.fraction) {
      return 0;
    }
    const expensiveMap : {[key in Fraction] : Fraction} = {
      "BLUE": "YELLOW",
      "RED": "BLUE",
      "VIOLET": "GREEN",
      "WHITE": "BLACK",
      "YELLOW": "BROWN",
      "BLACK": "WHITE",
      "GREEN": "RED",
      "BROWN": "VIOLET",
    }
    if(expensiveMap[this.fraction] == targetFraction){
      return 2;
    }
    return 1;
  }
}

export const cards: Readonly<Card[]> = [
  new Card(1, 5, "Neues Land entdecken", CardType.Aktion, "BLUE"),
  new Card(2, 4, "Lazaros, der Wächter", CardType.Avatar, "BLUE"),
  new Card(3, 4, "Wasserwandlerin", CardType.Charakter, "BLUE"),
  new Card(4, 1, "Wasserritual", CardType.Aktion, "BLUE"),
  new Card(5, 1, "Versinken", CardType.Aktion, "BLUE"),
  new Card(6, 3, "Tiefsee", CardType.Feld, "BLUE"),
  new Card(7, 3, "Stürmische See", CardType.Feld, "BLUE"),
  new Card(8, 2, "Schwert des Wassers", CardType.Einfluss, "BLUE"),
  new Card(9, 2, "Tiefenkrieger", CardType.Charakter, "BLUE"),
  new Card(10, 3, "Psari Klonos", CardType.Charakter, "BLUE"),
  new Card(11, 3, "Prinzessin Amaryllis", CardType.Avatar, "BLUE"),
  new Card(12, 5, "Panzerspeer Okeanos", CardType.Avatar, "BLUE"),
  new Card(13, 4, "Mächtiger Wasserschild", CardType.Aktion, "BLUE"),
  new Card(14, 3, "Kirian", CardType.Charakter, "BLUE"),
  new Card(15, 1, "Kartographieren", CardType.Aktion, "BLUE"),
  new Card(16, 2, "Eindringen in die Seele", CardType.Aktion, "BLUE"),
  new Card(17, 3, "Durch den Strudel", CardType.Aktion, "BLUE"),
  new Card(18, 3, "Chiton Thorax", CardType.Charakter, "BLUE"),
  new Card(19, 1, "Auf den Meeresgrund versenken", CardType.Aktion, "BLUE"),
  new Card(20, 7, "Anisy Thalassa", CardType.Charakter, "BLUE"),
  new Card(21, 1, "Zersplittern", CardType.Aktion, "RED"),
  new Card(22, 1, "Siwarat", CardType.Charakter, "RED"),
  new Card(23, 3, "Mirza Feuerchimäre", CardType.Charakter, "RED"),
  new Card(24, 1, "", CardType.Charakter, "RED"),
  new Card(25, 1, "", CardType.Charakter, "RED"),
  new Card(26, 1, "", CardType.Charakter, "RED"),
  new Card(27, 1, "", CardType.Charakter, "RED"),
  new Card(28, 1, "", CardType.Charakter, "RED"),
  new Card(29, 1, "", CardType.Charakter, "RED"),
  new Card(30, 1, "", CardType.Charakter, "RED"),
  new Card(31, 1, "", CardType.Charakter, "RED"),
  new Card(32, 1, "", CardType.Charakter, "RED"),
  new Card(33, 4, "Harjit Uruk", CardType.Avatar, "RED"),
  new Card(34, 1, "", CardType.Charakter, "RED"),
  new Card(35, 1, "", CardType.Charakter, "RED"),
  new Card(36, 1, "", CardType.Charakter, "RED"),
  new Card(37, 1, "", CardType.Charakter, "RED"),
  new Card(38, 1, "", CardType.Charakter, "RED"),
  new Card(39, 1, "", CardType.Charakter, "RED"),
  new Card(40, 1, "", CardType.Charakter, "RED"),
  new Card(41, 1, "", CardType.Charakter, "VIOLET"),
  new Card(42, 1, "", CardType.Charakter, "VIOLET"),
  new Card(43, 1, "", CardType.Charakter, "VIOLET"),
  new Card(44, 1, "", CardType.Charakter, "VIOLET"),
  new Card(45, 1, "", CardType.Charakter, "VIOLET"),
  new Card(46, 1, "", CardType.Charakter, "VIOLET"),
  new Card(47, 1, "", CardType.Charakter, "VIOLET"),
  new Card(48, 1, "", CardType.Charakter, "VIOLET"),
  new Card(49, 1, "", CardType.Charakter, "VIOLET"),
  new Card(50, 1, "", CardType.Charakter, "VIOLET"),
  new Card(51, 1, "", CardType.Charakter, "VIOLET"),
  new Card(52, 1, "", CardType.Charakter, "VIOLET"),
  new Card(53, 1, "", CardType.Charakter, "VIOLET"),
  new Card(54, 1, "", CardType.Charakter, "VIOLET"),
  new Card(55, 1, "", CardType.Charakter, "VIOLET"),
  new Card(56, 1, "", CardType.Charakter, "VIOLET"),
  new Card(57, 1, "", CardType.Charakter, "VIOLET"),
  new Card(58, 1, "", CardType.Charakter, "VIOLET"),
  new Card(59, 1, "", CardType.Charakter, "VIOLET"),
  new Card(60, 1, "", CardType.Charakter, "VIOLET"),
  new Card(61, 1, "", CardType.Charakter, "WHITE"),
  new Card(62, 1, "", CardType.Charakter, "WHITE"),
  new Card(63, 1, "", CardType.Charakter, "WHITE"),
  new Card(64, 1, "", CardType.Charakter, "WHITE"),
  new Card(65, 1, "", CardType.Charakter, "WHITE"),
  new Card(66, 1, "", CardType.Charakter, "WHITE"),
  new Card(67, 1, "", CardType.Charakter, "WHITE"),
  new Card(68, 1, "", CardType.Charakter, "WHITE"),
  new Card(69, 1, "", CardType.Charakter, "WHITE"),
  new Card(70, 1, "", CardType.Charakter, "WHITE"),
  new Card(71, 1, "", CardType.Charakter, "WHITE"),
  new Card(72, 1, "", CardType.Charakter, "WHITE"),
  new Card(73, 1, "", CardType.Charakter, "WHITE"),
  new Card(74, 1, "", CardType.Charakter, "WHITE"),
  new Card(75, 1, "", CardType.Charakter, "WHITE"),
  new Card(76, 1, "", CardType.Charakter, "WHITE"),
  new Card(77, 1, "", CardType.Charakter, "WHITE"),
  new Card(78, 1, "", CardType.Charakter, "WHITE"),
  new Card(79, 1, "", CardType.Charakter, "WHITE"),
  new Card(80, 1, "", CardType.Charakter, "WHITE"),
  new Card(81, 1, "", CardType.Charakter, "YELLOW"),
  new Card(82, 1, "", CardType.Charakter, "YELLOW"),
  new Card(83, 1, "", CardType.Charakter, "YELLOW"),
  new Card(84, 1, "", CardType.Charakter, "YELLOW"),
  new Card(85, 1, "", CardType.Charakter, "YELLOW"),
  new Card(86, 1, "", CardType.Charakter, "YELLOW"),
  new Card(87, 1, "", CardType.Charakter, "YELLOW"),
  new Card(88, 1, "", CardType.Charakter, "YELLOW"),
  new Card(89, 1, "", CardType.Charakter, "YELLOW"),
  new Card(90, 1, "", CardType.Charakter, "YELLOW"),
  new Card(91, 1, "", CardType.Charakter, "YELLOW"),
  new Card(92, 1, "", CardType.Charakter, "YELLOW"),
  new Card(93, 1, "", CardType.Charakter, "YELLOW"),
  new Card(94, 1, "", CardType.Charakter, "YELLOW"),
  new Card(95, 1, "", CardType.Charakter, "YELLOW"),
  new Card(96, 1, "", CardType.Charakter, "YELLOW"),
  new Card(97, 1, "", CardType.Charakter, "YELLOW"),
  new Card(98, 1, "", CardType.Charakter, "YELLOW"),
  new Card(99, 1, "", CardType.Charakter, "YELLOW"),
  new Card(100, 1, "", CardType.Charakter, "YELLOW"),
  new Card(101, 1, "", CardType.Charakter, "BLACK"),
  new Card(102, 1, "", CardType.Charakter, "BLACK"),
  new Card(103, 1, "", CardType.Charakter, "BLACK"),
  new Card(104, 1, "", CardType.Charakter, "BLACK"),
  new Card(105, 1, "", CardType.Charakter, "BLACK"),
  new Card(106, 1, "", CardType.Charakter, "BLACK"),
  new Card(107, 1, "", CardType.Charakter, "BLACK"),
  new Card(108, 1, "", CardType.Charakter, "BLACK"),
  new Card(109, 1, "", CardType.Charakter, "BLACK"),
  new Card(110, 1, "", CardType.Charakter, "BLACK"),
  new Card(111, 1, "", CardType.Charakter, "BLACK"),
  new Card(112, 1, "", CardType.Charakter, "BLACK"),
  new Card(113, 1, "", CardType.Charakter, "BLACK"),
  new Card(114, 1, "", CardType.Charakter, "BLACK"),
  new Card(115, 1, "", CardType.Charakter, "BLACK"),
  new Card(116, 1, "", CardType.Charakter, "BLACK"),
  new Card(117, 1, "", CardType.Charakter, "BLACK"),
  new Card(118, 1, "", CardType.Charakter, "BLACK"),
  new Card(119, 1, "", CardType.Charakter, "BLACK"),
  new Card(120, 1, "", CardType.Charakter, "BLACK"),
  new Card(121, 1, "", CardType.Charakter, "GREEN"),
  new Card(122, 1, "", CardType.Charakter, "GREEN"),
  new Card(123, 1, "", CardType.Charakter, "GREEN"),
  new Card(124, 1, "", CardType.Charakter, "GREEN"),
  new Card(125, 1, "", CardType.Charakter, "GREEN"),
  new Card(126, 1, "", CardType.Charakter, "GREEN"),
  new Card(127, 1, "", CardType.Charakter, "GREEN"),
  new Card(128, 1, "", CardType.Charakter, "GREEN"),
  new Card(129, 1, "", CardType.Charakter, "GREEN"),
  new Card(130, 1, "", CardType.Charakter, "GREEN"),
  new Card(131, 1, "", CardType.Charakter, "GREEN"),
  new Card(132, 1, "", CardType.Charakter, "GREEN"),
  new Card(133, 1, "", CardType.Charakter, "GREEN"),
  new Card(134, 1, "", CardType.Charakter, "GREEN"),
  new Card(135, 1, "", CardType.Charakter, "GREEN"),
  new Card(136, 1, "", CardType.Charakter, "GREEN"),
  new Card(137, 1, "", CardType.Charakter, "GREEN"),
  new Card(138, 1, "", CardType.Charakter, "GREEN"),
  new Card(139, 1, "", CardType.Charakter, "GREEN"),
  new Card(140, 1, "", CardType.Charakter, "GREEN"),
  new Card(141, 1, "", CardType.Charakter, "BROWN"),
  new Card(142, 1, "", CardType.Charakter, "BROWN"),
  new Card(143, 1, "", CardType.Charakter, "BROWN"),
  new Card(144, 1, "", CardType.Charakter, "BROWN"),
  new Card(145, 1, "", CardType.Charakter, "BROWN"),
  new Card(146, 1, "", CardType.Charakter, "BROWN"),
  new Card(147, 1, "", CardType.Charakter, "BROWN"),
  new Card(148, 1, "", CardType.Charakter, "BROWN"),
  new Card(149, 1, "", CardType.Charakter, "BROWN"),
  new Card(150, 1, "", CardType.Charakter, "BROWN"),
  new Card(151, 1, "", CardType.Charakter, "BROWN"),
  new Card(152, 1, "", CardType.Charakter, "BROWN"),
  new Card(153, 1, "", CardType.Charakter, "BROWN"),
  new Card(154, 1, "", CardType.Charakter, "BROWN"),
  new Card(155, 1, "", CardType.Charakter, "BROWN"),
  new Card(156, 1, "", CardType.Charakter, "BROWN"),
  new Card(157, 1, "", CardType.Charakter, "BROWN"),
  new Card(158, 1, "", CardType.Charakter, "BROWN"),
  new Card(159, 1, "", CardType.Charakter, "BROWN"),
  new Card(160, 1, "", CardType.Charakter, "BROWN"),
]

export function cardById(id: number): Card {
  const card = cards[id - 1];
  if (card === undefined) {
    throw new Error('unknown cardId=' + id);
  }
  return card;
}

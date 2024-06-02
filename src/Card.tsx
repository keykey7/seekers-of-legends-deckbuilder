export const Fractions = ["BLUE" , "RED" , "VIOLET" , "WHITE" , "YELLOW" , "BLACK" , "GREEN" , "BROWN"];
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

export class Card {
  constructor(
    public readonly id: number,
    public readonly cost: CardCost,
    public readonly name: string,
    public readonly type: CardType,
    public readonly fraction: Fraction,
  ) {}

  equals(other: Card | undefined): boolean {
    return this.id === other?.id;
  }

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

export const allCards: Readonly<Card[]> = [
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
  new Card(24, 2, "Lavastürmerin", CardType.Charakter, "RED"),
  new Card(25, 2, "Lavakristallmagier", CardType.Charakter, "RED"),
  new Card(26, 2, "Freisetzung der Feuersbrunst", CardType.Aktion, "RED"),
  new Card(27, 3, "Erbstück des Feuers", CardType.Einfluss, "RED"),
  new Card(28, "X", "Beschwörung des Infernos", CardType.Aktion, "RED"),
  new Card(29, "X", "Späherin Nima", CardType.Charakter, "RED"),
  new Card(30, 3, "Raneneeti Akshara", CardType.Avatar, "RED"),
  new Card(31, 2, "Magmakammer", CardType.Feld, "RED"),
  new Card(32, 4, "Harleen, die Quartiermeisterin", CardType.Charakter, "RED"),
  new Card(33, 4, "Harjit Uruk", CardType.Avatar, "RED"),
  new Card(34, 5, "Flammenvedan", CardType.Charakter, "RED"),
  new Card(35, 2, "Feuerarena", CardType.Feld, "RED"),
  new Card(36, 2, "Arjuna Feuerbeschwörer", CardType.Charakter, "RED"),
  new Card(37, 1, "Völlerei", CardType.Aktion, "RED"),
  new Card(38, 2, "Jaspal", CardType.Charakter, "RED"),
  new Card(39, 2, "Feuerring", CardType.Aktion, "RED"),
  new Card(40, 3, "Dinesh Bhasin", CardType.Avatar, "RED"),
  new Card(41, 2, "Zeit zurückdrehen", CardType.Aktion, "VIOLET"),
  new Card(42, 1, "Weissagung der Wolken", CardType.Aktion, "VIOLET"),
  new Card(43, 1, "Wanderin Yui", CardType.Charakter, "VIOLET"),
  new Card(44, 4, "Tenshi Jakun", CardType.Charakter, "VIOLET"),
  new Card(45, 2, "Sturmbastion", CardType.Feld, "VIOLET"),
  new Card(46, 8, "Sasaki Jojiro", CardType.Avatar, "VIOLET"),
  new Card(47, 3, "Ratsältester Kankei", CardType.Charakter, "VIOLET"),
  new Card(48, 3, "Naoki, der Windgeist", CardType.Charakter, "VIOLET"),
  new Card(49, 3, "Kaze Oni", CardType.Charakter, "VIOLET"),
  new Card(50, 2, "Katano Hikaoki", CardType.Avatar, "VIOLET"),
  new Card(51, 2, "Karasu Späher", CardType.Charakter, "VIOLET"),
  new Card(52, 1, "Ins Glas einschliessen", CardType.Aktion, "VIOLET"),
  new Card(53, 4, "Hitomi Arashi", CardType.Charakter, "VIOLET"),
  new Card(54, 2, "Gewitterring", CardType.Einfluss, "VIOLET"),
  new Card(55, 10, "Asuka Hitama", CardType.Charakter, "VIOLET"),
  new Card(56, 2, "Amethystabwehr", CardType.Aktion, "VIOLET"),
  new Card(57, 3, "Zeit zerschneiden", CardType.Aktion, "VIOLET"),
  new Card(58, 3, "Nebeltrunk", CardType.Aktion, "VIOLET"),
  new Card(59, 4, "Halluzination", CardType.Aktion, "VIOLET"),
  new Card(60, 6, "En No Ozuno", CardType.Charakter, "VIOLET"),
  new Card(61, 2, "Zeitsprungritual", CardType.Aktion, "WHITE"),
  new Card(62, 6, "Vereinigung mit dem Licht", CardType.Aktion, "WHITE"),
  new Card(63, 6, "Tarshishim Prinzessin", CardType.Charakter, "WHITE"),
  new Card(64, 7, "Shianim Prinz", CardType.Charakter, "WHITE"),
  new Card(65, 1, "Schwereloser Bogen", CardType.Einfluss, "WHITE"),
  new Card(66, 3, "Malakim Späherin", CardType.Charakter, "WHITE"),
  new Card(67, 2, "Magisches Schachbrett", CardType.Charakter, "WHITE"),
  new Card(68, 5, "Leuchtender Ishim", CardType.Charakter, "WHITE"),
  new Card(69, 3, "Kristallheilung", CardType.Aktion, "WHITE"),
  new Card(70, 2, "Himmlische Intervention", CardType.Aktion, "WHITE"),
  new Card(71, 3, "Heilige Shahal", CardType.Charakter, "WHITE"),
  new Card(72, 4, "Hashmallim des Schwertes", CardType.Charakter, "WHITE"),
  new Card(73, 2, "Erelim Medium", CardType.Charakter, "WHITE"),
  new Card(74, 1, "Erelim Erzählerin", CardType.Charakter, "WHITE"),
  new Card(75, 2, "Elohim Infanterie", CardType.Charakter, "WHITE"),
  new Card(76, 4, "Amos Agron", CardType.Avatar, "WHITE"),
  new Card(77, 6, "Zuriel, das sanfte Licht", CardType.Avatar, "WHITE"),
  new Card(78, 4, "Shamayim, die Himmlische", CardType.Avatar, "WHITE"),
  new Card(79, 1, "Segnung des Trankes", CardType.Aktion, "WHITE"),
  new Card(80, 1, "Einhornrune", CardType.Einfluss, "WHITE"),
  new Card(81, 4, "Vis, die Entscheiderin", CardType.Avatar, "YELLOW"),
  new Card(82, 2, "Vereidigender Triarius", CardType.Charakter, "YELLOW"),
  new Card(83, 3, "Thulius Feuerblitz", CardType.Avatar, "YELLOW"),
  new Card(84, 2, "Seemanöver", CardType.Aktion, "YELLOW"),
  new Card(85, 1, "Schützender Princeps", CardType.Charakter, "YELLOW"),
  new Card(86, 2, "Schildwall", CardType.Aktion, "YELLOW"),
  new Card(87, 2, "Leuchtende Explorata", CardType.Charakter, "YELLOW"),
  new Card(88, 1, "Impeta Fulgur", CardType.Charakter, "YELLOW"),
  new Card(89, 1, "Hafenstadt", CardType.Feld, "YELLOW"),
  new Card(90, 1, "Feldweg", CardType.Feld, "YELLOW"),
  new Card(91, 2, "Fabrius Artificum", CardType.Charakter, "YELLOW"),
  new Card(92, 4, "Custos Armorum", CardType.Charakter, "YELLOW"),
  new Card(93, 3, "Blitz Rorarius", CardType.Charakter, "YELLOW"),
  new Card(94, 2, "Blaublitz Magus", CardType.Charakter, "YELLOW"),
  new Card(95, 2, "Bellona, Anführerin der goldenen Legion", CardType.Avatar, "YELLOW"),
  new Card(96, 1, "Balanceakt", CardType.Aktion, "YELLOW"),
  new Card(97, 1, "Angreifender Hastatus", CardType.Charakter, "YELLOW"),
  new Card(98, 4, "Kommandierende Primus", CardType.Charakter, "YELLOW"),
  new Card(99, 3, "Wildnis", CardType.Feld, "YELLOW"),
  new Card(100, 2, "Verlorenes Arsenal", CardType.Einfluss, "YELLOW"),
  new Card(101, 2, "Verwesung", CardType.Aktion, "BLACK"),
  new Card(102, 1, "Versklavter Bypochtbonia", CardType.Charakter, "BLACK"),
  new Card(103, 1, "Sog der Dunkelheit", CardType.Aktion, "BLACK"),
  new Card(104, 1, "Seelenverschlingendes Schwert", CardType.Einfluss, "BLACK"),
  new Card(105, 3, "Ritual der Verbannung", CardType.Aktion, "BLACK"),
  new Card(106, 3, "Pure Dunkelheit", CardType.Feld, "BLACK"),
  new Card(107, 2, "Misophaes Bote", CardType.Charakter, "BLACK"),
  new Card(108, 1, "Gebundener Misophaes", CardType.Charakter, "BLACK"),
  new Card(109, 3, "Enalia Wächterin", CardType.Charakter, "BLACK"),
  new Card(110, 3, "Dunkle Auferstehung", CardType.Aktion, "BLACK"),
  new Card(111, 2, "Die Sündering Azazel", CardType.Avatar, "BLACK"),
  new Card(112, 3, "Chthonia Kriegstreiber", CardType.Charakter, "BLACK"),
  new Card(113, 4, "Asbeel, der Aufgegebene", CardType.Avatar, "BLACK"),
  new Card(114, 2, "Albtraumflur", CardType.Feld, "BLACK"),
  new Card(115, 4, "Aeria Höllenbotin", CardType.Charakter, "BLACK"),
  new Card(116, 2, "Adelsfriedhof", CardType.Feld, "BLACK"),
  new Card(117, 4, "Schwarze Krönung", CardType.Aktion, "BLACK"),
  new Card(118, 5, "Ieshim, die Wächterin", CardType.Avatar, "BLACK"),
  new Card(119, 3, "Hyraia Wächterin", CardType.Charakter, "BLACK"),
  new Card(120, 2, "Fluch des Ebenbilds", CardType.Aktion, "BLACK"),
  new Card(121, 3, "Wurzelspeer", CardType.Einfluss, "GREEN"),
  new Card(122, 2, "Wächter Chimali", CardType.Avatar, "GREEN"),
  new Card(123, 1, "Späherin Tochtli", CardType.Charakter, "GREEN"),
  new Card(124, 1, "Rast im Grünen", CardType.Aktion, "GREEN"),
  new Card(125, 3, "Priesterin Amankaya", CardType.Charakter, "GREEN"),
  new Card(126, 1, "Neuer Anfang", CardType.Aktion, "GREEN"),
  new Card(127, 2, "Nagual Tauren", CardType.Charakter, "GREEN"),
  new Card(128, 2, "Mayel, die Diplomatin", CardType.Charakter, "GREEN"),
  new Card(129, 2, "Geisterwald", CardType.Feld, "GREEN"),
  new Card(130, 3, "Formwandler Itzli", CardType.Charakter, "GREEN"),
  new Card(131, 1, "Einnahme des Lebenstranks", CardType.Aktion, "GREEN"),
  new Card(132, 1, "Cantico", CardType.Charakter, "GREEN"),
  new Card(133, 2, "Buch der Natur", CardType.Einfluss, "GREEN"),
  new Card(134, 1, "Bad im heildenden See", CardType.Aktion, "GREEN"),
  new Card(135, 2, "Alter Xulan", CardType.Charakter, "GREEN"),
  new Card(136, 2, "Adeptin Payaan", CardType.Charakter, "GREEN"),
  new Card(137, 1, "Verwurzelter Wald", CardType.Feld, "GREEN"),
  new Card(138, 2, "Gaten des Seelenfriedens", CardType.Feld, "GREEN"),
  new Card(139, 3, "Naay, die Weise", CardType.Charakter, "GREEN"),
  new Card(140, 6, "Amoztli, die Hüterin", CardType.Avatar, "GREEN"),
  new Card(141, 1, "Tunnelgräber", CardType.Charakter, "BROWN"),
  new Card(142, 6, "Trom Infanterie", CardType.Charakter, "BROWN"),
  new Card(143, 5, "Trodaich Duellant", CardType.Charakter, "BROWN"),
  new Card(144, 2, "Steinerne Zukunft", CardType.Feld, "BROWN"),
  new Card(145, 1, "Steindornen", CardType.Aktion, "BROWN"),
  new Card(146, 3, "Späher Alf", CardType.Charakter, "BROWN"),
  new Card(147, 2, "Radiumherz", CardType.Einfluss, "BROWN"),
  new Card(148, 4, "Mor Schildträger", CardType.Charakter, "BROWN"),
  new Card(149, 4, "Mienenausbau", CardType.Charakter, "BROWN"),
  new Card(150, 2, "Medium Roya", CardType.Avatar, "BROWN"),
  new Card(151, 7, "Leigir Ord Mor", CardType.Charakter, "BROWN"),
  new Card(152, 5, "Keir Steinbrecher", CardType.Avatar, "BROWN"),
  new Card(153, 3, "In Stein rahmen", CardType.Aktion, "BROWN"),
  new Card(154, 2, "Hartstein Hammer", CardType.Einfluss, "BROWN"),
  new Card(155, 2, "Erzfund", CardType.Charakter, "BROWN"),
  new Card(156, 8, "Eoghan", CardType.Avatar, "BROWN"),
  new Card(157, 5, "Enya Dylan", CardType.Charakter, "BROWN"),
  new Card(158, 2, "Domhainn Zitadelle", CardType.Feld, "BROWN"),
  new Card(159, 3, "Baya, die Stürmerin", CardType.Charakter, "BROWN"),
  new Card(160, 5, "Söldner rekrutieren", CardType.Aktion, "BROWN"),
]

export function cardById(id: number): Card {
  const card = allCards[id - 1];
  if (card === undefined) {
    throw new Error('unknown cardId=' + id);
  }
  return card;
}

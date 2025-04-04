import {AvatarStats, Card, CardType, CharacterStats, Skill} from './Card.ts';

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

// errata: Doppel-S schreibweise de-ch vs de-de ist nicht konsistent
export const allCards: Readonly<Card[]> = [
  new Card(1, 5, 'Neues Land entdecken', CardType.Aktion, 'BLUE', 'Lege alle deine Handkarten als Macht erschöpft ins Spiel. Bringe dann alle deine bisherigen Machtkarten zurück auf die Hände Ihrer Besitzer.'),
  new Card(2, 4, 'Lazaros, der Wächter', CardType.Avatar, 'BLUE', 'Jedes Mal, wenn Lazaros, der Wächter einem Gegner Kampfschaden zufügt, wirft dieser eine Karte von seiner Hand ab.  Am Ende deines Zuges verliert jeder Gegner, welcher keine Handkarten hat, 4 Lebenspunkte.  Avatareffekt:  Zu Beginn deines ersten Zuges im Spiel wirft jeder Gegner eine Handkarte ab.', s(3, 5, 40)),
  new Card(3, 4, 'Wasserwandlerin', CardType.Charakter, 'BLUE', 'Wasserwandlerin kommt ins Spiel als Kopie eines anderen Charakters im Spiel.', s('X', 'X')),
  new Card(4, 1, 'Wasserritual', CardType.Aktion, 'BLUE', 'Bringe eine deiner Machtkarten auf die Hand ihres Besitzers zurück. Du kannst eine Karte von deiner Hand als Macht legen.', null, [Skill.Schnelligkeit]),
  new Card(5, 1, 'Versinken', CardType.Aktion, 'BLUE', 'Schaue dir die Hand eines Spielers deiner Wahl an. Wähle eine Nicht-Charakter-Karte aus. Er wirft sie ab.'),
  new Card(6, 3, 'Tiefsee', CardType.Feld, 'BLUE', 'Charaktere verlieren alle Fähigkeiten und können keine Fähigkeiten erhalten.'),
  new Card(7, 3, 'Stürmische See', CardType.Feld, 'BLUE', 'Effekte, welche nur bis zum Ende des Zuges aktiv sind, bleiben auch danach weiterhin aktiv.'),
  new Card(8, 2, 'Schwert des Wassers', CardType.Einfluss, 'BLUE', 'Immer, wenn der ausgerüstete Charakter angreift, lege einen [+1/+1]-Zähler auf ihn und erschöpfe einen Charakter deiner Wahl, den der verteidigende Spieler kontrolliert.  1 :macht:, :pfeil:: Ausrüsten.'),
  new Card(9, 2, 'Tiefenkrieger', CardType.Charakter, 'BLUE', '', s(3, 5), [Skill.Schnelligkeit, Skill.Schild]),
  new Card(10, 3, 'Psari Klonos', CardType.Charakter, 'BLUE', 'Bari Klonos komm ins Spiel als Kopie eines anderen Charakters im Spiel.', s('X', 'X')),
  new Card(11, 3, 'Prinzessin Amaryllis', CardType.Avatar, 'BLUE', '4 :macht:, bringe einen deiner ungeblockten Angreifer zurück auf die Hand ihres Besitzers: Bringe danach einen Charakter von deiner Hand angreifend und erschöpft ins Spiel.  Avatareffekt:  Zu Beginn deines ersten Zuges im Spiel ziehe eine zusätzliche Karte.', s(4, 8, 45)),
  new Card(12, 5, 'Panzerspeer Okeanos', CardType.Avatar, 'BLUE', 'Du kannst erholte, verdeckte Macht, welche sich unter deiner Kontrolle befindet, ausspielen, als wäre sie auf deiner Hand.  Avatareffekt:  Jedes Mal, wenn du eine Macht aus dem Machtbereich aufdeckst und in einen anderen Bereich ausspielst, ziehe eine Karte.', s(5, 10, 40)),
  new Card(13, 4, 'Mächtiger Wasserschild', CardType.Aktion, 'BLUE', 'Lege jeden angreifenden Charakter verdeckt und erschöpft in den Machtbereich seines Besitzers.', null, [Skill.Schnelligkeit]),
  new Card(14, 3, 'Kirian', CardType.Charakter, 'BLUE', 'Wenn Kirian ins Spiel kommt, schicke einen Charakter im Spiel zurück auf die Hand seines Besitzers.', s(3, 2), [Skill.Schnelligkeit]),
  new Card(15, 1, 'Kartographieren', CardType.Aktion, 'BLUE', 'Du kannst bis zum Ende des Zuges eine erholte Macht unter deiner Kontrolle ausspielen, als wäre sie auf deiner Hand und als hätte sie Schnelligkeit.  Du kannst 1 :macht: mehr bezahlen, um Kartographieren zurück auf deine Hand anstatt ins Lazarett zu legen, sobald sie verrechnet wurde.', null, [Skill.Schnelligkeit]),
  new Card(16, 2, 'Eindringen in die Seele', CardType.Aktion, 'BLUE', 'Schaue dir die Hand eines Spielers deiner Wahl an. Wähle eine Karte aus. Er wirft sie ab.'),
  new Card(17, 3, 'Durch den Strudel', CardType.Aktion, 'BLUE', 'Jeder Gegner wirft 2 Handkarten ab.'),
  new Card(18, 3, 'Chiton Thorax', CardType.Charakter, 'BLUE', 'Jedes Mal, wenn Chiton Thorax einem Gegner Kampfschaden zufügt, wirft dieser eine Handkarte ab.', s(7, 5), [Skill.Duellant]),
  new Card(19, 1, 'Auf den Meeresgrund versenken', CardType.Aktion, 'BLUE', 'Lege einen gegnerischen Charakter deiner Wahl verdeckt und erschöpft in den Machtbereich seines Besitzers.', null, [Skill.Schnelligkeit]),
  new Card(20, 7, 'Anisy Thalassa', CardType.Charakter, 'BLUE', 'Anisy Thalassa kann nicht neutralisiert werden.  Immer, wenn du eine Karte ausspielst, bringe eine bleibende Karte deiner Wahl im Spiel zurück auf die Hand ihres Besitzers.', s(14, 16), [Skill.Schnelligkeit]),
  new Card(21, 1, 'Zersplittern', CardType.Aktion, 'RED', 'Zersplittern fügt einem Spieler oder Charakter deiner Wahl 5 Schaden zu.', null, [Skill.Schnelligkeit]),
  new Card(22, 1, 'Siwarat', CardType.Charakter, 'RED', '', s(3, 1), [Skill.Hast]),
  new Card(23, 3, 'Mirza Feuerchimäre', CardType.Charakter, 'RED', '', s(10, 2), [Skill.Durchbruch, Skill.Schild]),
  new Card(24, 2, 'Lavastürmerin', CardType.Charakter, 'RED', 'Lavastürmerin erhält +4/+0 für jede an sie angelegte Ausrüstung.', s(2, 2), [Skill.Duellant]),
  new Card(25, 2, 'Lavakristallmagier', CardType.Charakter, 'RED', 'Jedes Mal, wenn ein Gegner eine Karte zieht, fügt Lavakristallmagier einem Spieler oder Charakter deiner Wahl 1 Schaden zu.', s(1, 1), [Skill.Schnelligkeit]),
  new Card(26, 2, 'Freisetzung der Feuersbrunst', CardType.Aktion, 'RED', 'Zerstöre eine Macht deiner Wahl.'),
  new Card(27, 3, 'Erbstück des Feuers', CardType.Einfluss, 'RED', 'Der ausgerüstete Charakter hat Doppelhieb und Durchbruch. 2 :macht:, :pfeil:: Ausrüsten.'),
  new Card(28, 'X', 'Beschwörung des Infernos', CardType.Aktion, 'RED', 'Beschwörung des Infernos fügt jedem Charakter und jedem Spieler X Schaden zu.'),
  new Card(29, 'X', 'Späherin Nima', CardType.Charakter, 'RED', 'Späherin Nima kommt mit X [+1/+1]-Zählern ins Spiel.  Entferne einen [+1/+1]-Zähler von Späherin Nima: Sie fügt einem Spieler oder Charakter deiner Wahl 1 Schaden zu.', s(0, 0)),
  new Card(30, 3, 'Raneneeti Akshara', CardType.Avatar, 'RED', 'Jedes Mal, wenn einer deiner Charaktere das Ziel einer deiner Aktionen wird, bringe diese Aktion am Ende des Zuges zurück auf deine Hand.  Avatareffekt:  Deine Aktionen, die deine eigenen Charaktere zum Ziel haben, kosten 1 :macht: weniger.', s(5, 5, 40)),
  new Card(31, 2, 'Magmakammer', CardType.Feld, 'RED', 'Spieler können keine Lebenspunkte erhalten. Schaden kann nicht verhindert werden.'),
  new Card(32, 4, 'Harleen, die Quartiermeisterin', CardType.Charakter, 'RED', 'Jedes Mal, wenn ein anderer Charakter unter deiner Kontrolle ins Spiel kommt, fügt Harleen, die Quartiermeisterin jedem Gegner 2 Schaden zu.', s(8, 6)),
  new Card(33, 4, 'Harjit Uruk', CardType.Avatar, 'RED', 'Erhöhe jeglichen Nicht-Kampfschaden, den du Gegnern und gegnerischen Charakteren zufügst, um 2.  Avatareffekt:  Erhöhe jeglichen Nicht-Kampfschaden, den du Gegnern und gegnerischen Charakteren zufügst, um 1.', s(6, 8, 35), [Skill.Schild]),
  new Card(34, 5, 'Flammenvedan', CardType.Charakter, 'RED', 'Jedes Mal, wenn ein anderer Charakter unter deiner Kontrolle ins Spiel komm, fügt Flammenvedan einem Spieler oder Charakter deiner Wahl X Schaden zu, wobei X dem Angriff des neu ins Spiel gekommenen Charakters entspricht.', s(10, 8)),
  new Card(35, 2, 'Feuerarena', CardType.Feld, 'RED', 'Erhöhe jeglichen Schaden von Vaakhil-Karten um 1.'),
  new Card(36, 2, 'Arjuna Feuerbeschwörer', CardType.Charakter, 'RED', 'Jedes Mal, wenn ein Spieler eine Karte mit weniger als 4 Machtkosten offen ausspielt, fügt Arjuna Feuerbeschwörer ihm 3 Schaden zu.', s(5, 3), [Skill.Ansturm]),
  new Card(37, 1, 'Völlerei', CardType.Aktion, 'RED', 'Ein Charakter deiner Wahl erhält +6/+0 und Durchbruch bis zum Ende des Zuges.', null, [Skill.Schnelligkeit]),
  new Card(38, 2, 'Jaspal', CardType.Charakter, 'RED', 'Jedes Mal, wenn du einen Nicht-Charakter ausspielst, fügt Jaspal jedem Gegner 2 Schaden zu.', s(2, 4), [Skill.Fernkampf]),
  new Card(39, 2, 'Feuerring', CardType.Aktion, 'RED', 'Eine Aktion deiner Wahl fügt zusätzlich jedem Spieler und Charakter Schaden in Höhe ihrer doppelten Machtkosten zu.', null, [Skill.Schnelligkeit]),
  new Card(40, 3, 'Dinesh Bhasin', CardType.Avatar, 'RED', 'Jedes Mal, wenn ein Gegner eine Karte ausspielt, fügt Dinesh Bhasin ihm 1 Schaden zu.  Avatareffekt:  Deine anderen Vaakhil-Charaktere erhalten +1/+0.', s(6, 3, 30), [Skill.Hast]),
  new Card(41, 2, 'Zeit zurückdrehen', CardType.Aktion, 'VIOLET', 'Neutralisiere einen gewirkten Charakter deiner Wahl.', null, [Skill.Schnelligkeit]),
  new Card(42, 1, 'Weissagung der Wolken', CardType.Aktion, 'VIOLET', 'Schaue dir die obersten 2 Karten deines Decks an. Lege sie danach in beliebiger Reihenfolge auf oder unter dein Deck. Ziehe anschließend eine Karte.'),
  new Card(43, 1, 'Wanderin Yui', CardType.Charakter, 'VIOLET', '', s(3, 1), [Skill.Verhuellung]),
  new Card(44, 4, 'Tenshi Jakun', CardType.Charakter, 'VIOLET', 'Wenn Tenshi Jakun ins Spiel kommt, ziehe 2 Karten.', s(4, 2)),
  new Card(45, 2, 'Sturmbastion', CardType.Feld, 'VIOLET', 'Charaktere mit Flug erhalten +2/+2.'),
  new Card(46, 8, 'Sasaki Jojiro', CardType.Avatar, 'VIOLET', 'Alle deine Aktionen haben Schnelligkeit.  Avatareffekt:  Jeder Gegner bezahlt beim Ausspielen seiner ersten Karte, welche mit Macht bezahlt wird, 1 :macht: mehr.', s(10, 12, 45)),
  new Card(47, 3, 'Ratsältester Kankei', CardType.Avatar, 'VIOLET', 'Deine Aktionen kosten im gegnerischen Zug 1 :macht: weniger zum Ausspielen.  Avatareffekt:  Zu Beginn deines ersten Zuges im Spiel ziehe eine zusätzliche Karte.', s(8, 2, 35)),
  new Card(48, 3, 'Naoki, der Windgeist', CardType.Charakter, 'VIOLET', '', s(4, 3), [Skill.Festigung, Skill.Flug]),
  new Card(49, 3, 'Kaze Oni', CardType.Charakter, 'VIOLET', 'Wenn Kaze Oni ins Spiel kommt, kannst du eine Aktion deiner Wahl aus einem Lazarett ausspielen. Verbanne sie anschließend.', s(5, 2), [Skill.Schnelligkeit, Skill.Flug]),
  new Card(50, 2, 'Katano Hikaoki', CardType.Avatar, 'VIOLET', 'Jedes Mal, wenn Katano Hikaoki angreift, kannst du eine Aktion deiner Wahl mit Machtkosten weniger oder gleich seines Angriffs von einem Lazarett ausspielen, ohne ihre Machtkosten zu bezahlen. Verbanne diese Aktion anschließend.  Avatareffekt:  Jedes Mal, wenn ein Gegner Leben verliert, dünnt er eine Karte aus.', s(4, 2, 40)),
  new Card(51, 2, 'Karasu Späher', CardType.Charakter, 'VIOLET', 'Jedes Mal, wenn du eine Aktion ausspielst, lege einen [+1/+1]-Zähler auf Karasu Späher.', s(1, 1), [Skill.Flug]),
  new Card(52, 1, 'Ins Glas einschliessen', CardType.Aktion, 'VIOLET', 'Neutralisiere eine gewirkte Aktion deiner Wahl.', null, [Skill.Schnelligkeit]),
  new Card(53, 4, 'Hitomi Arashi', CardType.Charakter, 'VIOLET', 'Wenn Hitomi Arashi ins Spiel kommt, bringe eine Aktion von deinem Lazarett zurück auf deine Hand.', s(2, 2), [Skill.Flug]),
  new Card(54, 2, 'Gewitterring', CardType.Einfluss, 'VIOLET', 'Der ausgerüstete Charakter erhält Flug und +X/+0, wobei X der Anzahl Aktionen in deinem Lazarett entspricht.  2 :macht:, :pfeil:: Ausrüsten.'),
  new Card(55, 10, 'Asuka Hitama', CardType.Charakter, 'VIOLET', 'Asuka Hitama kostet 1 :macht: weniger für jede Aktion in deinem Lazarett.', s(10, 10), [Skill.Schild]),
  new Card(56, 2, 'Amethystabwehr', CardType.Aktion, 'VIOLET', 'Neutralisiere einen gewirkten Nicht-Charakter deiner Wahl.', null, [Skill.Schnelligkeit]),
  new Card(57, 3, 'Zeit zerschneiden', CardType.Aktion, 'VIOLET', 'Neutralisiere eine gewirkte Karte deiner Wahl.', null, [Skill.Schnelligkeit]),
  new Card(58, 3, 'Nebeltrunk', CardType.Aktion, 'VIOLET', 'Ziehe 2 Karten.'),
  new Card(59, 4, 'Halluzination', CardType.Aktion, 'VIOLET', 'Übernimm die Kontrolle über einen Charakter deiner Wahl bis zum Ende des Zuges. Erhole diesen Charakter. Er erhält Hast bis zum Ende des Zuges.'),
  new Card(60, 6, 'En No Ozuno', CardType.Charakter, 'VIOLET', 'Jedes Mal, wenn ein Gegner eine Karte zieht, kannst du eine Karte ziehen.', s(8, 12), [Skill.Verhuellung]),
  new Card(61, 2, 'Zeitsprungritual', CardType.Aktion, 'WHITE', 'Dünne 3 Karten aus, dann bringe eine Karte aus deinem Lazarett zurück auf deine Hand.'),
  new Card(62, 6, 'Vereinigung mit dem Licht', CardType.Aktion, 'WHITE', 'Zerstöre alle offenen Karten im Spiel.'),
  new Card(63, 6, 'Tarshishim Prinzessin', CardType.Charakter, 'WHITE', 'Jedes Mal, wenn Tarshishim Prinzessin ins Spiel kommt oder angreift, bringe eine Karte mit weniger als 4 Machtkosten von deinem Lazarett zurück ins Spiel.', s(10, 10), [Skill.Flug, Skill.Ausdauer]),
  new Card(64, 7, 'Shianim Prinz', CardType.Charakter, 'WHITE', 'Bringe zu Beginn deines Zuges einen Charakter deiner Wahl von deinem Lazarett zurück ins Spiel.', s(12, 12), [Skill.Flug, Skill.Verhuellung]),
  new Card(65, 1, 'Schwereloser Bogen', CardType.Einfluss, 'WHITE', 'Der ausgerüstete Charakter hat +2/+0. Jedes Mal, wenn der ausgerüstete Charakter angreift, dünne 2 Karten aus.  1 :macht:, :pfeil:: Ausrüsten.'),
  new Card(66, 3, 'Malakim Späherin', CardType.Charakter, 'WHITE', 'Wenn Malakim Späherin ins Spiel kommt, dünne 3 Karten aus. Bringe anschließend eine Karte deiner Wahl aus deinem Lazarett zurück auf deine Hand.', s(4, 3), [Skill.Flug]),
  new Card(67, 2, 'Magisches Schachbrett', CardType.Feld, 'WHITE', 'Jeder Spieler kann nicht mehr als eine Karte pro Zug ausspielen, welche nicht als Macht ausgespielt wird.'),
  new Card(68, 5, 'Leuchtender Ishim', CardType.Charakter, 'WHITE', 'Wenn Leuchtender Ishim ins Spiel kommt, bringe einen Charakter deiner Wahl von deinem Lazarett zurück ins Spiel.', s(4, 4), [Skill.Flug]),
  new Card(69, 3, 'Kristallheilung', CardType.Aktion, 'WHITE', 'Bringe einen Charakter deiner Wahl von deinem Lazarett zurück ins Spiel.'),
  new Card(70, 2, 'Himmlische Intervention', CardType.Aktion, 'WHITE', 'Alle deine Charaktere erhalten Schild und Unbesiegbarkeit bis zum Ende des Zuges.', null, [Skill.Schnelligkeit]),
  new Card(71, 3, 'Heilige Shahal', CardType.Charakter, 'WHITE', 'Du kannst Karten von deinem Lazarett als Macht legen, als wären sie auf deiner Hand.', s(4, 6), [Skill.Flug, Skill.Schild]),
  new Card(72, 4, 'Hashmallim des Schwertes', CardType.Charakter, 'WHITE', 'Jedes Mal, wenn Heshmallim des Schwertes ausgedünnt werden würde, bringe sie stattdessen direkt ins Spiel.', s(6, 6), [Skill.Festigung]),
  new Card(73, 2, 'Erelim Medium', CardType.Charakter, 'WHITE', 'Jedes Mal, wenn du eine Karte ziehen würdest und du keine Karten im Deck hast, gewinnst du stattdessen.', s(1, 1), [Skill.Flug]),
  new Card(74, 1, 'Erelim Erzählerin', CardType.Charakter, 'WHITE', 'Wenn Erelim Erzählerin das Spielfeld betritt oder verlässt, dünne 2 Karten aus.', s(2, 1), [Skill.Flug]),
  new Card(75, 2, 'Elohim Infanterie', CardType.Charakter, 'WHITE', 'Jedes Mal, wenn Elohim Infanterie einem Gegner Kampfschaden zufügt, schaue dir ebenso viele Karten von oberhalb deines Decks an. Lege eine beliebige Anzahl davon in dein Lazarett und den Rest in einer Reihenfolge deiner Wahl oben auf dein Deck. Solange du mindestens 7 Karten im Lazarett hast, erhält Elohim Infanterie +4/+4.', s(2, 2), [Skill.Flug, Skill.Durchbruch]),
  new Card(76, 4, 'Amos Agron', CardType.Avatar, 'WHITE', 'Solange eine Ausrüstung an Amos Agron angelegt ist, hat er Ersthieb. Wenn 2 Ausrüstungen angelegt sind, hat er Doppelhieb.  Wenn 3 oder mehr Ausrüstungen angelegt sind, hat er Dreifachhieb. 3 :macht: lege alle deine Ausrüstungen an Amos Agron an.  Avatareffekt:  Ausrüstungen kosten 1 :macht: weniger.', s(5, 5, 35), [Skill.Flug]),
  new Card(77, 6, 'Zuriel, das sanfte Licht', CardType.Avatar, 'WHITE', 'Du kannst während deines Zuges eine bleibende Karte deiner Wahl von deinem Lazarett ausspielen, als ob sie in deiner Hand wäre.  Avatareffekt:  Jedes Mal, wenn du ausdünnst, dünne ein Karte mehr aus.', s(4, 10, 40), [Skill.Ausdauer]),
  new Card(78, 4, 'Shamayim, die Himmlische', CardType.Avatar, 'WHITE', 'Jedes Mal, wenn Shamayim, die Himmlische einem Gegner Kampfschaden zufügt, bringe einen Charakter deiner Wahl, dessen Machtkosten dem verursachten Kampfschaden oder weniger entsprechen, von deinem Lazarett zurück ins Spiel.  Avatareffekt:  Jedes Mal, wenn einer deiner Charaktere angreift, dünne eine Karte aus.', s(6, 4, 40), [Skill.Flug, Skill.Ersthieb]),
  new Card(79, 1, 'Segnung des Trankes', CardType.Aktion, 'WHITE', 'Ein Charakter deiner Wahl erhält Schild und Unbesiegbarkeit bis zum Ende des Zuges.', null, [Skill.Schnelligkeit]),
  new Card(80, 1, 'Einhornrune', CardType.Einfluss, 'WHITE', 'Der ausgerüstete Charakter erhält +4/+0. Jedes Mal, wenn der ausgerüstete Charakter besiegt wird, ziehe eine Karte.  1 :macht:, :pfeil: Ausrüsten.'),
  new Card(81, 4, 'Vis, die Entscheiderin', CardType.Avatar, 'YELLOW', 'Alle deine Charaktere haben Schnelligkeit.  Avatareffekt:  Jeder Gegner bezahlt beim Ausspielen seiner ersten Karte, welche mit Macht bezahlt wird, 1 :macht: mehr.', s(6, 4, 35), [Skill.Ersthieb]),
  new Card(82, 2, 'Vereidigender Triarius', CardType.Charakter, 'YELLOW', '', s(6, 2), [Skill.Fernkampf, Skill.Festigung]),
  new Card(83, 3, 'Thulius Feuerblitz', CardType.Avatar, 'YELLOW', 'Alle deine Charaktere haben Hast.  Jedes Mal, wenn einer deiner Charaktere, der in diesem Zug ins Spiel gekommen ist, einem Gegner Kampfschaden zufügt, ziehe eine Karte.  Avatareffekt:  Deine anderen Heepurianer-Charaktere erhalten +1/+0.', s(4, 5, 30), [Skill.Hast]),
  new Card(84, 2, 'Seemanöver', CardType.Aktion, 'YELLOW', 'Bestimme neue Ziele für eine Aktion deiner Wahl.', null, [Skill.Schnelligkeit]),
  new Card(85, 1, 'Schützender Princeps', CardType.Charakter, 'YELLOW', ':pfeil:: Ein Charakter deiner Wahl erhält Schild und Unbesiegbarkeit bis zum Ende des Zuges.', s(1, 1)),
  new Card(86, 2, 'Schildwall', CardType.Aktion, 'YELLOW', 'Das nächste Mal, wenn in diesem Zug Schaden zugefügt werden würde, lenke ihn stattdessen auf einen Spieler oder Charakter deiner Wahl um.', null, [Skill.Schnelligkeit]),
  new Card(87, 2, 'Leuchtende Explorata', CardType.Charakter, 'YELLOW', '', s(6, 5), [Skill.Schnelligkeit]),
  new Card(88, 1, 'Impeta Fulgur', CardType.Charakter, 'YELLOW', '', s(4, 1), [Skill.Schnelligkeit]),
  new Card(89, 1, 'Hafenstadt', CardType.Feld, 'YELLOW', 'Alle Charaktere erhalten +2/+2.', null, [Skill.Schnelligkeit]),
  new Card(90, 1, 'Feldweg', CardType.Feld, 'YELLOW', 'Alle Charaktere haben Hast.'),
  new Card(91, 2, 'Fabrius Artificum', CardType.Charakter, 'YELLOW', 'Wenn Fabrius Artificium ins Spiel kommt, ziehe eine Karte.', s(1, 1)),
  new Card(92, 4, 'Custos Armorum', CardType.Charakter, 'YELLOW', 'Jedes Mal, wenn einer deiner Charaktere einem Gegner Kampfschaden zufügt, ziehe eine Karte.', s(2, 6), [Skill.Ansturm]),
  new Card(93, 3, 'Blitz Rorarius', CardType.Charakter, 'YELLOW', 'Gegnerische Karten kommen erschöpft ins Spiel.', s(5, 3)),
  new Card(94, 2, 'Blaublitz Magus', CardType.Charakter, 'YELLOW', 'Alle Karten ausser Charaktere kosten 1 :macht: mehr zum Ausspielen.', s(4, 1), [Skill.Ersthieb]),
  new Card(95, 2, 'Bellona, Anführerin der goldenen Legion', CardType.Avatar, 'YELLOW', 'Alle Fähigkeiten, die Bellona, Anführerin der goldenen Legion durch Ausrüstungen erhält, erhalten auch deine anderen Charaktere.  Avatareffekt:  Deine Ausrüstungen kosten 1 :macht: weniger.', s(3, 3, 40)),
  new Card(96, 1, 'Balanceakt', CardType.Aktion, 'YELLOW', 'Verbanne einen Charakter deiner Wahl und bringe ihn sofort unter der Kontrolle seines Besitzers zurück ins Spiel.', null, [Skill.Schnelligkeit]),
  new Card(97, 1, 'Angreifender Hastatus', CardType.Charakter, 'YELLOW', '', s(2, 2), [Skill.Ansturm]),
  new Card(98, 4, 'Kommandierende Primus', CardType.Charakter, 'YELLOW', 'Jedes Mal, wenn du einen Charakter ausspielst, ziehe eine Karte.', s(6, 4), [Skill.Ansturm]),
  new Card(99, 3, 'Wildnis', CardType.Feld, 'YELLOW', 'Alle Charaktere haben Basis-Angriff und -Verteidigung 1/1.'),
  new Card(100, 2, 'Verlorenes Arsenal', CardType.Einfluss, 'YELLOW', 'Der ausgerüstete Charakter erhält Hast und Schild.  1 :macht:, :pfeil:: Ausrüsten.'),
  new Card(101, 2, 'Verwesung', CardType.Aktion, 'BLACK', 'Zerstöre einen Charakter deiner Wahl. Du verlierst Lebenspunkte in Höhe seines Angriffs.', null, [Skill.Schnelligkeit]),
  new Card(102, 1, 'Versklavter Bypochtbonia', CardType.Charakter, 'BLACK', 'Wenn Versklavter Bypochtbonia besiegt wird, dünnt jeder Gegner 2 Karten aus.', s(1, 1), [Skill.Faeulnis]),
  new Card(103, 1, 'Sog der Dunkelheit', CardType.Aktion, 'BLACK', 'Jeder Gegner dünnt 2 Karten aus. Ziehe eine Karte.', null, [Skill.Schnelligkeit]),
  new Card(104, 1, 'Seelenverschlingendes Schwert', CardType.Einfluss, 'BLACK', 'Der ausgerüstete Charakter erhält +2/+0. Jedes Mal, wenn der ausgerüstete Charakter angreift, dünnt der verteidigende Spieler 2 Karten aus.  1 :macht:, :pfeil:: Ausrüsten.'),
  new Card(105, 3, 'Ritual der Verbannung', CardType.Aktion, 'BLACK', 'Bestimme einen Kartennamen. Durchsuche das Lazarett, die Hand und das Deck eines Gegners deiner Wahl und verbanne alle Karten mit dem genannten Namen. Der Gegner mischt anschließend das Deck.'),
  new Card(106, 3, 'Pure Dunkelheit', CardType.Feld, 'BLACK', 'Alle Charaktere erhalten -1/-1.'),
  new Card(107, 2, 'Misophaes Bote', CardType.Charakter, 'BLACK', 'Wenn Misophaes Bote ins Spiel kommt, dünnt jeder Gegner 2 Karten aus.', s(1, 1), [Skill.Flug, Skill.Faeulnis]),
  new Card(108, 1, 'Gebundener Misophaes', CardType.Charakter, 'BLACK', 'Jedes Mal, wenn du eine Macht ausspielst, dünnt jeder Gegner 2 Karten aus.', s(0, 5), [Skill.Flug, Skill.Verhuellung]),
  new Card(109, 3, 'Enalia Wächterin', CardType.Charakter, 'BLACK', '', s(5, 3), [Skill.Flug, Skill.Lebensraub]),
  new Card(110, 3, 'Dunkle Auferstehung', CardType.Aktion, 'BLACK', 'Bringe einen Charakter deiner Wahl von einem gegnerischen Lazarett unter deiner Kontrolle zurück ins Spiel.'),
  new Card(111, 2, 'Die Sündering Azazel', CardType.Avatar, 'BLACK', 'Du kannst 2 Felder kontrollieren. Deine Gegner können keine Karten ausspielen.  Avatareffekt:  Deine Felder kosten 1 :macht: weniger.', s(3, 2, 40), [Skill.Flug]),
  new Card(112, 3, 'Chthonia Kriegstreiber', CardType.Charakter, 'BLACK', 'Jedes Mal, wenn ein Charakter besiegt wird, ziehe eine Karte und verliere 2 Lebenspunkte.', s(4, 4), [Skill.Flug]),
  new Card(113, 4, 'Asbeel, der Aufgegebene', CardType.Avatar, 'BLACK', 'Wenn du einen Gegner ausdünnen lässt, verdopple die Zahl der Karten, die ausgedünnt werden.  Avatareffekt:  Jedes Mal, wenn ein Gegner Lebenspunkte verliert, dünnt er eine Karte aus.', s(2, 8, 45), [Skill.Flug, Skill.Verhuellung]),
  new Card(114, 2, 'Albtraumflur', CardType.Feld, 'BLACK', 'Jedes Mal, wenn ein Spieler Lebenspunkte verliert, dünnt er ebenso viele Karten aus, wie er Lebenspunkte verloren hat.'),
  new Card(115, 4, 'Aeria Höllenbotin', CardType.Charakter, 'BLACK', 'Wenn Aeria Höllenbotin ins Spiel kommt, zerstöre einen anderen Charakter deiner Wahl. Du verlierst Lebenspunkte in Höhe seines Angriffs.', s(4, 2), [Skill.Flug]),
  new Card(116, 2, 'Adelsfriedhof', CardType.Feld, 'BLACK', 'Jedes Mal, wenn ein Spieler ausdünnt, erhöhe die Zahl der auszudünnenden Karten um 2.'),
  new Card(117, 4, 'Schwarze Krönung', CardType.Aktion, 'BLACK', 'Zerstöre alle Charaktere im Spiel.'),
  new Card(118, 5, 'Ieshim, die Wächterin', CardType.Avatar, 'BLACK', '3 :macht:, :pfeil:: Bringe einen Charakter deiner Wahl von einem gegnerischen Lazareit unter deiner Kontrolle zurück ins Spiel. Du verlierst Lebenspunkte in Höhe seiner Machtkosten.  Avatareffekt:  Jedes Mal, wenn du einen Gegner ausdünnen lässt, dünnt er eine Karte mehr aus.', s(6, 10, 35), [Skill.Lebensraub]),
  new Card(119, 3, 'Hyraia Wächterin', CardType.Charakter, 'BLACK', 'Jedes Mal, wenn du Lebenspunkte erhältst, dünnt jeder Gegner ebenso viele Karten aus.', s(6, 4), [Skill.Lebensraub]),
  new Card(120, 2, 'Fluch des Ebenbilds', CardType.Aktion, 'BLACK', 'Jeder Gegner dünnt 7 Karten aus.'),
  new Card(121, 3, 'Wurzelspeer', CardType.Einfluss, 'GREEN', 'Der ausgerüstete Charakter erhält +6/+2, Durchbruch und Lebensraub.  2 :macht:, :pfeil:: Ausrüsten.'),
  new Card(122, 2, 'Wächter Chimali', CardType.Avatar, 'GREEN', 'Jedes Mal, wenn du einen Charakter ausspielst, lege einen [+1/+1]-Zähler auf Wächter Chimali.  Deine Charaktere kosten 1 :macht: weniger für jeden [+1/+1]-Zähler auf Wächter Chimali.  Avatareffekt:  Im ersten Zug erhältst du in deiner Hauptphase 1 :macht:.', s(1, 1, 45)),
  new Card(123, 1, 'Späherin Tochtli', CardType.Charakter, 'GREEN', 'Jedes Mal, wenn du eine Karte als Macht ausspielst, erhältst du 1 Lebenspunkt.', s(1, 5), [Skill.Fernkampf]),
  new Card(124, 1, 'Rast im Grünen', CardType.Aktion, 'GREEN', 'Ein Spieler deiner Wahl erhält 5 Lebenspunkte.', null, [Skill.Schnelligkeit]),
  new Card(125, 3, 'Priesterin Amankaya', CardType.Avatar, 'GREEN', 'Jedes Mal, wenn du Lebenspunkte erhältst, kannst du 2 :macht: bezahlen. Wenn du dies tust, ziehe eine Karte.  Avatareffekt:  Jedes Mal, wenn dein Zug beginnt, erhältst du 1 Lebenspunkt.', s(1, 7, 35), [Skill.Lebensraub]),
  new Card(126, 1, 'Neuer Anfang', CardType.Aktion, 'GREEN', 'Zerstöre einen Einfluss. Du erhältst Lebenspunkte in Höhe seiner Machtkosten.', null, [Skill.Schnelligkeit]),
  new Card(127, 2, 'Nagual Tauren', CardType.Charakter, 'GREEN', 'Verbanne eine Karte deiner Wahl aus einem Lazarett. War es keine Aktion, lege einen [+1/+1]-Zähler auf Nagual Tauren und erhalte 1 Lebenspunkt.', s(1, 1)),
  new Card(128, 2, 'Mayel, die Diplomatin', CardType.Charakter, 'GREEN', 'Jedes Mal, wenn ein Charakter unter deiner Kontrolle ins Spiel kommt, lege einen [+1/+1]-Zähler auf Mayel, die Diplomatin. Gegnerische Charaktere mit weniger Angriff als Mayel, die Diplomatin können deine Charaktere nicht blocken.', s(1, 1), [Skill.Ausdauer]),
  new Card(129, 2, 'Geisterwald', CardType.Feld, 'GREEN', 'Karten können nur im eigenen Zug ausgespielt werden.'),
  new Card(130, 3, 'Formwandler Itzli', CardType.Charakter, 'GREEN', 'Jedes Mal, wenn eine Karte ausgespielt wird, lege einen [+1/+1]-Zähler auf Formwandler Itzli.', s(1, 1), [Skill.Durchbruch]),
  new Card(131, 1, 'Einnahme des Lebenstranks', CardType.Aktion, 'GREEN', 'Erhole einen Charakter deiner Wahl. Er erhält +2/+6 und Fernkampf bis zum Ende des Zuges.  Du erhältst 2 Lebenspunkte.', null, [Skill.Schnelligkeit]),
  new Card(132, 1, 'Cantico', CardType.Charakter, 'GREEN', ' Wenn Cantico oder ein anderer Charakter ins Spiel kommt, erhältst du 1 Lebenspunkt.', s(1, 1)),
  new Card(133, 2, 'Buch der Natur', CardType.Einfluss, 'GREEN', 'Der ausgerüstete Charakter erhält +X/+X, wobei X den Lebenspunkten entspricht, die du in diesem Zug erhalten hast.  1 :macht:, :pfeil:: Ausrüsten.'),
  // bis zu 8 Karten zuoberst auf seinem Deck
  new Card(134, 1, 'Bad im heildenden See', CardType.Aktion, 'GREEN', 'Ein Spieler mischt bis zu 4 Karten deiner Wahl von seinem Lazarett zurück ins Deck.', null, [Skill.Schnelligkeit]),
  new Card(135, 2, 'Alter Xulan', CardType.Charakter, 'GREEN', 'Jedes Mal, wenn du Lebenspunkte erhältst, lege einen [+1/+1]-Zähler auf Alter Xulan.', s(1, 1), [Skill.Ausdauer, Skill.Lebensraub]),
  new Card(136, 2, 'Adeptin Payaan', CardType.Charakter, 'GREEN', '', s(5, 4), [Skill.Lebensraub]),
  new Card(137, 1, 'Verwurzelter Wald', CardType.Feld, 'GREEN', 'Wenn [+1/+1]-Zähler auf einen Charakter gelegt werden, wird jeweils einer zusätzlich hinzugefügt.'),
  new Card(138, 2, 'Garten des Seelenfriedens', CardType.Feld, 'GREEN', 'Karten, die ins Lazarett gelegt werden würden, werden stattdessen verbannt.'),
  new Card(139, 3, 'Naay, die Weise', CardType.Charakter, 'GREEN', 'Wenn Naay, die Weise ins Spiel kommt, zerstöre einen Einfluss deiner Wahl. Du erhältst Leben in Höhe von dessen Machtkosten.', s(7, 5)),
  // typo: erhältst ! nicht erhälst
  new Card(140, 6, 'Amoxtli, die Hüterin', CardType.Avatar, 'GREEN', 'Jedes Mal, wenn Amoxtli, die Hüterin angreift, erhältst du 1 Lebenspunkt. Dann erhalten alle deine Charaktere bis zum Ende des Zuges Durchbruch und +X/+X, wobei X der Anzahl Lebenspunkte entspricht, welche du in diesem Zug erhalten hast.  Avatareffekt:  Jedes Mal, wenn du Lebenspunkte erhältst, erhält du 1 Lebenspunkt mehr.', s(6, 6, 40), [Skill.Fernkampf]),
  new Card(141, 1, 'Tunnelgräber', CardType.Charakter, 'BROWN', '', s(1, 3), [Skill.Festigung]),
  new Card(142, 6, 'Trom Infanterie', CardType.Charakter, 'BROWN', '', s(14, 12), [Skill.Durchbruch, Skill.Schild]),
  new Card(143, 5, 'Trodaich Duellant', CardType.Charakter, 'BROWN', '', s(10, 12), [Skill.Duellant, Skill.Durchbruch]),
  new Card(144, 2, 'Steinerne Zukunft', CardType.Feld, 'BROWN', 'Einflüsse verlieren alle Fähigkeiten.'),
  new Card(145, 1, 'Steindornen', CardType.Aktion, 'BROWN', 'Ein Charakter deiner Wahl erhält +5/+5 bis zum Ende des Zuges.', null, [Skill.Schnelligkeit]),
  new Card(146, 3, 'Späher Alf', CardType.Charakter, 'BROWN', 'Wenn Späher Alf ins Spiel kommt, lege die oberste Karte deines Decks verdeckt und erschöpft als Macht ins Spiel.', s(1, 3), [Skill.Fernkampf]),
  new Card(147, 2, 'Radiumherz', CardType.Einfluss, 'BROWN', 'Der ausgerüstete Charakter erhält +2/+2. Jedes Mal, wenn er angreift, lege die oberste Karte deines Decks verdeckt und erschöpft als Macht ins Spiel.  2 :macht:, :pfeil:: Ausrüsten.'),
  new Card(148, 4, 'Mor Schildträger', CardType.Charakter, 'BROWN', '', s(2, 10), [Skill.Ausdauer, Skill.Festigung]),
  new Card(149, 4, 'Mienenausbau', CardType.Aktion, 'BROWN', 'Lege diese Karte und die oberste Karte deines Decks verdeckt und erschöpft als Macht ins Spiel.'),
  new Card(150, 2, 'Medium Roya', CardType.Avatar, 'BROWN', 'Du kannst in deinem Zug eine zusätzliche Macht ausspielen.  Avatareffekt:  Zu Beginn deines ersten Zuges im Spiel ziehe eine zusätzliche Karte.', s(1, 5, 45), [Skill.Verhuellung]),
  new Card(151, 7, 'Leigir Ord Mor', CardType.Charakter, 'BROWN', 'Wenn Leigir Ord Mor ins Spiel kommt, zerstöre eine bleibende Karte deiner Wahl.', s(6, 6), [Skill.Schnelligkeit]),
  new Card(152, 5, 'Keir Steinbrecher', CardType.Avatar, 'BROWN', 'Jedes Mal, wenn du einen Charakter ausspielst, ziehe eine Karte. Dann kannst du eine Karte als Macht legen.  Avatareffekt:  Deine anderen Archtaren-Charaktere erhalten +0/+1.', s(4, 8, 40)),
  new Card(153, 3, 'In Stein rahmen', CardType.Aktion, 'BROWN', 'Ziehe eine Karte. Du kannst eine Karte von deiner Hand verdeckt und erschöpft als Macht ins Spiel bringen.', null, [Skill.Schnelligkeit]),
  new Card(154, 2, 'Hartstein Hammer', CardType.Einfluss, 'BROWN', 'Der ausgerüstete Charakter erhält +X/+X, wobei X die Anzahl an Macht ist, die du kontrollierst.  3 :macht:, :pfeil:: Ausrüsten.'),
  new Card(155, 2, 'Erzfund', CardType.Aktion, 'BROWN', 'Lege diese Karte verdeckt und erschöpft als Macht ins Spiel.'),
  new Card(156, 8, 'Eoghan', CardType.Avatar, 'BROWN', 'Jedes Mal, wenn Eoghan einem Gegner Kampfschaden zufügt, schaue dir ebenso viele Karten, wie Kampfschaden zugefügt wurde, von oberhalb deines Decks an. Bringe davon einen Charakter direkt ins Spiel und lege den Rest in zufälliger Reihenfolge unter dein Deck.  Avatareffekt:  Im ersten Zug erhältst du in deiner Hauptphase 1 :macht:.', s(14, 12, 40), [Skill.Duellant, Skill.Durchbruch]),
  new Card(157, 5, 'Enya Dylan', CardType.Charakter, 'BROWN', 'Jedes Mal, wenn du eine Macht ausspielst, ziehe eine Karte.', s(6, 6), [Skill.Verhuellung]),
  new Card(158, 2, 'Domhainn Zitadelle', CardType.Feld, 'BROWN', 'Karten kosten 1 :macht: weniger zum Ausspielen.'),
  new Card(159, 3, 'Baya, die Stürmerin', CardType.Charakter, 'BROWN', '', s(9, 8)),
  new Card(160, 5, 'Söldner rekrutieren', CardType.Aktion, 'BROWN', 'Ziehe so viele Karten, wie der höchste Angriff der Charaktere unter deiner Kontrolle beträgt.'),
];

export function cardById(id: number): Card {
  const card = allCards[id - 1];
  if (card === undefined) {
    throw new Error(`unknown cardId=${id}`);
  }
  return card;
}

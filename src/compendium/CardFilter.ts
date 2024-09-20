import {allCards} from '../core/CardData.ts';
import {Card, CardType, DeckSort, Fraction, Skill} from '../core/Card.ts';
import {useComputedCards} from '../Util.ts';
import {signal} from '@preact/signals';

const normalize = (x: string) => x.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9+/]/ug, ' ');

// lowercase, then drop accents (ä -> a), then we drop non-ascii
const filterPreload: string[] = allCards.map(
  card => normalize(' ' + card.name + ' ' + card.description + ' ' + CardType[card.type] + ' ' + card.skill.map(x => Skill[x]).join(' ')));

export interface CardFilterType {
  filterFractions: Fraction[],
  filterText: string,
}

function findMatching(filterFor: CardFilterType): Card[] {
  const normSearchText = ' ' + normalize(filterFor.filterText).trim();
  const textPredicate = (x: Card) => filterPreload[x.id - 1].includes(normSearchText);
  const fractionPredicate = (x: Card) => filterFor.filterFractions.length === 0 || filterFor.filterFractions.includes(x.fraction);
  return allCards.filter(fractionPredicate)
    .filter(textPredicate)
    .sort(DeckSort.byCost)
    .sort(DeckSort.byFraction);
}

export const filterSignal = signal<CardFilterType>({
  filterFractions: [],
  filterText: '',
});

export function useFilteredCards() {
  return useComputedCards(() => findMatching(filterSignal.value)
    .sort(DeckSort.byCost)
    .sort(DeckSort.byFraction));
}

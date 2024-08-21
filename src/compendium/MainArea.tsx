import CardBoard from './CardBoard.tsx';
import CardFilter from './CardFilter.tsx';
import {Box, Toolbar} from '@mui/material';
import {Card, DeckSort, Fraction} from '../core/Card.ts';
import {allCards} from '../core/CardData.ts';
import {useSignal} from '@preact/signals';
import {useComputedCached} from '../Util.ts';

export interface CardFilterType {
  filterFractions: Fraction[],
  filterText: string,
}

function MainArea() {
  const filterSignal = useSignal<CardFilterType>({
    filterFractions: [],
    filterText: '',
  });
  const filteredCardsSignal = useComputedCached<Card[]>(() => {
    const {
      filterFractions,
      filterText,
    } = filterSignal.value;
    const fractionPredicate = (x: Card) => filterFractions.length === 0 || filterFractions.includes(x.fraction);
    const textPredicate = (x: Card) => filterText.length === 0 || x.matchesText(filterText);
    return allCards.filter(fractionPredicate)
      .filter(textPredicate)
      .sort(DeckSort.byCost)
      .sort(DeckSort.byFraction);
  }, (a, b) => a.length === b.length && a.every((value, i) => value.id === b[i].id));
  return (
    <Box component="main" sx={{width: '100%'}}>
      <Toolbar />
      <CardFilter filterSignal={filterSignal} />
      <CardBoard filteredCardsSignal={filteredCardsSignal}/>
    </Box>
  );
}

export default MainArea;

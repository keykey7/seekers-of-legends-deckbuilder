import CardBoard from './CardBoard.tsx';
import CardFilter, {CardFilterProps} from './CardFilter.tsx';
import {Box, Toolbar} from '@mui/material';
import {SetStateAction, useState} from 'react';
import {allCards, Card, DeckSort, Fraction} from '../Card.tsx';

function MainArea() {
  const [filterFractions, setFilterFractions] = useState((): Fraction[] => []);
  const setFilterNullSafe: typeof setFilterFractions = (value: SetStateAction<string[]>) => setFilterFractions(value ?? []);
  const fractionPredicate = (x: Card) => filterFractions.length == 0 || filterFractions.includes(x.fraction);
  const [filterText, setFilterText] = useState('');
  const textPredicate = (x: Card) => filterText.length === 0 || x.matchesText(filterText);
  const filter: CardFilterProps = {
    filterFractions: filterFractions,
    setFilterFractions: setFilterNullSafe,
    filterText: filterText,
    setFilterText: setFilterText,
  };

  const shownCards = allCards.filter(fractionPredicate)
    .filter(textPredicate)
    .sort(DeckSort.byCost)
    .sort(DeckSort.byFraction);
  return (
    <Box component="main" sx={{width: '100%'}}>
      <Toolbar />
      <CardFilter filter={filter} />
      <CardBoard cards={shownCards}/>
    </Box>
  );
}

export default MainArea;

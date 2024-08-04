import CardBoard from './CardBoard.tsx';
import FractionFilter from './FractionFilter.tsx';
import {Box, Toolbar} from '@mui/material';
import {SetStateAction, useState} from 'react';
import {allCards, Card, DeckSort, Fraction} from '../Card.tsx';

function MainArea() {
  const [filterFractions, setFilterFractions] = useState((): Fraction[] => []);
  const setFilterNullSafe: typeof setFilterFractions = (value: SetStateAction<string[]>) => setFilterFractions(value ?? []);
  const fractionPredicate = (x: Card) => filterFractions.length == 0 || filterFractions.includes(x.fraction)

  const shownCards = allCards.filter(fractionPredicate)
    .sort(DeckSort.byCost)
    .sort(DeckSort.byFraction);
  return (
    <Box component="main" sx={{width: '100%'}}>
      <Toolbar />
      <FractionFilter filterFractions={filterFractions} setFilterFractions={setFilterNullSafe}/>
      <CardBoard cards={shownCards}/>
    </Box>
  );
}

export default MainArea;

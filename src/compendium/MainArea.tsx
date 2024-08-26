import CardBoard from './CardBoard.tsx';
import CardFilter from './CardFilter.tsx';
import {Box, Toolbar} from '@mui/material';
import {filterSignal, useFilteredCards} from './CardFilter.ts';

function MainArea() {
  const filteredCardsSignal = useFilteredCards();
  return <Box component="main"
    sx={{width: '100%'}}>
    <Toolbar />
    <CardFilter filterSignal={filterSignal} />
    <CardBoard filteredCardsSignal={filteredCardsSignal} />
  </Box>;
}

export default MainArea;

import CardBoard from './CardBoard.tsx';
import FractionFilter from './FractionFilter.tsx';
import {Box, Toolbar} from '@mui/material';
import {useState} from 'react';
import {cards, Fraction} from '../Card.tsx';

function MainArea() {
  const [filterFractions, setFilterFractions] = useState((): Fraction[] => []);
  const shownCards = cards.filter(x => filterFractions.length == 0 || filterFractions.includes(x.fraction));

  return (
    <Box component="main">
      <Toolbar />
      <FractionFilter filterFractions={filterFractions} setFilterFractions={setFilterFractions}/>
      <CardBoard cards={shownCards}/>
    </Box>
  );
}

export default MainArea;

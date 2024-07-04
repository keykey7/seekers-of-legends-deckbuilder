import CardBoard from './CardBoard.tsx';
import FractionFilter from './FractionFilter.tsx';
import {Box, Toolbar} from '@mui/material';
import {SetStateAction, useState} from 'react';
import {allCards, Card, Fraction} from '../Card.tsx';
import {useAvatar} from '../deck/context/DeckProvider.tsx';


const avatarFirst = (a: Card, b: Card) => a.type - b.type;
const costLowToHigh = (a: Card, b: Card) => a.costNumber() - b.costNumber();
const fractionSort = (a: Card, b: Card) => -a.fraction.localeCompare(b.fraction);

function MainArea() {
  const [filterFractions, setFilterFractions] = useState((): Fraction[] => []);
  const setFilterNullSafe: typeof setFilterFractions = (value: SetStateAction<string[]>) => setFilterFractions(value ?? []);
  const fractionPredicate = (x: Card) => filterFractions.length == 0 || filterFractions.includes(x.fraction)
  const avatar = useAvatar();

  const shownCards = allCards.filter(fractionPredicate)
    .sort(costLowToHigh)
    .sort(fractionSort);
  return (
    <Box component="main">
      <Toolbar />
      <FractionFilter filterFractions={filterFractions} setFilterFractions={setFilterNullSafe}/>
      <CardBoard cards={shownCards}/>
    </Box>
  );
}

export default MainArea;

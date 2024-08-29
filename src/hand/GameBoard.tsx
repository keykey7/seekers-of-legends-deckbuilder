import {Box} from '@mui/material';
import Hand from './Hand.tsx';
import {cardById} from '../core/CardData.ts';

function GameBoard() {
  const cards = [2, 5, 66, 67, 7].map(x => cardById(x));
  return (<Box sx={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Box sx={{
      width: '1080px',
      height: '810px',
      background: 'darkgrey',
      overflow: 'hidden',
      position: 'relative', // because we position children relative to it
    }}>
      <Hand cards={cards} />
    </Box>
  </Box>);
}

export default GameBoard;

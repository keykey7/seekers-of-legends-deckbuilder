import CardBoard from './CardBoard.tsx';
import CardFilter from './CardFilter.tsx';
import {Box, Toolbar} from '@mui/material';

function MainArea() {
  return (
    <Box component="main">
      <Toolbar />
      <CardFilter />
      <CardBoard/>
    </Box>
  );
}

export default MainArea;

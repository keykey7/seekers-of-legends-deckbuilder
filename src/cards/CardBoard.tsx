import Grid from '@mui/material/Unstable_Grid2';
import HoverCard from './HoverCard.tsx';
import {Card} from '../Card.tsx';

interface CardBoardProps {
  cards: Card[];
}

function CardBoard({cards}: Readonly<CardBoardProps>) {
  // https://mui.com/material-ui/react-grid2/
  return (
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 2, sm: 4, md: 6, lg: 8, xl: 12}} mt={1} sx={{
      lineHeight: 0,
      justifyContent: 'center',
    }}>
      {cards.map((card) => (
        <Grid key={'deck' + card.id} xs={2}> <HoverCard card={card} /> </Grid>
      ))}
    </Grid>
  );
}

export default CardBoard;

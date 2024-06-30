import Grid from '@mui/material/Unstable_Grid2';
import HoverCard from './HoverCard.tsx';
import {Card} from '../Card.tsx';

interface CardBoardProps {
  cards: Card[];
}

function CardBoard({cards}: Readonly<CardBoardProps>) {
  // https://mui.com/material-ui/react-grid2/
  return (
    <Grid container columns={{xs: 1, sm: 2, md: 3, lg: 4, xl: 5}} sx={{
      // lineHeight: 0,
      justifyContent: 'center',
    }}>
      {cards.map((card) => (
        <Grid key={'deck' + card.id} xs={1}>
          <HoverCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardBoard;

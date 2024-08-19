import Grid from '@mui/material/Grid';
import HoverCard from './HoverCard.tsx';
import CardDetailModal from './CardDetailModal.tsx';
import {Box} from '@mui/material';
import {Card} from '../core/Card.ts';
import {CardProvider} from '../core/CardContext.tsx';
import {useSignal} from '@preact/signals';

interface CardBoardProps {
  cards: Card[];
}

function CardBoard({cards}: Readonly<CardBoardProps>) {
  const activeSignal = useSignal<Card | undefined>(undefined);
  return (<>
    <CardDetailModal activeSignal={activeSignal}
      cards={cards} />
    <Box sx={{
      justifyContent: 'center',
    }}>
      <Grid container
        columns={{
          xs: 2,
          sm: 3,
          md: 3,
          lg: 4,
          xl: 5,
        }}>
        {cards.map((card) => <Grid key={`deck${card.id}`}
          item
          xs={1}>
          <CardProvider card={card}>
            <HoverCard onClick={() => {
              activeSignal.value = card;
            }} />
          </CardProvider>
        </Grid>)}
      </Grid>
    </Box>
  </>);
}

export default CardBoard;

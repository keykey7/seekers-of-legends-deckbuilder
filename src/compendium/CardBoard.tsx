import Grid from '@mui/material/Grid';
import HoverCard from './HoverCard.tsx';
import {Card} from '../Card.tsx';
import {useState} from 'react';
import CardDetailModal, {CardDetailModalProps} from './CardDetailModal.tsx';
import {Box} from '@mui/material';

interface CardBoardProps {
  cards: Card[];
}

function CardBoard({cards}: Readonly<CardBoardProps>) {
  const [detailCard, setDetailCard] = useState<Card | undefined>(undefined);
  let modal = <></>;
  if (detailCard !== undefined) {
    const currentIndex = cards.indexOf(detailCard);
    const modalProps: CardDetailModalProps = {
      onClose: () => setDetailCard(undefined),
      hasPrevious: currentIndex !== 0,
      onPrevious: () => setDetailCard(cards[currentIndex - 1]),
      card: detailCard,
      hasNext: currentIndex!==cards.length - 1,
      onNext: () => setDetailCard(cards[currentIndex + 1]),
    };
    modal = <CardDetailModal {...modalProps} />
  }

  // https://mui.com/material-ui/react-grid2/
  return (
    <>
      {modal}
      <Box sx={{
        // lineHeight: 0,
        justifyContent: 'center',
      }}>
        <Grid container columns={{xs: 2, sm: 3, md: 3, lg: 4, xl: 5}} >
          {cards.map((card) => (
            <Grid item key={`deck${card.id}`} xs={1}>
              <HoverCard card={card} onDetailClick={() => setDetailCard(card)}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>

  );
}

export default CardBoard;

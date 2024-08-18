import Grid from '@mui/material/Grid';
import HoverCard from './HoverCard.tsx';
import {useState} from 'react';
import CardDetailModal, {CardDetailModalProps} from './CardDetailModal.tsx';
import {Box} from '@mui/material';
import {Cached, CardProvider} from '../deck/context/CardProvider.tsx';
import {Card} from '../core/Card.ts';
import {useDeck} from '../deck/context/DeckContext.ts';

interface CardBoardProps {
  cards: Card[];
}

function CardBoard({cards}: Readonly<CardBoardProps>) {
  const deck = useDeck();
  const [detailCard, setDetailCard] = useState<Card | undefined>(undefined);
  let modal = <></>;
  if (detailCard !== undefined) {
    const currentIndex = cards.indexOf(detailCard);
    const modalProps: CardDetailModalProps = {
      onClose: () => setDetailCard(undefined),
      hasPrevious: currentIndex !== 0,
      onPrevious: () => setDetailCard(cards[currentIndex - 1]),
      card: detailCard,
      hasNext: currentIndex !== cards.length - 1,
      onNext: () => setDetailCard(cards[currentIndex + 1]),
    };
    modal = <CardProvider card={detailCard}
      count={deck.countByType(detailCard)}>
      <CardDetailModal {...modalProps} />
    </CardProvider>;
  }
  return (<>
    {modal}
    <Box sx={{
      // lineHeight: 0,
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
        {cards.map((card) => <Cached key={`deck${card.id}`}
          deps={[deck.isMaxCount(card)]}>
          <Grid item
            xs={1}>
            <CardProvider card={card}
              count={deck.countByType(card)}>
              <HoverCard setDetailCard={setDetailCard} />
            </CardProvider>
          </Grid>
        </Cached>)}
      </Grid>
    </Box>
  </>);
}

export default CardBoard;

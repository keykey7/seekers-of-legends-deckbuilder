import {Card} from '../core/Card.ts';
import {Box} from '@mui/material';

interface CardInPlayProps {
  card: Card;
}

export function CardInPlay({card}: Readonly<CardInPlayProps>) {
  return (<Box sx={{
    height: '300px',
    aspectRatio: '2429 / 3308', // same as actual image
  }}>
    <Box aria-label={card.name}
      sx={{
        backgroundImage: `url(${card.imageSrc()})`,
        borderRadius: 2.5,
        backgroundSize: `105%`, // since cards are cut
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.4))',
        position: 'relative',
        imageRendering: 'crisp-edges',
      }} />
  </Box>);
}

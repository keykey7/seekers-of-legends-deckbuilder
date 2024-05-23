import {Box, ListItem} from '@mui/material';
import {cardById} from '../Card.tsx';
import {drawerWidth} from './DeckDrawer.tsx';

function DeckItem({cardId} :{readonly cardId: number}) {
  const card = cardById(cardId);
  return (
    <ListItem sx={{
      height: '48px',
      my: 1,
      background: `linear-gradient(to right, white, white, white, white, black, black), url('${card.imageSrc()}') 50% 4% / ${drawerWidth * 1.2}px`,
      backgroundBlendMode: 'multiply', // gradient combined with image
    }}>
      {/* this draws the right preview of the center motive on top of the title text */}
      <Box component="span" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(to left, white, white, black, black, black, black), url('${card.imageSrc()}') right -300% top 25% / ${drawerWidth / 1.2}px`,
        backgroundBlendMode: 'multiply', // gradient combined with image
        mixBlendMode: 'screen', // the combined background printed onto the layer below
      }}></Box>
    </ListItem>
  );
}

export default DeckItem;

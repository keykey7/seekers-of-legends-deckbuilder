import {ListItem, ListItemText} from '@mui/material';
import {cardById} from '../Card.tsx';

function DeckItem({cardId} :{cardId: number}) {
  const card = cardById(cardId);
  return (
    <ListItem sx={{
      backgroundImage: 'url(' + card.imageSrc() + ')',
      backgroundSize: '300px',
      backgroundPosition: '-20px -10px'
    }}>
      <ListItemText primary={"text"} />
    </ListItem>
  );
}

export default DeckItem;

import DeckItem from './DeckItem.tsx';
import {Box, Typography} from '@mui/material';
import {Card} from '../core/Card.ts';

/**
 * A special version of a DeckItem representing the Avatar.
 */
function DeckAvatar({avatar}: Readonly<{avatar: Card | undefined}>) {
  let element = <Box sx={{
    pt: 2,
    pb: 1,
    textAlign: 'center',
  }}>
    <Typography variant="h5"
      component="div">
      Wähle dein Avatar
    </Typography>
  </Box>;
  if (avatar !== undefined) {
    element = <Box my={'20px'}
      sx={{
        boxShadow: '0 0 20px grey',
      }}>
      <DeckItem card={avatar} />
    </Box>;
  }
  return (<>
      {element}
    </>);
}

export default DeckAvatar;

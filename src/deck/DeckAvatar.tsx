import DeckItem from './DeckItem.tsx';
import { Box, Typography } from '@mui/material';
import { Card } from '../core/Card.ts';
import { filterSignal } from '../compendium/CardFilter.ts';

export const AVATAR_FILTER_TEXT = 'Avatar';

/**
 * A special version of a DeckItem representing the Avatar.
 */
function DeckAvatar({avatar}: Readonly<{avatar: Card | undefined}>) {
  const onFilterForAvatar = () => {
    filterSignal.value = {
      ...filterSignal.value,
      filterText: AVATAR_FILTER_TEXT,
    };
  };
  let element = <Box sx={{
    pt: 2,
    pb: 1,
    textAlign: 'center',
  }}>
    <Typography variant="h5"
      component="div"
      onClick={onFilterForAvatar}
      sx={{
        cursor: 'pointer',
      }}>
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

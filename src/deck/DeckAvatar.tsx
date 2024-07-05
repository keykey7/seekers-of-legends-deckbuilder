import DeckItem from './DeckItem.tsx';
import {cardById} from '../Card.tsx';
import StableUrl from './StableUrl.tsx';
import {Box, Typography} from '@mui/material';

/**
 * A special version of a DeckItem representing the Avatar.
 */
function DeckAvatar({cardId}: {cardId: number | undefined}) {
  let element = <Box sx={{
    pt: 2,
    pb: 1,
    textAlign: "center",
  }}>
    <Typography variant="h5" component="div">
      Wähle dein Avatar
    </Typography>
  </Box>;
  if (cardId !== undefined) {
    const avatar = cardById(cardId);
    element = <Box my={"20px"} sx={{
      boxShadow: '0 0 20px grey',
    }}>
      <DeckItem cardId={avatar.id} actualCost={avatar.cost as string} costModifier={0} amount={1} />
    </Box>
  }
  return (
    <>
      <StableUrl />
      {element}
    </>
  );
}

export default DeckAvatar;

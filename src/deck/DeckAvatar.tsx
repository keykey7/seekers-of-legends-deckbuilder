import DeckItem from './DeckItem.tsx';
import {cardById} from '../Card.tsx';
import StableUrl from './StableUrl.tsx';
import {Box} from '@mui/material';

function DeckAvatar({cardId}: {cardId: number | undefined}) {
  let element = <Box sx={{
    height: '100%',
    textAlign: "center",
  }}>NO AVATAR</Box>;
  if (cardId !== undefined) {
    const avatar = cardById(cardId);
    element = <DeckItem cardId={avatar.id} actualCost={avatar.cost as string} costModifier={0} amount={1} />
  }
  return (
    <>
      <StableUrl />
      <Box my={"20px"} sx={{
        boxShadow: '0 0 20px grey',
      }}>
        {element}
      </Box>
    </>
  );
}

export default DeckAvatar;

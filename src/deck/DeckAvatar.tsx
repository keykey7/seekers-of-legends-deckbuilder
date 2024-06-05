import DeckItem from './DeckItem.tsx';
import {cardById} from '../Card.tsx';

function DeckAvatar({cardId}: {cardId: number | undefined}) {
  if(cardId === undefined) {
    return (
      <>
        <p>NO AVATAR</p>
      </>
    )
  }
  const avatar = cardById(cardId)
  return (
    <>
      <DeckItem cardId={avatar.id} actualCost={avatar.cost as string} costModifier={0} amount={1} />
    </>
  );
}

export default DeckAvatar;

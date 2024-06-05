import DeckAvatar from './DeckAvatar.tsx';
import {Divider, List} from '@mui/material';
import {useDeck} from './DeckContext.tsx';
import DeckItem from './DeckItem.tsx';

function DeckContent() {
  const deck = useDeck();
  const deckItems = deck.cards.map(cardAndCount => {
    const card = cardAndCount[0];
    const cost = card.cost;
    const mod = deck.avatar?.costModifier(card.fraction) ?? 0;
    let costStr : string;
    if (mod === 0) {
      costStr = cost.toString();
    } else if (cost === 'X') {
      costStr = 'X+' + mod;
    } else {
      costStr = (cost + mod).toString();
    }
    return (
      <DeckItem key={"deckItem" + card.id} cardId={card.id} actualCost={costStr} costModifier={mod} amount={cardAndCount[1]} />
    );
  })
  return (
    <List>
      <DeckAvatar cardId={deck.avatar?.id} />
      <Divider />
      {deckItems}
    </List>
  );
}

export default DeckContent;

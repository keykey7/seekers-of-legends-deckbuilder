import Drawer from '@mui/material/Drawer';
import {Divider, List, Paper, Toolbar} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import { useDeck} from './DeckContext.tsx';
import DeckAvatar from './DeckAvatar.tsx';

export const drawerWidth = 348;

function DeckDrawer() {
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
      <DeckItem key={"deckItem" + card.id} cardId={card.id} actualCost={costStr} costModifier={mod} />
    );
  })
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        position: 'relative',
        pl: 3,
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', position: "relative" },
      }}
    >
      <Toolbar />
      <Paper sx={{px: 1}}>
        <List>
          <DeckAvatar cardId={deck.avatar?.id} />
          <Divider />
          {deckItems}
        </List>
      </Paper>
    </Drawer>
  );
}

export default DeckDrawer;

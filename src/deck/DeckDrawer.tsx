import Drawer from '@mui/material/Drawer';
import {Divider, List, Paper, Toolbar} from '@mui/material';
import DeckItem from './DeckItem.tsx';
import {cardById} from '../Card.tsx';

export const drawerWidth = 348;

function DeckDrawer() {
  const avatar = cardById(33);
  const cards = Array.from({ length: 10 }, (_, i) => i * 3 + 12).map(cardId => cardById(cardId));
  const deckItems = cards.map(card => {
    const cost = card.cost;
    const mod = avatar.costModifier(card.fraction);
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
          <DeckItem cardId={avatar.id} actualCost={avatar.cost as string} costModifier={0} />
          <Divider />
          {deckItems}
        </List>
      </Paper>
    </Drawer>
  );
}

export default DeckDrawer;

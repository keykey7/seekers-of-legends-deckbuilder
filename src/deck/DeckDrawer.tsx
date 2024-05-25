import Drawer from '@mui/material/Drawer';
import {Divider, List, Paper, Toolbar} from '@mui/material';
import DeckItem from './DeckItem.tsx';

export const drawerWidth = 300;

function DeckDrawer() {

  const items = Array.from({ length: 10 }, (_, i) => i * 2 + 21);
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
          <DeckItem cardId={30} />
          <Divider />
          {items.map((cardId) => (
            <DeckItem key={"deckItem" + cardId} cardId={cardId} />
          ))}
        </List>
      </Paper>
    </Drawer>
  );
}

export default DeckDrawer;

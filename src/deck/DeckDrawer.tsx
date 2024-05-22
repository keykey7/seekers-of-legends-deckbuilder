import Drawer from '@mui/material/Drawer';
import {Box, Divider, List, ListItem, ListItemText, Toolbar} from '@mui/material';
import DeckItem from './DeckItem.tsx';

function DeckDrawer() {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        position: 'relative',
        pl: 4,
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', position: "relative" },
      }}
    >
      <Toolbar />
      <Box>
        <List>
          <DeckItem cardId={21} />
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
            <ListItem key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text) => (
            <ListItem key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default DeckDrawer;

import Drawer from '@mui/material/Drawer';
import { Paper, Toolbar} from '@mui/material';
import DeckContent from './DeckContent.tsx';

export const drawerWidth = 348;

function DeckDrawer() {
  // maybe allwo collapse on small screens: https://mui.com/material-ui/react-drawer/#persistent-drawer
  return (
    <Drawer
      anchor="right"
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Paper sx={{px: 1}}>
        <DeckContent />
      </Paper>
    </Drawer>
  );
}

export default DeckDrawer;

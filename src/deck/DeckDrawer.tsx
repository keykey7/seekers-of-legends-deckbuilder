import Drawer from '@mui/material/Drawer';
import {drawerClasses, Paper, Toolbar} from '@mui/material';
import DeckContent from './DeckContent.tsx';
import DeckStats from './DeckStats.tsx';

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
        [`& .${drawerClasses.paper}`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Paper>
        <DeckStats/>
      </Paper>
      <Paper sx={{px: 1}}>
        <DeckContent />
      </Paper>
    </Drawer>
  );
}

export default DeckDrawer;

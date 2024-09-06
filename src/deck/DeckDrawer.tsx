import Drawer from '@mui/material/Drawer';
import {Box, Button, drawerClasses, Paper, Toolbar, useTheme} from '@mui/material';
import DeckContent from './DeckContent.tsx';
import DeckStats from './DeckStats.tsx';
import {useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useIsSmallScreen} from '../Util.ts';
import {getDeck} from '../core/DeckSignals.ts';
import {useComputed} from '@preact/signals';

export const drawerWidth = 348;

/**
 * Compacted / collapsed view of the Deck used on mobile.
 */
function SmallScreenDeckToggle({toggle}: Readonly<{toggle: () => void}>) {
  const count = useComputed(() => getDeck().value.count()).value;
  return (<Box sx={{
    m: 1,
    position: 'fixed',
    zIndex: 2000,
    right: 0,
  }}>
    <Button variant={count === 0 ? 'outlined' : 'contained'}
      onClick={toggle}>
      {count}
      <ArrowDropDownIcon />
    </Button>
  </Box>);
}

function DeckDrawer() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const permanentDrawerBreakpoint = theme.breakpoints.down('md');
  const isSmallScreen = useIsSmallScreen();
  const toggle = () => setOpen(!open);
  return (<>
    {isSmallScreen && <SmallScreenDeckToggle toggle={toggle} />}
    <Drawer anchor="right"
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={open}
      onClose={() => setOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .${drawerClasses.paper}`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        [permanentDrawerBreakpoint]: {
          ...(!open && {display: 'none'}),
        },
      }}>
      <Toolbar />
      <Paper>
        <DeckStats />
      </Paper>
      <Paper sx={{px: 1}}>
        <DeckContent />
      </Paper>
    </Drawer>
  </>);
}

export default DeckDrawer;

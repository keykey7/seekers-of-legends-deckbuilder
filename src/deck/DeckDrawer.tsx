import Drawer from '@mui/material/Drawer';
import { Box, Button, drawerClasses, IconButton, Paper, Toolbar, useTheme } from '@mui/material';
import DeckContent from './DeckContent.tsx';
import DeckStats from './DeckStats.tsx';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useIsSmallScreen } from '../Util.ts';
import { clearDeck, getDeck } from '../core/DeckSignals.ts';
import { useComputed } from '@preact/signals';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShareIcon from '@mui/icons-material/Share';

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

function DeckActionButtons() {
  const copyToClipboard = () => navigator.clipboard.writeText(window.location.href);
  // TODO: notification on copy
  return <Box sx={{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
  }}>
    <IconButton color="primary"
      title="Copy Deck Link"
      //variant="outlined"
      onClick={copyToClipboard}><ShareIcon /></IconButton>
    <IconButton color="error"
      title="Delete Deck"
      //variant="outlined"
      onClick={clearDeck}><DeleteForeverIcon /></IconButton>
  </Box>;
}

function DeckDrawer() {
  const [open, setOpen] = useState(document.location.hash.length > 1); // open deck view if navigated here with a deck-code
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
      <Paper elevation={0}>
        <DeckStats />
      </Paper>
      <Paper elevation={0}
        sx={{px: 1}}>
        <DeckContent />
      </Paper>
      <Paper elevation={0}
        sx={{
          p: 1,
          pt: 0,
          marginTop: 'auto', // align bottom
        }}>
        <DeckActionButtons />
      </Paper>
    </Drawer>
  </>);
}

export default DeckDrawer;

import Drawer from '@mui/material/Drawer';
import {Box, Button, drawerClasses, Paper, Toolbar, useTheme} from '@mui/material';
import DeckContent from './DeckContent.tsx';
import DeckStats from './DeckStats.tsx';
import {useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDeck} from './context/DeckProvider.tsx';
import {useIsMobile} from '../MobileUtil.ts';

export const drawerWidth = 348;

function SmallScreenDeckToggle({toggle}: Readonly<{toggle: () => void}>) {
  const deck = useDeck();
  const count = deck.count();
  return (
    <Box sx={{
      m: 1.5,
      position: 'absolute',
      // top: 64,
      zIndex: 10000,
      right: 0,
    }}>
      <Button variant={count===0 ? 'outlined' : 'contained'} onClick={toggle}>
        {count}
        <ArrowDropDownIcon />
      </Button>
    </Box>
  );
}

function DeckDrawer() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const permanentDrawerBreakpoint= theme.breakpoints.down('md')
  const isSmallScreen = useIsMobile();
  function toggle() {
    setOpen(!open);
  }
  return (
    <>
      {isSmallScreen && <SmallScreenDeckToggle toggle={toggle} />}
      <Drawer
        anchor="right"
        variant={isSmallScreen ? "temporary" : "permanent"}
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
    </>
  );
}

export default DeckDrawer;

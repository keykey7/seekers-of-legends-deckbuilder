import Drawer from '@mui/material/Drawer';
import {Box, Button, drawerClasses, Paper, Toolbar, useTheme} from '@mui/material';
import DeckContent from './DeckContent.tsx';
import DeckStats from './DeckStats.tsx';
import {useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDeck} from './context/DeckProvider.tsx';
import {useIsMobile} from '../MobileUtil.ts';
import ParticleAnimation, {Rect} from '../particles/ParticleAnimation.tsx';

export const drawerWidth = 348;

/**
 * Compacted / collapsed view of the Deck used on mobile.
 */
function SmallScreenDeckToggle({toggle}: Readonly<{toggle: () => void}>) {
  const deck = useDeck();
  const count = deck.count();
  return (
    <Box sx={{
      m: 1,
      position: 'fixed',
      zIndex: 2000,
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
  const deck = useDeck();
  const [open, setOpen] = useState(false);
  const [particleTarget, setParticleTarget] = useState<Rect>();
  const theme = useTheme();
  const permanentDrawerBreakpoint= theme.breakpoints.down('md')
  const isSmallScreen = useIsMobile();
  const toggle = () => setOpen(!open);

  // the invisible animation node
  let animation = <></>;
  if (deck.lastEvent && particleTarget) {
    animation = <Box sx={{zIndex: 3000}}>
      <ParticleAnimation from={deck.lastEvent.eventOrigin} to={particleTarget} />
    </Box>;
  }

  return (
    <>
      {animation}
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
          <DeckContent setParticleTarget={setParticleTarget} />
        </Paper>
      </Drawer>
    </>
  );
}

export default DeckDrawer;

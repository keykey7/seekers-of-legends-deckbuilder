import { AppBar, IconButton, Link, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useIsSmallScreen } from './Util.ts';
import unicorn from './assets/unicorn.png';

function TopHeader() {
  const isSmallScreen = useIsSmallScreen();
  const theme = useTheme();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // https://mui.com/material-ui/material-icons/
  return <AppBar position="fixed"
    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
    <Toolbar>
      <IconButton edge="start"
        disabled={true}
        sx={{
          height: '2em',
          mr: 1,
        }}>
        <img src={unicorn}
          alt=""
          style={{height: '100%'}} />
      </IconButton>
      <Typography noWrap
        variant="h5"
        sx={{flexGrow: 1}}>Deck Builder -{' '}
        {isVerySmallScreen ? <>SoL</> : <>Seekers of Legends</>}
      </Typography>
      {!isSmallScreen && <Link color="inherit"
          href="https://github.com/keykey7/seekers-of-legends-deckbuilder"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="link to github">
        <GitHubIcon />
      </Link>}
    </Toolbar>
  </AppBar>;
}

export default TopHeader;

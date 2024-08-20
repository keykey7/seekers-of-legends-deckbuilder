import {AppBar, IconButton, Link, Toolbar, Typography} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useIsMobile} from './Util.ts';
import unicorn from './assets/unicorn.png';

function TopHeader() {
  const isSmallScreen = useIsMobile();
  // https://mui.com/material-ui/material-icons/
  return <AppBar position="fixed"
    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
    <Toolbar>
      <a href="/">
        <IconButton edge="start"
          sx={{height: '2em'}}>
          <img src={unicorn}
            alt=""
            style={{height: '100%'}} />
        </IconButton>
      </a>
      <Typography noWrap
        variant="h5"
        sx={{flexGrow: 1}}>SoL Deckbuilder</Typography>
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

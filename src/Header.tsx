import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function Header() {
  // https://mui.com/material-ui/material-icons/
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start">
          <AutoGraphIcon/>
        </IconButton>
        <Typography variant="h5">SoL Deckbuilder</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

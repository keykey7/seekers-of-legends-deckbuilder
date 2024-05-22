import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function TopHeader() {
  // https://mui.com/material-ui/material-icons/
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start">
          <AutoGraphIcon/>
        </IconButton>
        <Typography noWrap variant="h5">SoL Deckbuilder</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopHeader;

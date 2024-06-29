import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';

function TopHeader() {
  // https://mui.com/material-ui/material-icons/
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" sx={{
          height: '2em',
        }}>
          <img src="unicorn.png" alt="" style={{height: '100%'}} />
        </IconButton>
        <Typography noWrap variant="h5">SoL Deckbuilder</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopHeader;

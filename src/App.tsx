import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import TopHeader from './TopHeader.tsx';
import MainArea from './compendium/MainArea.tsx';
import DeckDrawer from './deck/DeckDrawer.tsx';

function App() {
  // https://mui.com/material-ui/customization/dark-mode/
  const darkTheme = createTheme({
    typography: {
      fontFamily: `Proxima Nova Rg,Roboto,sans-serif`,
    },
    palette: {
      mode: 'dark',
    },
  });
  return (<ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Container maxWidth="xl"
      sx={{
        display: 'flex',
        px: 1,
      }}>
      <TopHeader />
      <MainArea />
      <DeckDrawer />
    </Container>
  </ThemeProvider>);
}

export default App;

import {Box, Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import TopHeader from './TopHeader.tsx';
import MainArea from './compendium/MainArea.tsx';
import DeckDrawer from './deck/DeckDrawer.tsx';
import ParticleAnimation from './particles/ParticleAnimation.tsx';

function App() {
  // https://mui.com/material-ui/customization/dark-mode/
  const darkTheme = createTheme({
    typography: {
      fontFamily: `Proxima Nova Rg,Roboto,sans-serif`,
      fontSize: 16,
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
      <Box sx={{zIndex: 3000}}>
        <ParticleAnimation />
      </Box>;
    </Container>
  </ThemeProvider>);
}

export default App;

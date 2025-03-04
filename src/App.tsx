import {Box, Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import TopHeader from './TopHeader.tsx';
import MainArea from './compendium/MainArea.tsx';
import DeckDrawer from './deck/DeckDrawer.tsx';
import ParticleAnimation from './particles/ParticleAnimation.tsx';

function App() {
  // https://mui.com/material-ui/customization/dark-mode/
  const darkTheme = createTheme({
    typography: {
      fontFamily: `FuturaEF-Book,Roboto,sans-serif`,
      fontSize: 17,
      body1: {
        lineHeight: 1,
      }
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#d5d5d5',
      },
      secondary: {
        main: '#6e439f',
      }
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

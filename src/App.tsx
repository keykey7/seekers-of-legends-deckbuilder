import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import TopHeader from './TopHeader.tsx';
import MainArea from './cards/MainArea.tsx';
import DeckDrawer from './deck/DeckDrawer.tsx';
import {DeckProvider} from './deck/DeckContext.tsx';

function App() {
  // https://mui.com/material-ui/customization/dark-mode/
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ display: 'flex' }} maxWidth="xl">
        <TopHeader />
        <DeckProvider>
          <MainArea/>
          <DeckDrawer />
        </DeckProvider>
      </Container>
    </ThemeProvider>
  )
}

export default App

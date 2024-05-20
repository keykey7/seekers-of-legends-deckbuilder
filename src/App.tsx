import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Header from './Header.tsx';
import MainArea from './cards/MainArea.tsx';

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
      <Container>
        <Header />
        <MainArea/>
      </Container>
    </ThemeProvider>
  )
}

export default App

import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import GameBoard from './hand/GameBoard.tsx';

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
    <GameBoard />
  </ThemeProvider>);
}

export default App;

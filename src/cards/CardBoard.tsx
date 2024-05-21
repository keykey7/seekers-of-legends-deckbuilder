import Grid from '@mui/material/Unstable_Grid2';
import Card from './Card.tsx';

function CardBoard() {
  // https://mui.com/material-ui/react-grid2/
  return (
    <>
      <Grid container spacing={2} xs={12} mt={1} sx={{lineHeight: 0}}>
        <Grid xs={2}><Card></Card></Grid>
        <Grid xs={2}><Card></Card></Grid>
        <Grid xs={2}><Card></Card></Grid>
        <Grid xs={2}><Card></Card></Grid>
        <Grid xs={2}><Card></Card></Grid>
        <Grid xs={2}><Card></Card></Grid>
        <Grid xs={2}><Card></Card></Grid>
        <Grid xs={2}><Card></Card></Grid>
      </Grid>
    </>
  );
}

export default CardBoard;

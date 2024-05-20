import Grid from '@mui/material/Unstable_Grid2';

function CardBoard() {
  // https://mui.com/material-ui/react-grid2/
  return (
    <>
      <Grid container spacing={2} xs={12}>
        <Grid xs={2}>Blupp</Grid>
        <Grid xs={2}>Blupp</Grid>
        <Grid xs={2}>Blupp</Grid>
        <Grid xs={2}>Blupp</Grid>
        <Grid xs={2}>Blupp</Grid>
        <Grid xs={2}>Blupp</Grid>

      </Grid>
    </>
  );
}

export default CardBoard;

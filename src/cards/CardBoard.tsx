import Grid from '@mui/material/Unstable_Grid2';
import HoverCard from './HoverCard.tsx';

function CardBoard() {
  // https://mui.com/material-ui/react-grid2/
  const items = Array.from({ length: 20 }, (_, i) => i + 21);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 6, lg: 8, xl:12 }} mt={1} sx={{lineHeight: 0, justifyContent: 'center'}}>
      {items.map((cardId) => (
        <Grid xs={2}><HoverCard cardId={cardId} /> </Grid>
      ))}
    </Grid>
  );
}

export default CardBoard;

import Grid from '@mui/material/Unstable_Grid2';
import Card from './Card.tsx';

function CardBoard() {
  // https://mui.com/material-ui/react-grid2/
  const items = Array.from({ length: 20 }, (_, i) => i + 21);

  return (
    <Grid container spacing={2} xs={12} mt={1} sx={{lineHeight: 0}}>
      {items.map((cardId) => (
        <Grid xs={2}><Card cardId={cardId} /> </Grid>
      ))}
    </Grid>
  );
}

export default CardBoard;

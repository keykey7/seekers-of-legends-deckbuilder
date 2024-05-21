import {Box, ToggleButton, ToggleButtonGroup} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';

function CardFilter() {
  const [fraction, setFraction] = React.useState(() => ['r', 'g', 'b']);
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFraction(newFormats);
  };
  return (
    <Box p={2}>
      <ToggleButtonGroup
        value={fraction}
        onChange={handleChange}>
        <ToggleButton value="r" aria-label="bold">
          <FavoriteIcon />
        </ToggleButton>
        <ToggleButton value="g" aria-label="italic">
          <FavoriteIcon />
        </ToggleButton>
        <ToggleButton value="b" aria-label="underlined">
          <FavoriteIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default CardFilter;

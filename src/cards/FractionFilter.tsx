import {Box, Icon, ToggleButton, ToggleButtonGroup} from '@mui/material';
import React from 'react';
import {cardById, Fraction, Fractions} from '../Card.tsx';

function FractionFilterItem({fraction}: Readonly<{ fraction: Fraction }>) {
  const card = cardById(Fractions.indexOf(fraction) * 20 + 1);
  return (
    <ToggleButton value={`${fraction}`} aria-label={fraction} sx={{
      p: 0,
    }}> <Icon sx={{
      // original image list, then a black diamon around it, then lighten with the background
      background: `linear-gradient(45deg, black 27%, transparent 27%), linear-gradient(135deg, black 27%, transparent 27%), linear-gradient(225deg, black 27%, transparent 27%), linear-gradient(-45deg, black 27%, transparent 27%), url('${card.imageSrc()}') 207% 4.5% / 800%`,
      mixBlendMode: 'lighten',
      height: '2em',
      width: '2em',
    }}></Icon> </ToggleButton>
  );
}

interface FractionFilterProps {
  filterFractions: Fraction[],
  setFilterFractions: (value: (((prevState: Fraction[]) => Fraction[]) | Fraction[])) => void
}

function FractionFilter({filterFractions, setFilterFractions}: Readonly<FractionFilterProps>) {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: Fraction[],
  ) => {
    setFilterFractions(newFormats);
  };
  return (
    <Box p={2}> <ToggleButtonGroup value={filterFractions} onChange={handleChange}>
      {Fractions.map((value) =>
          <FractionFilterItem key={'asdasd' + value} fraction={value} />,
        )}
    </ToggleButtonGroup> </Box>
  );
}

export default FractionFilter;

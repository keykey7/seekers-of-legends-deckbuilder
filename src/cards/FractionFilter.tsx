import {Box, Icon, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses} from '@mui/material';
import React from 'react';
import {cardById, Fraction, Fractions} from '../Card.tsx';

function FractionFilterItem({fraction}: Readonly<{ fraction: Fraction }>) {
  const card = cardById(Fractions.indexOf(fraction) * 20 + 1);
  return (
    <ToggleButton value={`${fraction}`} aria-label={fraction} sx={{
      p: 0,
      [`&.${toggleButtonGroupClasses.selected}`]: {
        boxShadow: '0 0 10px grey',
      },
    }}>
      <Icon sx={(theme) => ({
        // original image list, then a black diamon around it, then lighten with the background
        background: `linear-gradient(45deg, black 27%, transparent 27%), ` +
          `linear-gradient(135deg, black 27%, transparent 27%), ` +
          `linear-gradient(225deg, black 27%, transparent 27%), ` +
          `linear-gradient(-45deg, black 27%, transparent 27%), ` +
          `url('${card.imageSrc()}') 207% 4.5% / 800%`,
        mixBlendMode: 'lighten',
        height: '2em',
        width: '2em',
        [theme.breakpoints.down('sm')]: {
          height: '1.5em',
          width: '1.5em',
        },
      })} />
    </ToggleButton>
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
    <Box sx={(theme) => ({
      p: 2,
      [theme.breakpoints.down('md')]: {
        p: 1,
      },
    })}>
      <ToggleButtonGroup exclusive value={filterFractions} onChange={handleChange}>
        {Fractions.map((value) =>
            <FractionFilterItem key={'filter' + value} fraction={value} />,
          )}
      </ToggleButtonGroup>
    </Box>
  );
}

export default FractionFilter;

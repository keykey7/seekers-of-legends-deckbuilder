import {Box, Icon, ToggleButton, ToggleButtonGroup} from '@mui/material';
import React from 'react';
import {cardById, Fraction} from '../Card.tsx';

function FractionFilterItem( {cardId, fraction}: Readonly<{cardId: number, fraction: Fraction}>) {
  const card = cardById(cardId);
  return (
    <ToggleButton value={`${fraction}`} aria-label={Fraction[fraction]} sx={{
      p: 0,
    }}>
      <Icon sx={{
        // original image list, then a black diamon around it, then lighten with the background
        background: `linear-gradient(45deg, black 27%, transparent 27%), linear-gradient(135deg, black 27%, transparent 27%), linear-gradient(225deg, black 27%, transparent 27%), linear-gradient(-45deg, black 27%, transparent 27%), url('${card.imageSrc()}') 207% 4.5% / 800%`,
        mixBlendMode: 'lighten',
        height: '2em',
        width: '2em',
      }}></Icon>
    </ToggleButton>
  );
}

function CardFilter() {
  const allFractions = Object.keys(Fraction)
    .filter(v => isNaN(Number(v)));
  const [fraction, setFraction] = React.useState((): string[] => []);
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
        {allFractions.map((k, i) =>
          <FractionFilterItem key={k} cardId={i * 20 + 1} fraction={k as unknown as Fraction} />
        )}
      </ToggleButtonGroup>
    </Box>
  );
}

export default CardFilter;

import {Box, Icon, IconButton, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses} from '@mui/material';
import {cardById, Fraction, Fractions} from '../Card.tsx';
import {MouseEvent} from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import {mobileBreakpoint, useIsMobile} from '../MobileUtil.ts';

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
        [theme.breakpoints.down('lg')]: {
          height: '1.5em',
          width: '1.5em',
        },
      })} />
    </ToggleButton>
  );
}

interface Filter {
  filter: CardFilterProps,
}

export interface CardFilterProps {
  filterFractions: Fraction[],
  setFilterFractions: (value: (((prevState: Fraction[]) => Fraction[]) | Fraction[])) => void,
  filterText: string,
  setFilterText: (text: string) => void,
}

export function SearchFilter({filter}: Readonly<Filter>) {
  const isSmallScreen = useIsMobile();
  return (
    <TextField fullWidth label="Suche" type="search" value={filter.filterText}
      size={isSmallScreen ? 'small' : 'medium'}
      onChange={e => filter.setFilterText(e.target.value)}
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <IconButton disabled={filter.filterText===''} aria-label="clear search" onClick={() => filter.setFilterText('')}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      }}
    />
  );
}

function FractionFilter({filter}: Readonly<Filter>) {
  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newFormats: Fraction[],
  ) => {
    filter.setFilterFractions(newFormats);
  };
  return (
    <ToggleButtonGroup exclusive value={filter.filterFractions} onChange={handleChange}>
      {Fractions.map((value) =>
        <FractionFilterItem key={'filter' + value} fraction={value} />,
      )}
    </ToggleButtonGroup>
  );
}

function CardFilter({filter}: Readonly<Filter>) {
  return (
    <Box sx={(theme) => ({
      p: 2,
      display: 'flex',
      gap: 2,
      [theme.breakpoints.down(mobileBreakpoint)]: {
        p: 1,
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column', // vertically stacked on small screens to leave space for the input field
        gap: 1,
      },
    })}>
      <SearchFilter filter={filter} />
      <FractionFilter filter={filter} />
    </Box>
  )
}

export default CardFilter;

import {Box, Icon, IconButton, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses} from '@mui/material';
import {Fraction, Fractions} from '../core/Card.ts';
import ClearIcon from '@mui/icons-material/Clear';
import {mobileBreakpoint, useIsSmallScreen} from '../Util.ts';
import {cardById} from '../core/CardData.ts';
import {Signal, useComputed} from '@preact/signals';
import {CardFilterType} from './CardFilter.ts';

function FractionFilterItem({fraction}: Readonly<{fraction: Fraction}>) {
  const card = cardById(Fractions.indexOf(fraction) * 20 + 1);
  const blackToTrans = 'rgba(0,0,0,0.6) 27%, transparent 27%';
  return (<ToggleButton value={`${fraction}`}
      aria-label={`filter for `}
      sx={{
        height: '3em',
        width: '3em',
        [`&.${toggleButtonGroupClasses.selected}`]: {
          boxShadow: 'inset #d5d5d5 0 0 6px',
          borderRadius: 2,
        },
      }}>
      <Icon sx={(theme) => ({
        // original image list, then a black diamond around it, then lighten with the background
        background: `linear-gradient(45deg, ${blackToTrans}), ` +
          `linear-gradient(135deg, ${blackToTrans}), ` +
          `linear-gradient(225deg, ${blackToTrans}), ` +
          `linear-gradient(-45deg, ${blackToTrans}), ` +
          `url('${card.imageSrc()}') 207% 4.5% / 800%`,
        mixBlendMode: 'lighten',
        borderRadius: 2,
        height: '2em',
        width: '2em',
        [theme.breakpoints.down('lg')]: {
          height: '1.5em',
          width: '1.5em',
          m: 0.5,
          border: 1,
          borderColor: theme.palette.divider,
        },
      })} />
    </ToggleButton>);
}

interface Filter {
  filterSignal: Signal<CardFilterType>,
}

function SearchFilterInputClearIcon({filterSignal}: Readonly<Filter>) {
  const isEmpty = useComputed(() => filterSignal.value.filterText === '');
  const onClear = () => {
    filterSignal.value = {
      ...filterSignal.value,
      filterText: '',
    };
  };
  return <InputAdornment position="end">
    <IconButton disabled={isEmpty.value}
      aria-label="clear search"
      onClick={onClear}>
      <ClearIcon />
    </IconButton>
  </InputAdornment>;
}

function SearchFilter({filterSignal}: Readonly<Filter>) {
  const isSmallScreen = useIsSmallScreen();
  const setFilterText = (txt: string) => {
    filterSignal.value = {...filterSignal.value, filterText: txt};
  };
  return (<TextField fullWidth
      label="Suche"
      type="search"
      value={filterSignal.value.filterText}
      size={isSmallScreen ? 'small' : 'medium'}
      onChange={e => setFilterText((e.target as HTMLInputElement).value)}
      InputProps={{
        endAdornment: <SearchFilterInputClearIcon filterSignal={filterSignal} />,
      }} />);
}

function FractionFilter({filterSignal}: Readonly<Filter>) {
  const filterFractionsSignal = useComputed(() => filterSignal.value.filterFractions);
  const handleChange = (_event: MouseEvent, newFormats: Fraction[]) => {
    filterSignal.value = {
      ...filterSignal.value,
      filterFractions: newFormats ?? [], // avoid null on deselect
    };
  };
  return (<ToggleButtonGroup exclusive
      value={filterFractionsSignal.value}
      onChange={handleChange}>
      {Fractions.map((value) => <FractionFilterItem key={`filter${value}`}
        fraction={value} />)}
    </ToggleButtonGroup>);
}

function CardFilter({filterSignal}: Readonly<Filter>) {
  return (<Box sx={(theme) => ({
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
      <SearchFilter filterSignal={filterSignal} />
      <FractionFilter filterSignal={filterSignal} />
    </Box>);
}

export default CardFilter;

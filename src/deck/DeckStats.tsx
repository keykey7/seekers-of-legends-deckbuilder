import {BarChart, Gauge, gaugeClasses} from '@mui/x-charts';
import {drawerWidth} from './DeckDrawer.tsx';
import {Box, Tooltip} from '@mui/material';
import {useDeck} from './context/DeckContext.ts';
import {CardAndCount} from '../core/Deck.ts';

function DeckStats() {
  const deck = useDeck();
  const colorCost = [0, 0, 0, 0, 0, 0, 0];
  const avatarFraction = deck.avatar?.fraction;

  function addCard(cardAndCount: CardAndCount): void {
    let costCategory = cardAndCount.card.cost;
    if (costCategory === 'X') {
      costCategory = 1;
    } else if (costCategory > 7) {
      costCategory = 7;
    }
    costCategory += cardAndCount.card.costModifier(avatarFraction);
    colorCost[costCategory - 1] += cardAndCount.count;
  }

  deck.allCards()
    .forEach((cardAndCount) => {
      addCard(cardAndCount);
    });
  const count = colorCost.reduce((a, b) => a + b, 0);
  const isValid = count >= 40 && deck.avatar !== undefined;
  const max = colorCost.reduce((a, b) => Math.max(a, b), 0);
  let gauge = <Box sx={{
    right: '10px',
    position: 'absolute',
    zIndex: 10,
  }}>
    <Gauge width={70}
      height={70}
      value={count}
      valueMax={40}
      sx={{
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#d5d5d5',
        },
        [`& .${gaugeClasses.valueText} text`]: {
          fill: isValid ? '#d5d5d5' : '#b71d25',
          fontWeight: 'bold',
        },
      }} />
  </Box>;

  if (count < 40) {
    gauge = <Tooltip title={<p>
      Es fehlen noch mindestens<br />
      {40 - count} Karten für ein gültiges Deck. </p>}
      placement="left">
      {gauge}
    </Tooltip>;
  }
  return (<>
    {gauge}
    <BarChart tooltip={{trigger: 'none'}}
      width={drawerWidth}
      height={200}
      series={[
        {
          data: colorCost,
          color: '#d5d5d5',
        },
      ]}
      xAxis={[
        {
          data: [1, 2, 3, 4, 5, 6, '7+'],
          scaleType: 'band',
        },
      ]}
      yAxis={[
        {
          max: Math.max(10, max),
          tickMinStep: 1,
        },
      ]} />
  </>);
}

export default DeckStats;

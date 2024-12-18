import { BarChart, Gauge, gaugeClasses } from '@mui/x-charts';
import { drawerWidth } from './DeckDrawer.tsx';
import { Box, Tooltip } from '@mui/material';
import { getDeck } from '../core/DeckSignals.ts';
import { CardAndCount } from '../core/Deck.ts';
import { useComputed } from '@preact/signals';

function DeckCounter() {
  const count = useComputed(() => getDeck().value.count()).value;
  const hasAvatar = useComputed(() => getDeck().value.avatar !== undefined).value;
  const isValid = count >= 40 && hasAvatar;
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
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: '#652121', // an error-color to indicate missing cards
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#d5d5d5',
        },
        [`& .${gaugeClasses.valueText} text`]: {
          fill: isValid ? '#d5d5d5' : '#ff5555',
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
  } else if (!hasAvatar) {
    gauge = <Tooltip title={<p>
      Es fehlt noch der Avatar<br />
      für ein gültiges Deck. </p>}
      placement="left">
      {gauge}
    </Tooltip>;
  }
  return gauge;
}

function DeckStats() {
  const colorCost = useComputed(() => {
    const deck = getDeck().value;
    const costs = [0, 0, 0, 0, 0, 0, 0];
    const avatarFraction = deck.avatar?.fraction;

    function addCard(cardAndCount: CardAndCount): void {
      let costCategory = cardAndCount.card.cost;
      if (costCategory === 'X') {
        costCategory = 1;
      }
      costCategory += cardAndCount.card.costModifier(avatarFraction);
      if (costCategory > 7) {
        costCategory = 7;
      }
      costs[costCategory - 1] += cardAndCount.count;
    }

    deck.allCards()
      .forEach((cardAndCount) => {
        addCard(cardAndCount);
      });
    return costs;
  });
  const max = colorCost.value.reduce((a, b) => Math.max(a, b), 0);
  return (<>
    <DeckCounter />
    <BarChart tooltip={{trigger: 'none'}}
      width={drawerWidth}
      height={200}
      disableAxisListener={true}
      margin={{
        top: 32,
        right: 16,
        bottom: 32,
        left: 42,
      }}
      series={[
        {
          data: colorCost.value,
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

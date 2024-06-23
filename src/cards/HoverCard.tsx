import {Box, Paper} from '@mui/material';
import React from 'react';
import styles from './HoverCard.module.css'
import {Card} from '../Card.tsx';
import {useDeckDispatch} from '../deck/context/DeckProvider.tsx';

function HoverCard({card}: Readonly<{ card: Card }>) {
  const cardDispatch = useDeckDispatch();
  const moveCard = (event: React.MouseEvent<HTMLDivElement>) => {
    const dMax = 15;
    const img = event.currentTarget
    const x = event.pageX - img.offsetLeft;
    const y = event.pageY - img.offsetTop;
    const dx = dMax - (x/img.clientWidth)*2*dMax;
    const dy = -dMax + (y/img.clientHeight)*2*dMax;
    img.style.transform = `perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg) scale3d(1.1,1.1,1.1)`;
  };
  const resetCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = "";
  }
  return (
    <Paper elevation={3}
      onMouseMove={moveCard}
      onMouseLeave={resetCard}
      onClick={e => cardDispatch({
        type: 'add',
        card: card,
        eventOrigin: e.currentTarget.getBoundingClientRect(),
      })}
      className={styles.cardstyle}
      sx={{
        backgroundImage: `url(${card.imageSrc()})`,
        borderRadius: 2.5,
        transition: '1000ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
        // backfaceVisibility: 'none',
        // transform: 'translateZ(0)',
    }}>
      <Box aria-label={card.name} sx={{
        width: '10em', // spacing
      }}/>
    </Paper>
  );
}

export default HoverCard;

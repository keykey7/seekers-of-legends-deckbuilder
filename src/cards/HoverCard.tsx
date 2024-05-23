import {Paper} from '@mui/material';
import React from 'react';
import styles from './HoverCard.module.css'
import {cardById} from '../Card.tsx';

function HoverCard({cardId}: Readonly<{ cardId: number }>) {
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

  const card = cardById(cardId);

  return (
    <Paper elevation={3} onMouseMove={moveCard} onMouseLeave={resetCard} className={styles.cardstyle}>
      <img src={card.imageSrc()} alt="" style={{width: '100%', height: '100%'}} />
    </Paper>
  );
}

export default HoverCard;

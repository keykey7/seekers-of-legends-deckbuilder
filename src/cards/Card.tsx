import {Paper} from '@mui/material';
import React from 'react';
import styles from './Card.module.css'

function Card() {
  const moveCard = (event: React.MouseEvent<HTMLDivElement>) => {
    const dMax = 15;
    const img = event.currentTarget
    const x = event.pageX - img.offsetLeft;
    const y = event.pageY - img.offsetTop;
    const dx = dMax - (x/img.clientWidth)*2*dMax;
    const dy = -dMax + (y/img.clientHeight)*2*dMax;
    img.style.transform = `perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg) scale3d(1.1,1.1,1.1)`;
  };

  const activateCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transition = "1000ms cubic-bezier(0.03, 0.98, 0.52, 0.99)";
  }

  const resetCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = "";
  }

  return (
    <Paper elevation={3} onMouseMove={moveCard} onMouseLeave={resetCard} onMouseEnter={activateCard} className={styles.cardstyle}>
      <img src="cards/card-021.jpg" alt="" style={{width: '100%', height: '100%'}} />
    </Paper>
  );
}

export default Card;

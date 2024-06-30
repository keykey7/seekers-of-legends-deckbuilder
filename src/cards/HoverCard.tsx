import {Box} from '@mui/material';
import React from 'react';
import styles from './HoverCard.module.css'
import {Card} from '../Card.tsx';
import {useDeckDispatch} from '../deck/context/DeckProvider.tsx';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

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
  const addCard = (event: React.MouseEvent<HTMLDivElement>) => {
    cardDispatch({
      type: 'add',
      card: card,
      eventOrigin: event.currentTarget.getBoundingClientRect(),
    })
  }
  return (
    <Box
      sx={{
        p: 2,
        minWidth: '12em',
        aspectRatio: '2429 / 3308', // same as actual image
      }}
      >
      <Box aria-label={card.name}
        onMouseMove={moveCard}
        onMouseLeave={resetCard}
        onMouseDown={addCard}
        className={styles.cardstyle}
        sx={{
          backgroundImage: `url(${card.imageSrc()})`,
          borderRadius: 2.5,
          transition: '1000ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
          cursor: 'pointer',
          // backfaceVisibility: 'none',
          transform: 'translateZ(0)', // hack to avoid flickering between no-transition and transition on FF
        }}>
        <InfoTwoToneIcon
          fontSize="large"
          sx={{
            position: 'absolute',
            right: 0,
            transform: 'scale(1.8)',
          }} />
      </Box>
    </Box>
  );
}

export default HoverCard;

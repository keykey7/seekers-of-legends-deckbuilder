import {Card} from '../core/Card.ts';
import {Box} from '@mui/material';
import React from 'react';

interface CardInHandProps {
  card: Card;
}

function CardInHand({card}: Readonly<CardInHandProps>) {
  return (<Box sx={{
      height: '300px',
      aspectRatio: '2429 / 3308', // same as actual image
    }}>
      <Box aria-label={card.name}
        sx={{
          backgroundImage: `url(${card.imageSrc()})`,
          borderRadius: 2.5, //transition: '1000ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
          cursor: 'grab', // because it's clickable
          //transform: 'translateZ(0)', // hack to avoid flickering between no-transition and transition on FF
          transition: 'top 0.5s ease-in-out',
          backgroundSize: `105%`,  // since cards are cut
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.4))',
          position: 'relative',
          imageRendering: 'crisp-edges',
          ':hover': {
            top: '-100px',
          },
          top: '0px', // required for transition effect
        }}>
      </Box>
    </Box>);
}

interface HandProps {
  cards: Card[];
}

interface Point {
  top: number,
  left: number,
}

interface Rectangle {
  height: number,
  width: number,
}

function Hand({cards}: Readonly<HandProps>) {
  const bottomCenter: Point = {
    top: 810,
    left: 1080 / 2,
  };
  const cardDimension: Rectangle = {
    height: 300,
    width: 220,
  };
  const p0: Point = {
    top: bottomCenter.top - cardDimension.height / 2,
    left: bottomCenter.left - cardDimension.width / 2,
  };
  return (<>
    {cards.map((card, i) => {
      const p: Point = {
        top: p0.top,
        left: p0.left  + cardDimension.width / 2 * i,
      };
      return <Box key={`kk7-hand-${i}`}
        sx={{
          'position': 'absolute',
          'top': p.top,
          'left': p.left,
          'rotate': i * 5 + 'deg',
        }}>
        <CardInHand card={card} />
      </Box>;
    })}
  </>);
}

export default Hand;

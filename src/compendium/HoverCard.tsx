import {Box, useTheme} from '@mui/material';
import React from 'react';
import {Card} from '../Card.tsx';
import {useDeckDispatch} from '../deck/context/DeckProvider.tsx';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {useIsMobile} from '../MobileUtil.ts';

export interface HoverCardProps {
  card: Card,
  onDetailClick: () => void,
}

function HoverCard({card, onDetailClick}: Readonly<HoverCardProps>) {
  const theme = useTheme();
  const cardDispatch = useDeckDispatch();
  const isSmallScreen = useIsMobile();

  let moveCard = (event: React.MouseEvent<HTMLDivElement>) => {
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
  if (isSmallScreen) {
    moveCard = () => {}; // noop, because there is no hover on mobile
  }
  const addCard = (event: React.MouseEvent<HTMLDivElement>) => {
    cardDispatch({
      type: 'add',
      card,
      eventOrigin: event.currentTarget.getBoundingClientRect(),
    })
  };
  return (
    <Box
      sx={{
        p: 2,
        aspectRatio: '2429 / 3308', // same as actual image
        [theme.breakpoints.down('md')]: {
          p: 1,
        },
      }}
      >
      <Box aria-label={card.name}
        onMouseMove={moveCard}
        onMouseLeave={resetCard}
        onMouseDown={addCard}
        sx={{
          backgroundImage: `url(${card.imageSrc()})`,
          borderRadius: 2.5,
          transition: '1000ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
          cursor: 'pointer', // because it's clickable
          transform: 'translateZ(0)', // hack to avoid flickering between no-transition and transition on FF
          backgroundSize: `105%`,  // since cards are cut
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          ':hover': {
            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))',
          },
          '> svg': {
            filter: 'brightness(85%)',
          },
          '> svg:hover': { // to realize that this is something else when clicked
            filter: 'brightness(100%)',
          },
          [theme.breakpoints.up('md')]: { // hide the info icon until hover on non-touch devices
            '> svg': {
              opacity: 0,
              transition: 'opacity 0.2s linear', // fade the info button in on hover
            },
            ':hover > svg': {
              opacity: 1
            },
          }
        }}>
        <InfoTwoToneIcon
          fontSize="large"
          onMouseDown={e => {
            onDetailClick();
            e.stopPropagation();
          }}
          sx={{
            position: 'absolute',
            right: 0,
            transform: 'scale(1.8)',
            [theme.breakpoints.down('md')]: { // move slightly into the card on mobile due to tighter space
              right: 2,
              top: 1,
              transform: 'scale(1.6)',
            }
          }} />
      </Box>
    </Box>
  );
}

export default HoverCard;

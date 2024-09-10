import {Card} from '../core/Card.ts';
import {Box} from '@mui/material';
import {useDraggable} from '@dnd-kit/core';
import {ReactNode, useState} from 'react';

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
        backgroundSize: `105%`,  // since cards are cut
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.4))',
        position: 'relative',
        imageRendering: 'crisp-edges',

      }} />
  </Box>);
}

interface AnimatedCardInHandProps {
  card: Card;
  handIndex: number,
  handMax: number,
}

function AnimatedCardInHand({
  card,
  handIndex,
  handMax,
}: Readonly<AnimatedCardInHandProps>) {
  const maxFan = 35; // [deg]
  const offset = -handMax / 2 + handIndex + 0.5;
  const degBetweenCards = Math.min(maxFan / handMax, 10);
  const deg = offset * degBetweenCards + 0.1;
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  return <Box sx={{ // faning out of cards over the hand
    zIndex: handIndex,
    transform: `rotate(${deg}deg)`,
    transformOrigin: 'center 500%', // the further down, the flatter the cards arangement
  }}>
    <Box sx={{ // on hover, show the card better
      pointerEvents: 'initial',
      transition: 'transform 0.5s ease-in-out',
      transform: `translateY(0)`,
      ':hover': {
        transform: 'translateY(-150px)',
        ':active': {
          animationPlayState: 'paused', // doesn't seem to work
        },
      },
    }}>
      <Box onMouseDown={(mouseEvent: MouseEvent) => setMousePos([mouseEvent.layerX, mouseEvent.layerY])}
        sx={{ // when grabbing a card rotate it back to stand straight
          transition: 'transform 0.27s ease-in-out',
          ':hover:active': {
            transformOrigin: mousePos ? `${mousePos[0]}px ${mousePos[1]}px` : 'center center',
            transform: `rotate(${-deg}deg)`,
          },
        }}>
        <DraggableCard card={card}>
          <CardInHand card={card} />
        </DraggableCard>
      </Box>
    </Box>
  </Box>;
}

interface DraggableCardProps {
  card: Card;
  children: ReactNode,
}

function DraggableCard(props: Readonly<DraggableCardProps>) {
  // https://docs.dndkit.com/introduction/getting-started
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: 'draggable-' + props.card.id,
    data: {
      card: props.card,
    },
  });
  const dragTransform = transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'translateZ(0)';
  // @ts-expect-error idk
  return <Box ref={setNodeRef} {...listeners} {...attributes}
    sx={{
      transform: dragTransform,
      cursor: 'grab',
      ':active': {
        cursor: 'grabbing',
      },
    }}>
    {props.children}
  </Box>;
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
  return (<>
    {cards.map((card, i) => {
      return <Box key={`kk7-hand-${i}`}
        sx={{
          position: 'absolute',
          bottom: '-180px',
          left: '40%',
          pointerEvents: 'none',
        }}>
        <AnimatedCardInHand card={card}
          handIndex={i}
          handMax={cards.length} />
      </Box>;
    })}
  </>);
}

export default Hand;

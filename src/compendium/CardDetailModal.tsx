import {CardMedia, Modal, modalClasses, Box, useMediaQuery} from '@mui/material';
import {Card} from '../Card.tsx';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useSwipeable} from 'react-swipeable';
import {useIsMobile} from '../MobileUtil.ts';
import {useDeckDispatch} from '../deck/context/DeckProvider.tsx';

export interface CardDetailModalProps {
  card: Card,
  hasNext: boolean,
  hasPrevious: boolean,
  onNext: () => void,
  onPrevious: () => void,
  onClose: () => void,
}

function CardDetailModal(props: Readonly<CardDetailModalProps>) {
  const cardDispatch = useDeckDispatch();
  const card = props.card;
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isSmallScreen = useIsMobile();
  const showArrowsInline = isSmallScreen && !isLandscape;
  // https://www.npmjs.com/package/react-swipeable
  const swipeHandlers = useSwipeable({
    swipeDuration: 250, // [ms]
    onSwipedLeft: props.onNext,
    onSwipedRight: props.onPrevious,
    trackMouse: true, // we need the onTab to act like an onClick, because onClick and swipes don't like each other
    onTap: swipeEvent => {
      cardDispatch({
        type: 'add',
        card,
        eventOrigin: (swipeEvent.event.target as HTMLElement).getBoundingClientRect(),
      });
    }
  });
  // https://mui.com/material-ui/react-modal/
  const iconStyle = {
    transform: 'scale(4)',
    m: 3,
    cursor: 'pointer',
    pointerEvents: 'initial',
  };
  return (
    <Modal open={true}
      onClose={props.onClose}
      sx={{
        [`& .${modalClasses.backdrop}`]: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // slightly darker than the default
        },
      }}
    >
      <Box sx={{
        // center the modal horizontally and vertically on screen
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <KeyboardArrowLeftIcon sx={{
            ...iconStyle,
            visibility: props.hasPrevious ? 'visible' : 'hidden',
            // move inside the picture to allow max width for card on small screens
            // there is anyway the option to swipe on mobile...
            mr: showArrowsInline ? -6 : 1,
          }} onClick={props.onPrevious} />
          <CardMedia {...swipeHandlers} draggable={false} component="img" image={card.imageSrc()} alt={card.name} sx={{
            maxHeight: '100vh',
            minWidth: 0, // prevent overflow of flex-items on chrome: https://stackoverflow.com/a/66689926
            p: 2,
            borderRadius: 7,
            pointerEvents: 'initial',
          }} />
          <KeyboardArrowRightIcon sx={{
            ...iconStyle,
            visibility: props.hasNext ? 'visible' : 'hidden',
            ml: showArrowsInline ? -6 : 1,
          }} onClick={props.onNext} />
        </Box>
      </Box>
    </Modal>
  );
}

export default CardDetailModal;

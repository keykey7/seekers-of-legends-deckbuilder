import {CardMedia, Modal, modalClasses, Box, useMediaQuery} from '@mui/material';
import {Card} from '../Card.tsx';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useSwipeable} from 'react-swipeable';
import {useIsMobile} from '../MobileUtil.ts';
import {useDeckDispatch} from '../deck/context/DeckProvider.tsx';

interface NextPrevIconProps {
  direction: 'left' | 'right';
  isVisible: boolean;
  onClick?: () => void;
}

/**
 * Icon left/right indicating more cards,
 * moved inside image to save space on mobile.
 */
function NextPrevIcon({direction, isVisible, onClick}: Readonly<NextPrevIconProps>) {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isSmallScreen = useIsMobile();
  const showArrowsInline = isSmallScreen && !isLandscape;
  // https://mui.com/material-ui/react-modal/
  const iconStyle = {
    transform: 'scale(4)',
    m: 3,
    cursor: 'pointer',
    pointerEvents: 'initial',
  };
  const Icon = direction==='left' ? KeyboardArrowLeftIcon : KeyboardArrowRightIcon;
  const thisMargin = direction==='left' ? 'mr' : 'ml';
  return <Icon sx={{
    ...iconStyle,
    visibility: isVisible ? 'visible' : 'hidden',
    // move inside the picture to allow max width for card on small screens
    // there is anyway the option to swipe on mobile...
    [thisMargin]: showArrowsInline ? -6 : 1,
  }} onClick={onClick} />
}

export interface CardDetailModalProps {
  card: Card,
  hasNext: boolean,
  hasPrevious: boolean,
  onNext: () => void,
  onPrevious: () => void,
  onClose: () => void,
}

/**
 * Fullscreen popup of a single card to view its details.
 */
function CardDetailModal(props: Readonly<CardDetailModalProps>) {
  const cardDispatch = useDeckDispatch();
  const card = props.card;

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
          <NextPrevIcon direction='left' isVisible={props.hasPrevious} onClick={props.onPrevious} />
          <CardMedia {...swipeHandlers} draggable={false} component="img" image={card.imageSrc()} alt={card.name} sx={{
            maxHeight: '100vh',
            minWidth: 0, // prevent overflow of flex-items on chrome: https://stackoverflow.com/a/66689926
            p: 2,
            borderRadius: 7,
            pointerEvents: 'initial',
          }} />
          <NextPrevIcon direction='right' isVisible={props.hasNext} onClick={props.onNext} />
        </Box>
      </Box>
    </Modal>
  );
}

export default CardDetailModal;

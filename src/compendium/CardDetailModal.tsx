import {Box, Modal, modalClasses, useMediaQuery} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useSwipeable} from 'react-swipeable';
import {useIsMobile} from '../MobileUtil.ts';
import {MaxCardAmountReachedIcon} from './HoverCard.tsx';
import {Card} from '../core/Card.ts';
import {addCardToDeck} from '../core/DeckSignals.ts';
import {Signal} from '@preact/signals-react';
import {CardProvider} from '../core/CardContext.tsx';

interface NextPrevIconProps {
  direction: 'left' | 'right';
  isVisible: boolean;
  onClick?: () => void;
}

/**
 * Icon left/right indicating more cards,
 * moved inside image to save space on mobile.
 */
function NextPrevIcon({
  direction,
  isVisible,
  onClick,
}: Readonly<NextPrevIconProps>) {
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
  const Icon = direction === 'left' ? KeyboardArrowLeftIcon : KeyboardArrowRightIcon;
  const thisMargin = direction === 'left' ? 'mr' : 'ml';
  return <Icon sx={{
    ...iconStyle,
    visibility: isVisible ? 'visible' : 'hidden', // move inside the picture to allow max width for card on small screens
    // there is anyway the option to swipe on mobile...
    [thisMargin]: showArrowsInline ? -6 : 3,
  }}
    onClick={onClick} />;
}

export interface CardDetailModalProps {
  activeSignal: Signal<Card | undefined>,
  readonly cards: Card[];
}

/**
 * Fullscreen popup of a single card to view its details.
 */
function CardDetailModal({
  activeSignal,
  cards,
}: Readonly<CardDetailModalProps>) {
  const active = activeSignal.value;
  const setActive = (card: Card | undefined) => {
    activeSignal.value = card;
  };
  const currentIndex = active ? cards.indexOf(active) : -1;
  const onClose = () => setActive(undefined);
  const hasPrevious = currentIndex !== 0;
  const onPrevious = () => setActive(cards[currentIndex - 1]);
  const hasNext = currentIndex !== cards.length - 1;
  const onNext = () => setActive(cards[currentIndex + 1]);
  // https://www.npmjs.com/package/react-swipeable
  const swipeHandlers = useSwipeable({
    swipeDuration: 250, // [ms]
    onSwipedLeft: onNext,
    onSwipedRight: onPrevious,
    trackMouse: true, // we need the onTab to act like an onClick, because onClick and swipes don't like each other
    onTap: swipeEvent => active && addCardToDeck(active, (swipeEvent.event.target as HTMLElement).getBoundingClientRect()),
  });
  return (<Modal open={active !== undefined}
    onClose={onClose}
    sx={{
      [`& .${modalClasses.backdrop}`]: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // slightly darker than the default
      },
    }}>
    <Box sx={{
      // center the modal horizontally and vertically on screen
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
    }}>
      <NextPrevIcon direction="left"
        isVisible={hasPrevious}
        onClick={onPrevious} />
      <Box {...swipeHandlers} sx={{
        borderRadius: '4%',
        backgroundImage: `url(${active?.imageSrc()})`,
        backgroundSize: `100%`, // 105% would look more real, but becomes blurry
        backgroundPosition: 'center',

        // maximum display size while keeping aspect ratio
        aspectRatio: '2429 / 3308', // same as actual image
        width: 'calc(min(100vw, 2429 / 3308 * 100vh) - 8px)',
        maxHeight: 'calc(100vh - 8px)',
        maxWidth: '648px', // actual image width
        pointerEvents: 'initial', // allow clicking it
      }}>
        {active && <CardProvider card={active}>
          <MaxCardAmountReachedIcon />
        </CardProvider> }
      </Box>
      <NextPrevIcon direction="right"
        isVisible={hasNext}
        onClick={onNext} />
    </Box>
  </Modal>);
}

export default CardDetailModal;

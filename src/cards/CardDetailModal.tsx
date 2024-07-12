import {CardMedia, Modal, modalClasses, Box} from '@mui/material';
import {Card} from '../Card.tsx';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export interface CardDetailModalProps {
  card: Card,
  hasNext: boolean,
  hasPrevious: boolean,
  onNext: () => void,
  onPrevious: () => void,
  onClose: () => void,
}

function CardDetailModal(props: Readonly<CardDetailModalProps>) {
  const card = props.card;
  // https://mui.com/material-ui/react-modal/
  const iconStyle = {
    transform: 'scale(4)',
    m: 2,
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
          <KeyboardArrowLeftIcon sx={{...iconStyle, visibility: props.hasPrevious ? 'visible' : 'hidden'}} onClick={props.onPrevious} />
          <CardMedia component="img" image={card.imageSrc()} alt={card.name} sx={{
            maxHeight: '100vh',
            minWidth: 0, // prevent overflow of flex-items on chrome: https://stackoverflow.com/a/66689926
            p: 2,
            borderRadius: 7,
            pointerEvents: 'initial',
          }} />
          <KeyboardArrowRightIcon sx={{...iconStyle, visibility: props.hasNext ? 'visible' : 'hidden'}} onClick={props.onNext} />
        </Box>
      </Box>
    </Modal>
  );
}

export default CardDetailModal;

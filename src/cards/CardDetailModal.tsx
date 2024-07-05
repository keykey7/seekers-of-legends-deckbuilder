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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <Box sx={{
        // center the modal horizontally and vertically on screen
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <KeyboardArrowLeftIcon sx={{...iconStyle, visibility: props.hasPrevious ? 'visible' : 'hidden'}} onClick={props.onPrevious} />
          <CardMedia component="img" image={card.imageSrc()} alt={card.name} sx={{
            width: 'auto',
            maxHeight: '100vh',
            p: 2,
            borderRadius: 7,
            pointerEvents: 'initial',
            // clipPath: 'inset(5px 5px 5px 5px)'
          }} />
          <KeyboardArrowRightIcon sx={{...iconStyle, visibility: props.hasNext ? 'visible' : 'hidden'}} onClick={props.onNext} />
        </Box>
      </Box>
    </Modal>
  );
}

export default CardDetailModal;

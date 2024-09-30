import {Card} from '../core/Card.ts';
import {Box} from '@mui/material';
import {CardInPlay} from './GameCard.tsx';
import {useDroppable} from '@dnd-kit/core';

interface TableSelfProps {
  cards: Card[];
}

function TableSelf({cards}: Readonly<TableSelfProps>) {
  const {
    isOver,
    setNodeRef,
  } = useDroppable({
    id: 'table-drop-area',
  });
  return (<Box sx={{
    position: 'absolute',
    top: '100px',
    width: '100%',
    backgroundColor: isOver ? 'green' : 'red',
    borderRadius: 5,
    p: 2,
  }}>
    {cards.map(card => <div ref={setNodeRef}
      key={`table-self-${card.id}`}>
      <CardInPlay card={card} />
    </div>)}
  </Box>);
}

export default TableSelf;

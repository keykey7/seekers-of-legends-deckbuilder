import {Box} from '@mui/material';
import Hand from './Hand.tsx';
import {cardById} from '../core/CardData.ts';
import {Active, DndContext, DragEndEvent, DragOverlay} from '@dnd-kit/core';
import {signal} from '@preact/signals';
import type {DragStartEvent} from '@dnd-kit/core/dist/types';
import TableSelf from './TableSelf.tsx';
import {CardInPlay} from './GameCard.tsx';

export const dragOngoingSignal = signal<Active | null>();

function GameBoard() {
  const onDragStart = (event: DragStartEvent) => {
    console.log('drag start', event);
    dragOngoingSignal.value = event.active;
  }
  const onDragEnd = (event: DragEndEvent) => {
    console.log("drag end", event)
    dragOngoingSignal.value = null;
  }

  const cards = [2, 5, 66, 67, 7,1,11,12,14,34,100,101,102,103].map(x => cardById(x));
  const cards2 = [4,9].map(x => cardById(x));
  return (<Box sx={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Box sx={{
      width: '1080px',
      height: '810px',
      background: 'darkgrey',
      overflow: 'hidden',
      position: 'relative', // because we position children relative to it
    }}>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={onDragEnd}>
        <TableSelf cards={cards2} />
        <Hand cards={cards} />
        <DragOverlay>
          {dragOngoingSignal.value === null ? null : <CardInPlay card={dragOngoingSignal.value?.data.current?.card} />}
        </DragOverlay>
      </DndContext>
    </Box>
  </Box>);
}

export default GameBoard;

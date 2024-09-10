import {Box} from '@mui/material';
import Hand from './Hand.tsx';
import {cardById} from '../core/CardData.ts';
import {Active, DndContext, DragEndEvent} from '@dnd-kit/core';
import {signal} from '@preact/signals';
import type {DragStartEvent} from '@dnd-kit/core/dist/types';

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
        <Hand cards={cards} />
      </DndContext>
    </Box>
  </Box>);
}

export default GameBoard;

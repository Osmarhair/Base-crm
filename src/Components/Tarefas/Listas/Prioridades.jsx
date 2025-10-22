import React, { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core'; // DndContext é o core
import Column from './Column';

// Estado inicial com a estrutura de colunas e cards
const initialBoardData = [
  {
    id: 'coluna-fazer',
    title: 'A Fazer',
    cards: [
      { id: 'card-1', content: 'Design do novo recurso' },
      { id: 'card-2', content: 'Reunião de planejamento' },
    ],
  },
  {
    id: 'coluna-andamento',
    title: 'Em Andamento',
    cards: [
      { id: 'card-3', content: 'Implementar o Drag and Drop' },
    ],
  },
  {
    id: 'coluna-concluido',
    title: 'Concluído',
    cards: [],
  },
];

export default function Prioridades() {
  const [boardData, setBoardData] = useState(initialBoardData);

  // A função handleDragEnd (a lógica de movimento) 

  return (
    <DndContext
      // A função onDragEnd virá aqui no PASSO 2
      collisionDetection={closestCorners} 
    >
      <div 
        className="kanban-board" 
        style={{ display: 'flex', padding: '20px', overflowX: 'auto' }}
      >
        {boardData.map(coluna => (
          <Column 
            key={coluna.id}
            id={coluna.id} // ID da coluna é crucial para o D&D
            title={coluna.title}
            cards={coluna.cards}
          />
        ))}
      </div>
    </DndContext>
  );
}
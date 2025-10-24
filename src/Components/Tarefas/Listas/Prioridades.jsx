import React, { useState } from 'react'; 
import { DndContext, closestCorners } from '@dnd-kit/core'; 
import { arrayMove } from '@dnd-kit/sortable'; 
import Column from './Column';

// 1. DADOS INICIAIS
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

  const findCardColumn = (id) => {
    const colIndex = boardData.findIndex(col => 
        col.cards.some(card => card.id === id)
    );
    if (colIndex === -1) return null;

    const cardIndex = boardData[colIndex].cards.findIndex(card => card.id === id);
    return { colIndex, cardIndex };  
  };


  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;
    
    // Identifica o destino do drop: pode ser um CARD ou uma COLUNA
    const activeId = active.id;
    const overId = over.id;

    const activeInfo = findCardColumn(activeId);
    let overInfo = findCardColumn(overId); 

    // 2 Lógica para DROPPAR em uma COLUNA VAZIA (onde o destino é a própria coluna)
    if (activeInfo && !overInfo) {
        
        const targetColIndex = boardData.findIndex(col => col.id === overId);
        
        if (targetColIndex !== -1 && activeInfo.colIndex !== targetColIndex) {
            
            const activeCard = boardData[activeInfo.colIndex].cards[activeInfo.cardIndex];
            
            setBoardData((prevData) => {
                const newBoardData = [...prevData];
                
                // Remove da coluna de origem
                newBoardData[activeInfo.colIndex].cards = newBoardData[activeInfo.colIndex].cards.filter(card => card.id !== activeId);

                // Adiciona na coluna de destino (no topo, index 0)
                newBoardData[targetColIndex].cards = [activeCard, ...newBoardData[targetColIndex].cards];
                
                return newBoardData;
            });
            return;
        }
    }
    
    if (!activeInfo || !overInfo) return; 

    
    if (activeInfo.colIndex === overInfo.colIndex) {
        
        const sourceColIndex = activeInfo.colIndex;
        const activeCardIndex = activeInfo.cardIndex;
        const overCardIndex = overInfo.cardIndex;
        
        if (activeCardIndex === overCardIndex) return;
        
        setBoardData((prevData) => {
            const newBoardData = [...prevData];
            newBoardData[sourceColIndex] = {
                ...newBoardData[sourceColIndex],
                cards: arrayMove(
                    prevData[sourceColIndex].cards, 
                    activeCardIndex, 
                    overCardIndex
                ),
            };
            return newBoardData;
        });
        return;
    } 
    
    // 3. Lógica de MOVIMENTAÇÃO ENTRE COLUNAS
    if (activeInfo.colIndex !== overInfo.colIndex) {
        
        const sourceColIndex = activeInfo.colIndex;
        const destinationColIndex = overInfo.colIndex;
        
        const activeCard = boardData[sourceColIndex].cards[activeInfo.cardIndex];
        
        setBoardData((prevData) => {
            const newBoardData = [...prevData];
            
            newBoardData[sourceColIndex].cards = newBoardData[sourceColIndex].cards.filter(card => card.id !== activeId);
            
            newBoardData[destinationColIndex].cards = [
                ...newBoardData[destinationColIndex].cards.slice(0, overInfo.cardIndex),
                activeCard,
                ...newBoardData[destinationColIndex].cards.slice(overInfo.cardIndex)
            ];
            
            return newBoardData;
        });
        
        console.log(`Card ${activeId} movido para a coluna ${boardData[destinationColIndex].title}`);
    }
}

  // RENDERIZAÇÃO DO QUADRO
  return (
    <DndContext
      collisionDetection={closestCorners} 
      onDragEnd={handleDragEnd} 
    >
      <div 
        className="kanban-board" 
        style={{ display: 'flex', padding: '20px', overflowX: 'auto' }}
      >
        {boardData.map(coluna => (
          <Column
            key={coluna.id}
            id={coluna.id} 
            title={coluna.title}
            cards={coluna.cards}
          />
        ))}
      </div>
    </DndContext>
  );
}
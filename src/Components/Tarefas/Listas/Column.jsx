import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Card from "./Card";

export default function Column({ id, title, cards}) {

    //define a coluna que o card vai ser solto.
    const { setNodeRef } = useDroppable({ id });
    
    // pega os cards pelo ID
    const cardIds = cards.map(card => card.id);
    
    return (
        <div 
            ref={setNodeRef}
            className="kanban-Column"
                style = {{
                    width: 300,
                    backgroundColor: '#f4f5f7',
                    padding: 10,
                    borderRadius: 6,
                    flexShrink: 0,
                    minHeigth: 300,
                }}
                >

            <h3>{title}</h3>

            {/* SortableContext - Habilita a reordenação vertical dos itens*/}
            <SortableContext 
        items={cardIds} 
        strategy={verticalListSortingStrategy}
      >
        {cards.map(card => (
          // O ID do card DEVE ser passado como a prop 'id'
          <Card key={card.id} id={card.id} card={card} />
        ))}
      </SortableContext>
    </div>
  );
}
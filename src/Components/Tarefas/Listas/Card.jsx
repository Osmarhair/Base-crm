import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Card({ card, id }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id }); // O ID é o identificador único do card

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Estilos básicos 
    padding: '15px',
    margin: '8px 0',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab', 
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} 
      {...listeners} 
    >
      {card.content}
    </div>
  );
}
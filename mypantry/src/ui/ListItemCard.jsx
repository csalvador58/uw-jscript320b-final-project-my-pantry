import React from 'react';
// import {useDraggable} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classes from '../css/ListItemCard.module.css'

function ListItemCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
  useSortable({ id: props.id, data: [{ type: "fruit"}, {addinfo: "hello"}] });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div className={classes['list-item-card']}>
            {props.id}
        </div>
    </div>
  );
}

export default ListItemCard;

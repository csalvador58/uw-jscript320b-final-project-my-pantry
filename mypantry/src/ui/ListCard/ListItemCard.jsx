import React, { useContext, useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material/';
import { foodTypes } from './FoodTypeIcons';
import UserContext from '../../store/UserContext';
import PropTypes from 'prop-types';

function ListItemCard({ id }) {
  const appUser = useContext(UserContext);
  const [itemData, setItemData] = useState({
    id: 'loading',
    name: 'loading',
    type: 'loading',
    qty: 'loading',
    unit: 'loading',
  });

  useEffect(() => {
    setTimeout(() => {
      const update = appUser.pantry.find((item) => item.id === id);
      setItemData(update);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const itemData = appUser.pantry.find((item) => item.id === props.id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: [
        {
          name: itemData.name,
          type: itemData.type,
          qty: itemData.qty,
          unit: itemData.unit,
          fav: itemData.favorite,
        },
      ],
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const icon = foodTypes[itemData.type];

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={itemData.name}
          secondary={`${itemData.qty} ${itemData.unit}(s)`}
        />
      </ListItem>
    </div>
  );
}

export default ListItemCard;

ListItemCard.propTypes = {
  id: PropTypes.string.isRequired,
};

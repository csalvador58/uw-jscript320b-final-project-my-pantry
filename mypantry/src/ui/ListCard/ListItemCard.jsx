import React, { useContext, useEffect, useState } from 'react';
// import {useDraggable} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { foodTypes } from './FoodTypeIcons';

// import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';

// import Grid from '@mui/material/Grid';
// import DeleteIcon from '@mui/icons-material/Delete';

import UserContext from '../../store/UserContext';
// import { fontSize } from '@mui/system';

function ListItemCard(props) {
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
      const update = appUser.pantry.find((item) => item.id === props.id);
      setItemData(update);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const itemData = appUser.pantry.find((item) => item.id === props.id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: [{ name: itemData.name, type: itemData.type }],
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const icon = foodTypes[itemData.type];

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* <div className={classes['list-item-card']}>{itemData.name}</div> */}
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

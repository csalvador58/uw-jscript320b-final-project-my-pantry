import React, {useContext} from 'react';
// import {useDraggable} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import LunchDiningIcon from '@mui/icons-material/LunchDining';
// import GrainIcon from '@mui/icons-material/Grain';
// import AppleIcon from '@mui/icons-material/Apple';
// import GrassIcon from '@mui/icons-material/Grass';

// import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
// import IcecreamIcon from '@mui/icons-material/Icecream';
// import LiquorIcon from '@mui/icons-material/Liquor';
// import CakeIcon from '@mui/icons-material/Cake';
// import KitchenIcon from '@mui/icons-material/Kitchen';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// import Grid from '@mui/material/Grid';
// import DeleteIcon from '@mui/icons-material/Delete';
import classes from '../css/ListItemCard.module.css';
import UserContext from '../store/UserContext';

// const foodTypes = {
//   protein: <LunchDiningIcon />,
//   grain: <GrainIcon />,
//   fruit: <AppleIcon />,
//   vegetable: <GrassIcon />,
//   dairy: <IcecreamIcon />,
//   beverage: <LiquorIcon />,
//   condiment: <AutoAwesomeMotionIcon />,
//   sugars: <CakeIcon />,
//   other: <KitchenIcon />,
// };

function ListItemCard(props) {
  const appUser = useContext(UserContext);
  const itemData = appUser.pantry.find(item => item.id === props.id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: [{ name: itemData.name , type: itemData.type}],
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className={classes['list-item-card']}>{itemData.name}</div>
    </div>
  );
}

export default ListItemCard;

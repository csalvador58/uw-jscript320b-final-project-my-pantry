import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import UserContext from '../store/UserContext';
import SearchBar from '../components/SearchBar';
import classes from '../css/PantryPage.module.css';
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  // rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@mui/material';
import ListItemCard from '../ui/ListItemCard';



function PantryPage() {
  const [userID, setUserID] = useState(null)
  const [activeId, setActiveId] = useState(null);
  const [draggedOverTrash, setDraggedOverTrash] = useState(false);
  const appUser = useContext(UserContext);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  
  

  
  console.log('appUser.pantry')
  console.log(appUser.pantry)


  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by x pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay in ms, with tolerance of pixels of movement
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  // const { setNodeRef } = useDroppable({
  //   id: 'A1',
  //   // data: { accepts: ['fruit'] },
  // });
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (over == null) {
      return;
    }

    console.log('Drag end 1 called');
    console.log('Active: ' + active.id);
    console.log('Over: ' + over.id);

    console.log({ active });
    console.log({ over });
    // if (over) {
    //   console.log('Item dropped in A1 drop area: ')
    //   console.log({active})
    //   console.log({over})
    // }

    if (over.id === 'A1') {
      // setItems((items) => items.filter((x) => active.id !== x));
      setDraggedOverTrash(true);
      console.log(active.id + ' was dropped in the drop area');
    }
    if (draggedOverTrash) setDraggedOverTrash(false);
    if (over && active.id !== over.id && active.id !== 'A1') {
      appUser.updatePantry((item) => {
        const activeIndex = item.indexOf(active.id);
        const overIndex = item.indexOf(over.id);
        // console.log(arrayMove(item, activeIndex, overIndex));
        return arrayMove(item, activeIndex, overIndex);
      });
    }
  };

  const updatePantryHandler = () => {
    console.log("i'm here")
    const userUID = JSON.parse(localStorage.getItem('myPantryUser'));
    if(userUID) setUserID(userUID);
    else return;

      const actionObject = {
        type: 'query',
        data: {
          uid: userID,
          collection: 'pantry',
          pantryObj: {},
        },
      };
      appUser.updatePantry(actionObject);
  }

  return (
    <>
      <div className={classes.center} data-testid='pantry-page'>
        <SearchBar search='Pantry' />
      </div>

      <div className={classes.outline}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={appUser.pantry}
            strategy={verticalListSortingStrategy}
          >
            {appUser.pantry.map((item, index) => (
              // <ListItemCard
              //   key={`index-${item.name}`}
              //   id={`index-${item.name}`}
              //   name={item.name}
              //   qty={item.qty}
              //   type={item.type}
              //   unit={item.unit}
              //   favorite={item.favorite}
              // />
              <ListItemCard key={item.name} id={item.name} />
            ))}
          </SortableContext>
          <DropArea items={appUser.pantry} />
        </DndContext>
      </div>
      <div className={classes.center}>
        <Button color='secondary' variant='contained' type='submit'>
          Add To Pantry
        </Button>
        <Button color='secondary' variant='contained' type='button' onClick={updatePantryHandler}>
          Update Pantry
        </Button>
      </div>
    </>
  );
}

const DropArea = (props) => {
  const { setNodeRef } = useDroppable({ id: 'A1' });

  return (
    <SortableContext items={props.items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className={classes['drop-area']}>
        Drop Area
      </div>
    </SortableContext>
  );
};

export default PantryPage;

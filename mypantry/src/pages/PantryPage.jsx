import React, { useContext, useEffect, useState, forwardRef } from 'react';
import UserContext from '../store/UserContext';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import SearchBar from '../components/SearchBar';
import classes from '../css/PantryPage.module.css';
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  // rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@mui/material';
import ListItemCard from '../ui/ListCard/ListItemCard';
// import { loadDb } from '../script/loadDb';

function PantryPage() {
  const appUser = useContext(UserContext);
  const [displayIds, setDisplayIds] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draggedOverTrash, setDraggedOverTrash] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser.loginInfo) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUser.loginInfo]);

  useEffect(() => {
    // Run query at mount
    if (appUser.loginInfo) {
      const actionObject = {
        type: 'query',
        data: {
          uid: appUser.loginInfo,
          collection: 'pantry',
          pantryObj: {},
        },
      };
      appUser.updatePantry(actionObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setDisplayIds((item) => {
        const activeIndex = item.indexOf(active.id);
        const overIndex = item.indexOf(over.id);
        return arrayMove(item, activeIndex, overIndex);
      });
    }
  };

  // const updatePantryHandler = () => {
  //   if (appUser.pantry) {
  //     const update = appUser.pantry.map((item) => item.id);
  //     setDisplayIds(update);

  //     console.log('DisplayIds');
  //     console.log(displayIds);
  //   }
  // };

  const searchData = appUser.pantry.map((item) => {
    return { id: item.id, name: item.name };
  });

  const searchHandler = (filterData) => {
    if (filterData === 'reset' || filterData === null) {
      const update = appUser.pantry.map((item) => item.id);
      setDisplayIds(update);
    } else if (appUser.pantry.some((item) => item.id === filterData.id)) {
      setDisplayIds([filterData.id]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const setDisplay = appUser.pantry.map((item) => item.id);
      setDisplayIds(setDisplay);
    }, 0);
  }, [appUser.pantry]);

  return (
    <>
      <div className={classes.center} data-testid='pantry-page'>
        <SearchBar
          search='Pantry'
          data={searchData}
          setFilter={searchHandler}
        />
      </div>

      <div className={classes.outline}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={displayIds} strategy={rectSwappingStrategy}>
            <Grid container columns={12}>
              {displayIds.map((item) => (
                <Grid item key={item} xs={6}>
                  <ListItemCard id={item} />
                </Grid>
              ))}
            </Grid>
          </SortableContext>
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
          {/* <DropArea items={items} /> */}
        </DndContext>
      </div>
      <div className={classes.center}>
        <Button color='secondary' variant='contained' type='button'>
          Add To Pantry
        </Button>
        {/* <Button
          color='secondary'
          variant='contained'
          type='button'
          onClick={updatePantryHandler}
        >
          Update
        </Button> */}
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

const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div className={classes.activeDrag} {...props} ref={ref}>
      <ListItemCard id={id} />
    </div>
  );
});

export default PantryPage;

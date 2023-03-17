import React, { useContext, useEffect, useState } from 'react';
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
import ListItemCard from '../ui/ListCard/ListItemCard';
// import { loadDb } from '../script/loadDb';

function PantryPage() {
  const appUser = useContext(UserContext);
  const [pantryIds, setPantryIds] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
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
      setPantryIds((item) => {
        const activeIndex = item.indexOf(active.id);
        const overIndex = item.indexOf(over.id);
        // console.log(arrayMove(item, activeIndex, overIndex));
        return arrayMove(item, activeIndex, overIndex);
      });
    }
  };

  const updatePantryHandler = () => {
    const test = appUser.pantry;
    console.log('test update');
    console.log(test);

    if (appUser.pantry) {
      const update = appUser.pantry.map((item) => item.id);
      setPantryIds(update);

      console.log('pantryIds');
      console.log(pantryIds);
    }
  };

  const searchData = appUser.pantry.map((item) => {
    return { id: item.id, name: item.name };
  });
  console.log('searchData');
  console.log(searchData);

  const searchHandler = (filterData) => {
    setSearchFilter(filterData.id);
  };

  console.log('searchFilter')
  console.log(searchFilter)

  const displayIds = searchFilter ? searchFilter : pantryIds;
  console.log('displayIds')
  console.log(displayIds)

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
        <p>Pantry Items</p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pantryIds}
            strategy={verticalListSortingStrategy}
          >
            <Grid container columns={12}>
              {displayIds.map((item) => (
                <Grid item key={item} xs={6}>
                  <ListItemCard id={item} />
                </Grid>
              ))}
            </Grid>
          </SortableContext>
          {/* <DropArea items={items} /> */}
        </DndContext>
      </div>
      <div className={classes.center}>
        <Button color='secondary' variant='contained' type='button'>
          Add To Pantry
        </Button>
        <Button
          color='secondary'
          variant='contained'
          type='button'
          onClick={updatePantryHandler}
        >
          Update
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

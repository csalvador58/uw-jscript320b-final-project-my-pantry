import React, { useContext, useEffect, useState, forwardRef } from 'react';
import UserContext from '../store/UserContext';
import { Link, useNavigate } from 'react-router-dom';
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
  rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  // verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ListItemCard from '../ui/ListCard/ListItemCard';
// import { loadDb } from '../script/loadDb';

function PantryPage() {
  const appUser = useContext(UserContext);
  const [displayIds, setDisplayIds] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draggedOverEdit, setDraggedOverEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser.loginInfo) {
      navigate('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (over == null) {
      return;
    }

    // console.log('Active: ' + active.id)
    // console.log('Over: ' + over.id)
    if (over.id === 'delete') {
      // setItems((items) => items.filter((x) => active.id !== x));
      setDraggedOverEdit(true);
      // console.log('drag end - active');
      // console.log(active);

      appUser.updateEditData({
        id: active.id,
        name: active.data.current[0].name,
        qty: active.data.current[0].qty,
        unit: active.data.current[0].unit,
      });

      navigate('/edit');
    }
    if (draggedOverEdit) setDraggedOverEdit(false);
    // Update sort order
    if (over && active.id !== over.id && active.id !== 'delete') {
      setTimeout(() => {
        setDisplayIds((item) => {
          const activeIndex = item.indexOf(active.id);
          const overIndex = item.indexOf(over.id);
          return arrayMove(item, activeIndex, overIndex);
        });
      }, 0);
    }
  };

  const searchData = appUser.pantry.map((item) => {
    return { id: item.id, name: item.name };
  });

  const searchHandler = (filterData) => {
    if (filterData === 'reset' || filterData === null) {
      const update = appUser.pantry.map((item) => item.id);
      setDisplayIds([...update]);
    } else if (appUser.pantry.some((item) => item.id === filterData.id)) {
      setDisplayIds([filterData.id]);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    const setDisplay = appUser.pantry.map((item) => item.id);
    setDisplayIds(setDisplay);
    // }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHandler = () => {
    const setDisplay = appUser.pantry.map((item) => item.id);
    setDisplayIds(setDisplay);
  };

  const DropArea = (props) => {
    const { setNodeRef } = useDroppable({ id: 'delete' });

    return (
      <SortableContext items={props.items} strategy={rectSortingStrategy}>
        <div ref={setNodeRef} className={classes['drop-area']}>
          <EditIcon className={classes.delete} />
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

  return (
    <>
      <div className={classes.search} data-testid='pantry-page'>
        <SearchBar
          search='Pantry'
          data={searchData}
          setFilter={searchHandler}
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {' '}
        <div className={classes.outline}>
          <SortableContext items={displayIds} strategy={rectSwappingStrategy}>
            <Grid container columns={12}>
              {displayIds.map((item) => (
                <Grid item key={item} xs={6}>
                  <ListItemCard id={item} />
                </Grid>
              ))}
            </Grid>
          </SortableContext>
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        <div className={classes.center}>
          <Link to='/edit'>
            <Button color='secondary' variant='contained' type='button'>
              Add To Pantry
            </Button>
          </Link>

          <Button
            color='secondary'
            variant='contained'
            type='button'
            onClick={updateHandler}
          >
            Update List
          </Button>
        </div>
        <DropArea items={displayIds} />
      </DndContext>
    </>
  );
}

export default PantryPage;

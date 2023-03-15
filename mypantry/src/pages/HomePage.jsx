import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../store/UserContext';
import classes from '../css/HomePage.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

function HomePage() {
  const appUser = useContext(UserContext);

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };
  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate('/');
  //   fetchUserName();
  // }, [user, loading]);

  // Add a new doc
  const handleAddClick = (e) => {
    e.preventDefault();

    const actionObject = {
      type: 'add',
      data: {
        collection: 'pantry',
        pantryObj: {
          name: 'crackers',
          qty: 10,
          unit: 'case',
          favorite: true,
        },
        updatePantryObj: { qty: 10, unit: 'case' },
        recipeObj: {
          name: 'sushi',
          ingredients: [
            { name: 'rice', qty: 1, unit: 'cup' },
            { name: 'salmon', qty: 3, unit: 'pieces' },
          ],
          favorite: true,
        },
        updateRecipeObj: {
          ingredients: [{ name: 'rice', qty: 3, unit: 'cup' }],
        },
      },
      isIngredient: false,
    };

    appUser.updatePantry(actionObject);
  };

  const handleReadClick = async (e) => {
    e.preventDefault();
    console.log(appUser.pantry);
  };

  const handleReadAllClick = async (e) => {
    e.preventDefault();
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    const actionObject = {
      type: 'update',
      data: {
        collection: 'pantry',
        object: {
          name: 'pepsi',
          qty: 1,
          unit: 'gallon',
        },
        update: { qty: 10, unit: 'cans' },
      },
      isIngredient: false,
      ingredients: [],
      favorite: false,
    };

    appUser.updatePantry(actionObject);
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    const actionObject = {
      type: 'delete',
      data: {
        collection: 'pantry',
        object: {
          name: 'pepsi',
          qty: 1,
          unit: 'gallon',
        },
        update: {},
      },
      isIngredient: false,
      ingredients: [],
      favorite: false,
    };

    appUser.updatePantry(actionObject);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={classes['home-container']} data-testid='homepage'>
      <>
        <div data-testid='home-page'>Homepage</div>
      </>

      <div>
        <div>
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <button onClick={handleAddClick}>Add Doc</button>
      <button onClick={handleReadClick}>Read Doc</button>
      <button onClick={handleReadAllClick}>
        Read All Docs from a collection
      </button>
      <button onClick={handleUpdateClick}>Update Doc</button>
      <button onClick={handleDeleteClick}>Delete Doc</button>
    </div>
  );
}

export default HomePage;

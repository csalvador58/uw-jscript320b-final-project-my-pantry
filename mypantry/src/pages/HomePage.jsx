import React, { useContext } from 'react';
import UserContext from '../store/UserContext';

import classes from '../css/HomePage.module.css';

function HomePage() {
  const user = useContext(UserContext);
  // Add a new doc

  const handleAddClick = (e) => {
    e.preventDefault();

    const actionObject = {
      type: 'delete',
      data: {
        collection: 'recipe',
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
        updateRecipeObj: { ingredients: [{ name: 'rice', qty: 3, unit: 'cup' },] },
      },
      isIngredient: false,
    };

    user.updatePantry(actionObject);
    // const pantryCollection = collection(db, 'pantry');
    // const addPantryDoc = addDoc(pantryCollection, {
    //   name: 'Pasta',
    //   qty: 500,
    //   unit: 'g',
    // });

    // addPantryDoc
    //   .then((data) => {
    //     console.log('Added document with ID: ', data.id);
    //   })
    //   .catch((e) => {
    //     console.error('Error adding document: ' + e);
    //   });
  };

  const handleReadClick = async (e) => {
    e.preventDefault();
    console.log(user.pantry);

    // const pantryQueryCollection = query(
    //   collection(db, 'pantry'),
    //   where('name', '==', 'pasta')
    // );
    // const pantrySnapshot = getDocs(pantryQueryCollection);

    // pantrySnapshot
    //   .then((data) => {
    //     data.forEach((doc) => {
    //       console.log(doc.id, ' => ', doc.data());
    //     });
    //   })
    //   .catch((e) => {
    //     console.error('Error reading: ' + e);
    //   });
  };

  const handleReadAllClick = async (e) => {
    e.preventDefault();

    // const pantryQueryCollection = query(collection(db, 'pantry'));

    // const pantrySnapshot = getDocs(pantryQueryCollection);

    // pantrySnapshot
    //   .then((data) => {
    //     const namesArray = [];
    //     data.docs.forEach((doc) => {
    //       const item = doc.data();
    //       namesArray.push(item.name);
    //     });
    //     console.log(namesArray);
    //   })
    //   .catch((e) => {
    //     console.error('Error reading: ' + e);
    //   });
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

    user.updatePantry(actionObject);

    // const pantryCollection = collection(db, 'pantry');
    // const pantryQueryCollection = query(
    //   pantryCollection,
    //   where('name', '==', 'pasta')
    // );
    // const pantrySnapshot = getDocs(pantryQueryCollection);

    // pantrySnapshot
    //   .then((data) => {
    //     if (!data.empty) {
    //       const pantryDocRef = doc(db, 'pantry', data.docs[0].id);

    //       const updatePantry = updateDoc(pantryDocRef, { qty: 1, unit: 'piece' });
    //       updatePantry.then(console.log('Update successful')).catch((e) => {
    //         console.error('Error reading: ' + e);
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     console.error('Error reading: ' + e);
    //   });
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

    user.updatePantry(actionObject);

    // const pantryCollection = collection(db, 'pantry');
    // const pantryQueryCollection = query(
    //   pantryCollection,
    //   where('name', '==', 'pasta')
    // );
    // const pantrySnapshot = getDocs(pantryQueryCollection);

    // pantrySnapshot
    //   .then((data) => {
    //     if (!data.empty) {
    //       const pantryDocRef = doc(db, 'pantry', data.docs[0].id);

    //       const deletePantry = deleteDoc(pantryDocRef);
    //       deletePantry.then(console.log('Delete successful')).catch((e) => {
    //         console.error('Error deleting: ' + e);
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     console.error('Error reading: ' + e);
    //   });
  };

  const loginHandler = () => {
    user.updateLogin();
  };
  return (
    <div className={classes['home-container']} data-testid='homepage'>
      {!user.isLoggedIn && (
        <>
          <h1>My Pantry</h1>
          <h2 data-testid='login-form'>Login Screen</h2>
        </>
      )}
      {user.isLoggedIn && (
        <>
          <div data-testid='home-page'>Homepage</div>
        </>
      )}
      <button onClick={loginHandler}>Toggle Login</button>
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

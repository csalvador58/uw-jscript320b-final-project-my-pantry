import React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({
  isLoggedIn: false,
  updateLogin: () => {},
  pantry: [],
  updatePantry: () => {},
  recipes: [],
  updateRecipe: () => {},
});

export default UserContext;

UserContext.PropTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  updateLogin: PropTypes.func.isRequired,
  pantry: PropTypes.array.isRequired,
  updatePantry: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  updateRecipe: PropTypes.func.isRequired,
};

// Shape of actionObject
//  action: {
//   type: 'add' | 'update' | 'delete'
//   data: {
//     collection = 'pantry' | 'recipe',
//     object = {
//         If pantry, then:

//         name: ,
//         type: ,
//         qty: ,
//         unit: ,

//         if recipe, then:

//         name: ,
//         ingredients: {
//             name: ,
//             type: ,
//             qty: ,
//             unit: ,
//         }
//         favorite: ,
//     }
//     isIngredient: true or false
//     ingredients: {
//             name: ,
//             type: ,
//             qty: ,
//             unit: ,
//         }
//     update = {key: value}
//   }
// }


// const actionObject = {
//   type: 'add',
//   data: {
//     uid: userUID,
//     collection: 'pantry',
//     pantryObj: {
//       name: values.item,
//       type: values.type,
//       qty: values.quantity,
//       unit: values.units,
//       favorite: values.favorite,
//     },
//     updatePantryObj: {},
//     recipeObj: {
//       name: '',
//       ingredients: [],
//       favorite: false,
//     },
//     updateRecipeObj: {
//       ingredients: [],
//     },
//   },
//   isIngredient: false,
// };


// function addToCollection(data) {
//   // setup authorized-user collection

//   // set object reference
//   const objectRef =
//     data.collection === 'pantry' ? data.pantryObj : data.recipeObj;

//   // Check if already exists
//   const setCollection = collection(db, data.collection);
//   const queryCollection = query(
//     setCollection,
//     where('name', '==', objectRef.name)
//   );

//   const snapshot = getDocs(queryCollection);

//   snapshot
//     .then((response) => {
//       if (response.empty) {
//         const setCollection = collection(db, data.collection);
//         const addDocToCollection = addDoc(setCollection, objectRef);

//         addDocToCollection
//           .then((response) => {
//             console.log('Added document with ID: ', response.id);
//           })
//           .catch((e) => {
//             console.error('Error adding document: ' + e);
//           });
//       } else {
//         console.log('Item already exists');
//       }
//     })
//     .catch((e) => {
//       console.error('Error reading: ' + e);
//     });
// }
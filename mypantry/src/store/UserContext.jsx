import React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({
  loginInfo: '',
  updateLogin: () => {},
  pantry: [],
  updatePantry: () => {},
  recipes: [],
  updateRecipe: () => {},
});

export default UserContext;

UserContext.PropTypes = {
  loginInfo: PropTypes.string.isRequired,
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
//   },
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


// Newest
// function addToCollection(data) {
//   console.log(data.uid);
//   if (!data.uid) {
//     console.log('Error with uid');
//     return;
//   }

//   // setup authorized-user collection
//   const userCollection = collection(db, 'authorized-users');
//   const userDocRef = doc(userCollection, data.uid);

//   // setup sub-collection
//   const subCollection = 'pantry';

//   // Query all docs in sub-collection with pantry name
//   const subCollectionRef = collection(userDocRef, subCollection);
//   const queryCollection = query(
//     subCollectionRef,
//     where('name', '==', data.pantryObj.name)
//   );

//   const snapshot = getDocs(queryCollection);

//   snapshot
//     .then((response) => {
//       if (response.empty) {
//         const setCollection = collection(userDocRef, subCollection);
//         const addDocToCollection = addDoc(setCollection, data.pantryObj);

//         addDocToCollection
//           .then((response) => {
//             alert('Added document with ID: ', response.id);
//           })
//           .catch((e) => {
//             alert('Error adding document: ' + e);
//           });
//       } else {
//         alert('Item already exists');
//       }
//     })
//     .catch((e) => {
//       alert('Error reading: ' + e);
//     });
// }


// // set object reference
// const objectRef =
// data.collection === 'pantry' ? data.pantryObj : data.recipeObj;

// // update a single value of a field of a doc in a collection
// const setCollection = collection(db, data.collection);
// const queryCollection = query(
// setCollection,
// where('name', '==', objectRef.name)
// );

// const snapshot = getDocs(queryCollection);

// snapshot
// .then((response) => {
//   if (!response.empty) {
//     const docRef = doc(db, data.collection, response.docs[0].id);

//     // set object reference
//     const updateRef =
//       data.collection === 'pantry'
//         ? data.updatePantryObj
//         : data.updateRecipeObj;
//     const updateDocRef = updateDoc(docRef, updateRef);
//     updateDocRef.then(console.log('Update successful')).catch((e) => {
//       console.error('Error reading: ' + e);
//     });
//   }
// })
// .catch((e) => {
//   console.error('Error reading: ' + e);
// });
// }
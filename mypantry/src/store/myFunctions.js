import {
  doc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import db from '../db';

export function updatePantryHandler(action, setter) {
  async function execute() {
    if (action.type === 'add') {
      await addToCollection(action.data);
    }
    if (action.type === 'update') {
      await updateDocInCollection(action.data);
    }
    if (action.type === 'delete') {
      await deleteDocInCollection(action.data);
    }
    await queryAllCollection(action.data, setter);
  }
  execute();
}

export function updateRecipeHandler(action, state, setter) {
  if (action.type === 'add') {
    const response = addToCollection(action.data);
    setter(response);
  }
}

function addToCollection(data) {
  // Check if already exists
  const setCollection = collection(db, data.collection);
  const queryCollection = query(
    setCollection,
    where('name', '==', data.object.name)
  );

  const snapshot = getDocs(queryCollection);

  snapshot
    .then((response) => {
      if (response.empty) {
        const setCollection = collection(db, data.collection);
        const addDocToCollection = addDoc(setCollection, data.object);

        addDocToCollection
          .then((response) => {
            console.log('Added document with ID: ', response.id);
          })
          .catch((e) => {
            console.error('Error adding document: ' + e);
          });
      } else {
        console.log('Item already exists');
      }
    })
    .catch((e) => {
      console.error('Error reading: ' + e);
    });
}

// function queryCollection(data) {
//   // returns matching doc in collection
//   const setQueryCollection = query(
//     collection(db, data.collection),
//     where('name', '==', data.object.name)
//   );
//   const snapshot = getDocs(setQueryCollection);

//   snapshot
//     .then((data) => {
//       data.forEach((doc) => {
//         console.log(doc.id, ' => ', doc.data());
//       });
//     })
//     .catch((e) => {
//       console.error('Error reading: ' + e);
//     });
// }

function queryAllCollection(data, setter) {
  // returns all docs in collection
  console.log('query');
  console.log(data.collection);
  const setQueryCollection = query(collection(db, data.collection));
  const snapshot = getDocs(setQueryCollection);

  snapshot
    .then((response) => {
      const namesArray = [];
      response.forEach((doc) => {
        const item = doc.data();
        namesArray.push(item.name);
      });
      console.log(namesArray);
      setter(namesArray);
    })
    .catch((e) => {
      console.error('Error reading: ' + e);
    });
}

function updateDocInCollection(data) {
  // update a single value of a field of a doc in a collection
  const setCollection = collection(db, data.collection);
  const queryCollection = query(
    setCollection,
    where('name', '==', data.object.name)
  );

  const snapshot = getDocs(queryCollection);

  snapshot
    .then((response) => {
      if (!response.empty) {
        const docRef = doc(db, data.collection, response.docs[0].id);

        const updateDocRef = updateDoc(docRef, data.update);
        updateDocRef.then(console.log('Update successful')).catch((e) => {
          console.error('Error reading: ' + e);
        });
      }
    })
    .catch((e) => {
      console.error('Error reading: ' + e);
    });
}

function deleteDocInCollection(data) {
  // delete a single doc in a collection
  const setCollection = collection(db, data.collection);
  const queryCollection = query(
    setCollection,
    where('name', '==', data.object.name)
  );

  const snapshot = getDocs(queryCollection);

  snapshot
    .then((response) => {
      if (!response.empty) {
        const docRef = doc(db, data.collection, response.docs[0].id);

        const deleteDocRef = deleteDoc(docRef);

        deleteDocRef.then(console.log('Delete successful')).catch((e) => {
          console.error('Error deleting: ' + e);
        });
      }
    })
    .catch((e) => {
      console.error('Error reading: ' + e);
    });
}

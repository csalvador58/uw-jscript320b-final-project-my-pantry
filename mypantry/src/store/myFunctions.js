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
import { db } from '../firebase';

export function updatePantryHandler(action, setter) {
  if (!action.data.uid) {
    console.log('Error with uid in myFunction updatePantryHandler');
    return;
  }
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

export function queryAllCollection(data, setter) {
  if (!data.uid) {
    console.log('Error with uid in myFunction queryAllCollection');
    return;
  }
  // setup authorized-user collection
  const userCollection = collection(db, 'authorized-users');
  const userDocRef = doc(userCollection, data.uid);

  // setup sub-collection
  const subCollection = 'pantry';

  // Query all docs in sub-collection
  const subCollectionRef = collection(userDocRef, subCollection);
  const snapshot = getDocs(subCollectionRef);

  snapshot
    .then((response) => {
      const pantryArray = [];
      response.forEach((doc) => {
        const item = doc.data();
        pantryArray.push(item);
      });
      setter(pantryArray);
    })
    .catch((e) => {
      alert('Error reading: ' + e);
    });
}

function addToCollection(data) {
  if (!data.uid) {
    console.log('Error with uid in myFunction addToCollection');
    return;
  }

  // setup authorized-user collection
  const userCollection = collection(db, 'authorized-users');
  const userDocRef = doc(userCollection, data.uid);

  // setup sub-collection
  const subCollection = 'pantry';

  // Query all docs in sub-collection with pantry name
  const subCollectionRef = collection(userDocRef, subCollection);
  const queryCollection = query(
    subCollectionRef,
    where('name', '==', data.pantryObj.name)
  );

  const snapshot = getDocs(queryCollection);

  snapshot
    .then((response) => {
      if (response.empty) {
        const setCollection = collection(userDocRef, subCollection);
        const addDocToCollection = addDoc(setCollection, data.pantryObj);
        addDocToCollection
          .then((response) => {
            alert('Pantry item has been added');
          })
          .catch((e) => {
            alert('Error adding document: ' + e);
          });
      } else {
        alert('Item already exists');
      }
    })
    .catch((e) => {
      alert('Error reading: ' + e);
    });
}

function updateDocInCollection(data) {
  if (!data.uid) {
    console.log('Error with uid in myFunction updateDocInCollection');
    return;
  }

  // setup authorized-user collection
  const userCollection = collection(db, 'authorized-users');
  const userDocRef = doc(userCollection, data.uid);

  // setup sub-collection
  const subCollection = 'pantry';

  // Query a matching doc in sub-collection with pantry name
  const subCollectionRef = collection(userDocRef, subCollection);
  const queryCollection = query(
    subCollectionRef,
    where('name', '==', data.pantryObj.name)
  );

  const snapshot = getDocs(queryCollection);

  snapshot
    .then((response) => {
      if (!response.empty) {
        const docRef = doc(userDocRef, subCollection, response.docs[0].id);

        // set object reference
        const updateDocRef = updateDoc(docRef, data.pantryObj);
        updateDocRef.then(alert('Update successful')).catch((e) => {
          alert('Error reading: ' + e);
        });
      }
    })
    .catch((e) => {
      alert('Error reading: ' + e);
    });
}

function deleteDocInCollection(data) {
  if (!data.uid) {
    console.log('Error with uid in myFunction deleteDocInCollection');
    return;
  }

  // setup authorized-user collection
  const userCollection = collection(db, 'authorized-users');
  const userDocRef = doc(userCollection, data.uid);

  // setup sub-collection
  const subCollection = 'pantry';

  // delete a single doc in a collection
  const subCollectionRef = collection(userDocRef, subCollection);
  const queryCollection = query(
    subCollectionRef,
    // need to update to ID
    where('name', '==', data.pantryObj.name)
  );

  const snapshot = getDocs(queryCollection);

  snapshot
    .then((response) => {
      if (!response.empty) {
        const docRef = doc(userDocRef, subCollection, response.docs[0].id);

        const deleteDocRef = deleteDoc(docRef);

        deleteDocRef.then(alert('Delete successful')).catch((e) => {
          alert('Error deleting: ' + e);
        });
      }
    })
    .catch((e) => {
      alert('Error reading: ' + e);
    });
}

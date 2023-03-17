import {
  doc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';

const UID = 'test2';
const initializeDB = [
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'apple',
        type: 'fruit',
        qty: 5,
        unit: 'piece',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'banana',
        type: 'fruit',
        qty: 3,
        unit: 'piece',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'strawberry',
        type: 'fruit',
        qty: 5,
        unit: 'cup',
        favorite: true,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'milk',
        type: 'dairy',
        qty: 1,
        unit: 'gallon',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'beer',
        type: 'beverage',
        qty: 12,
        unit: 'piece',
        favorite: true,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'chicken',
        type: 'protein',
        qty: 3,
        unit: 'pound',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'ground beef',
        type: 'protein',
        qty: 5,
        unit: 'pound',
        favorite: true,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'cookies',
        type: 'sugars',
        qty: 1,
        unit: 'piece',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'bbq chips',
        type: 'other',
        qty: 1,
        unit: 'piece',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'potato',
        type: 'vegetable',
        qty: 3,
        unit: 'piece',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
  {
    type: 'add',
    data: {
      uid: UID,
      collection: 'pantry',
      pantryObj: {
        name: 'vinegar',
        type: 'condiment',
        qty: 1,
        unit: 'piece',
        favorite: false,
        id: uuidv4(),
      },
    },
  },
];

export async function loadDb() {
  const initializeDatabase = () => {
    initializeDB.forEach((item) => {
      addToCollection(item.data);
    });
  };

  initializeDatabase();

  function addToCollection(data) {
    
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
}

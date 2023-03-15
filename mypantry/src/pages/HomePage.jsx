import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../store/UserContext';
import classes from '../css/HomePage.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import ListItemCard from '../ui/ListItemCard';

function HomePage() {
  const appUser = useContext(UserContext);

  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     alert('An error occurred while fetching user data');
  //   }
  };

  const displayPantry = appUser.pantry.map((item, index) => {
    return (
      <li key={`index-${item.name}`}>
        <ListItemCard
          name={item.name}
          qty={item.qty}
          type={item.type}
          unit={item.unit}
          favorite={item.favorite}
        />
      </li>
    );
  });

  return (
    <div className={classes['home-container']} data-testid='homepage'>
      <ul>{displayPantry}</ul>
    </div>
  );
}

export default HomePage;

import React, { useEffect} from 'react';
// import UserContext from '../store/UserContext';
import classes from '../css/HomePage.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

// import ListItemCard from '../ui/ListItemCard';

function HomePage() {
  // const appUser = useContext(UserContext);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  // const displayPantry = appUser.pantry.map((item, index) => {
  //   return (
  //     <li key={`index-${item.name}`}>
  //       <ListItemCard
  //         name={item.name}
  //         qty={item.qty}
  //         type={item.type}
  //         unit={item.unit}
  //         favorite={item.favorite}
  //       />
  //     </li>
  //   );
  // });

  return (
    <div className={classes['home-container']} data-testid='homepage'>
      {/* <ul>{displayPantry}</ul> */}
    </div>
  );
}

export default HomePage;

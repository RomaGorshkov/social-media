import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import RoutesComponent from './routes/RoutesComponent';
import Preloader from './components/shared/Preloader/Preloader';

import { useAppDispatch } from './store/storeHooks';
import { setLoginUser, setLogoutUser } from './store/reducers/auth';
import { auth } from './firebase/config';

const App: React.FC = () => {
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified,
        };
        dispatch(setLoginUser(userData));
      } else {
        dispatch(setLogoutUser());
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <BrowserRouter>{isAuthChecked ? <RoutesComponent /> : <Preloader />}</BrowserRouter>;
};

export default App;

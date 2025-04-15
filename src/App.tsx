import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RoutesComponent from './routes/RoutesComponent';
import { useAppDispatch } from './store/storeHooks';
import { setLoginUser, setLogoutUser } from './store/reducers/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Preloader from './components/shared/Preloader/Preloader';

const App: React.FC = () => {
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setLoginUser({
            username: user.displayName,
            email: user.email,
          }),
        );
      } else {
        dispatch(setLogoutUser());
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <BrowserRouter>{!isAuthChecked ? <RoutesComponent /> : <Preloader />}</BrowserRouter>;
};

export default App;

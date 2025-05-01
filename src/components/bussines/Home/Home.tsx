import React from 'react';

import styles from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { fetchAllPosts } from '../../../store/slices/postsSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allPosts } = useAppSelector((state) => state.posts);

  console.log('All posts:', allPosts);

  React.useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
};

export default Home;

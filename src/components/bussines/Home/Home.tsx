import React from 'react';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      {/* Add your home page content here */}
    </div>
  );
};

export default Home;

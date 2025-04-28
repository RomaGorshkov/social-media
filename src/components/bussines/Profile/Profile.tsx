import React from 'react';
import { useAppSelector } from '../../../store/storeHooks';

import styles from './Profile.module.scss';
import CreatePost from '../CreatePost/CreatePost';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className={styles.profile}>
      {user?.photoURL ? (
        <img src={user.photoURL} alt="User Avatar" className={styles.profile__avatar} />
      ) : (
        <div className={styles.profile__avatarPlaceholder}>{user?.displayName ? user.displayName[0] : 'U'}</div>
      )}

      <h2 className={styles.profile__name}>{user?.displayName}</h2>
      <p className={styles.profile__email}>Email: {user?.email}</p>
      <p className={user?.emailVerified ? styles.profile__statusVerified : styles.profile__statusNotVerified}>
        {user?.emailVerified ? 'Email Verified ✅' : 'Email Not Verified ❌'}
      </p>
      {user?.phoneNumber && <p className={styles.profile__info}>Phone Number: {user.phoneNumber}</p>}
      <CreatePost />
    </div>
  );
};

export default Profile;

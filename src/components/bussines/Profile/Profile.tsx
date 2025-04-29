import React from 'react';
import { GoVerified } from 'react-icons/go';
import { TbXboxX } from 'react-icons/tb';
import { FaUserEdit } from 'react-icons/fa';

import CreatePost from '../CreatePost/CreatePost';
import { useAppSelector } from '../../../store/storeHooks';

import styles from './Profile.module.scss';
import EditProfile from '../EditProfile/EditProfile';

const Profile: React.FC = () => {
  const [editMode, setEditMode] = React.useState(false);

  const { user } = useAppSelector((state) => state.auth);

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <EditProfile />
      ) : (
        <div className={styles.profile}>
          <div className={styles.profile__editIcon}>
            <FaUserEdit onClick={() => changeEditMode()} />
          </div>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User Avatar" className={styles.profile__avatar} />
          ) : (
            <div className={styles.profile__avatarPlaceholder}>{user?.displayName ? user.displayName[0] : 'U'}</div>
          )}
          <h2 className={styles.profile__name}>{user?.displayName}</h2>
          <p className={styles.profile__email}>Email: {user?.email}</p>
          <div>
            {user?.emailVerified ? (
              <p className={styles.profile__statusVerified}>
                Email Verified <GoVerified />
              </p>
            ) : (
              <p className={styles.profile__statusNotVerified}>
                Email Not Verified <TbXboxX />
              </p>
            )}
          </div>
          {user?.phoneNumber && <p className={styles.profile__info}>Phone Number: {user.phoneNumber}</p>}
          <CreatePost />
        </div>
      )}
    </>
  );
};

export default Profile;

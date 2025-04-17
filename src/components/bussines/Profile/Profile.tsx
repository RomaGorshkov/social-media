import React from 'react';
import { useAppSelector } from '../../../store/storeHooks';

import styles from './Profile.module.scss';

interface Post {
  id: number;
  text: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [postText, setPostText] = React.useState('');

  const handleAddPost = () => {
    if (!postText.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      text: postText,
      createdAt: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  return (
    <div className={styles.profile}>
      {user?.photoURL ? (
        <img src={user.photoURL} alt="User Avatar" className={styles.profile__avatar} />
      ) : (
        <div className={styles.profile__avatarPlaceholder}>{user?.displayName ? user.displayName[0] : 'U'}</div>
      )}

      <h2 className={styles.profile__name}>{user?.displayName}</h2>
      <p className={styles.profile__email}>Email: {user?.email}</p>
      <p className={styles.profile__status}>
        Email Verified: {user?.emailVerified ? 'Verified ✅' : 'Not Verified ❌'}
      </p>
      {user?.phoneNumber && <p className={styles.profile__info}>Phone Number: {user.phoneNumber}</p>}
      <div className={styles.profile__postsSection}>
        <div className={styles.profile__newPost}>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's new?"
            className={styles.profile__textarea}
          />
          <button onClick={handleAddPost} className={styles.profile__postButton}>
            Post
          </button>
        </div>
        <div className={styles.profile__postsList}>
          {posts.map((post) => (
            <div className={styles.profile__post} key={post.id}>
              <div className={styles.profile__postHeader}>
                <strong>{user?.displayName}</strong>
                <span>{post.createdAt}</span>
              </div>
              <p className={styles.profile__postText}>{post.text}</p>
              <div className={styles.profile__postActions}>
                <button>👍</button>
                <button>💬</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

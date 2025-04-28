import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { addNewPost, fetchUserPosts } from '../../../store/slices/postsSlice';

import styles from './CreatePost.module.scss';

const CreatePost: React.FC = () => {
  const [postText, setPostText] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { userPosts, loading } = useAppSelector((state) => state.posts);

  const sortedPosts = [...userPosts].sort((a, b) => b.createdAt - a.createdAt);

  React.useEffect(() => {
    if (user) {
      dispatch(fetchUserPosts(user.uid));
    }
  }, [user, dispatch]);

  const handleAddPost = async () => {
    if (!postText.trim() || !user) return;
    try {
      setIsAdding(true);
      await dispatch(
        addNewPost({
          title: 'Post',
          content: postText.trim(),
          userId: user.uid,
        }),
      ).unwrap();

      setPostText('');
    } catch (error) {
      console.error('Failed to add post:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.post__createPost}>
        <textarea
          className={styles.post__textarea}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's new?"
        />
        <button className={styles.post__addPostButton} onClick={handleAddPost} disabled={!postText.trim() || isAdding}>
          {isAdding ? 'Posting...' : 'Post'}
        </button>
      </div>
      <div className={styles.post__postsList}>
        {loading ? (
          <div className={styles.post__loading}>
            <div className={styles.post__spinner} />
            <p className={styles.post__loadingText}>Loading...</p>
          </div>
        ) : userPosts.length > 0 ? (
          sortedPosts.map((post, index) => (
            <div className={styles.post__posts} key={index}>
              <div className={styles.post__postsHeader}>
                <strong>{user?.displayName}</strong>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <p className={styles.post__postsText}>{post.content}</p>
              <div className={styles.post__postsActions}>
                <button>👍</button>
                <button>💬</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.post__noPosts}>No posts yet</div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;

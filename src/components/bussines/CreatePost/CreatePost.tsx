import React from 'react';
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react';
import { MdOutlineEmojiEmotions, MdOutlineDelete } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { addNewPost, deletePost } from '../../../store/slices/postsSlice';

import styles from './CreatePost.module.scss';

const CreatePost: React.FC = () => {
  const [postText, setPostText] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { userPosts, loading } = useAppSelector((state) => state.posts);

  const sortedPosts = [...userPosts].sort((a, b) => b.createdAt - a.createdAt);

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

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setPostText((prev) => prev + emoji.emoji);
    textareaRef.current?.focus();
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) return;
    try {
      await dispatch(deletePost({ postId, userId: user.uid })).unwrap();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.post__createPost}>
        <div className={styles.post__textareaContainer}>
          <textarea
            className={styles.post__textarea}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's new?"
          />
          <MdOutlineEmojiEmotions
            className={styles.post__textareaIcon}
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
        </div>
        {showEmojiPicker && (
          <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} emojiStyle={EmojiStyle.NATIVE} />
        )}
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
        ) : userPosts.length ? (
          sortedPosts.map((post, index) => (
            <div className={styles.post__posts} key={index}>
              <div className={styles.post__postsHeader}>
                <strong>{user?.displayName}</strong>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <p className={styles.post__postsText}>{post.content}</p>
              <div className={styles.post__deletePost}>
                <MdOutlineDelete onClick={() => handleDeletePost(post.id)} />
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

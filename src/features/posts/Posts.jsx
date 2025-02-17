import { useSelector, useDispatch } from 'react-redux';
import { likeButtonPressed, fetchPosts } from './postSlice';
import { useEffect } from 'react';

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    console.log(state.posts);
    return state.posts;
  });
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts.posts.map((post) => (
        <div key={post.postId}>
          <p>{post.caption}</p>
          <button onClick={() => dispatch(likeButtonPressed(post.postId))}>
            {post.likes} likes
          </button>
        </div>
      ))}
    </div>
  );
};

export default Posts;

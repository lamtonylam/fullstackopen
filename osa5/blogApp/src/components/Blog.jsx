import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, mockHandler }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));

  // like amount is initialized from individual blog data
  const [likeAmount, setLikeAmount] = useState(blog.likes);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // liking function
  const like = () => {
    const blog_model = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likeAmount + 1,
    };
    setLikeAmount(likeAmount + 1);

    blogService.put(blog_model, blog.id);
  };

  // handling likes for tests
  // if mockhandler is null, use the real like function
  const likehandler = () => {
    if (mockHandler) {
      mockHandler();
    } else {
      like();
    }
  };

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id);
      window.location.reload();
    }
  };

  return (
    <div style={blogStyle} className='blog' data-testid='blog'>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {likeAmount}
          {/* likehandler because of tests */}
          <button onClick={likehandler}>like</button>{' '}
        </p>
        <p>{blog.user.name}</p>
        {user && user.username === blog.user.username && (
          <button onClick={remove}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;

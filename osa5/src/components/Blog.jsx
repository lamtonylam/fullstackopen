import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {likeAmount}
          <button onClick={like}>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;

import Blog from './Blog';
import CreateBlog from './Create_blog';
import Togglable from './Toggable';

const BlogList = ({ user, blogs }) => (
  <div>

    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default BlogList;

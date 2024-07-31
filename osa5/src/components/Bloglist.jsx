import Blog from './Blog';
import CreateBlog from './Create_blog';
import Togglable from './Toggable';

const BlogList = ({ user, blogs }) => {
  // sort by likes
  blogs.sort(function (a, b) {
    return a.likes - b.likes;
  });

  blogs.reverse();

  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

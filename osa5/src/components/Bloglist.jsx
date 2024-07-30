import Blog from "./Blog";

const BlogList = ({ user, blogs }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>

    <button
      onClick={() => {
        window.localStorage.clear();
        window.location.reload();
      }}
    >
      Logout
    </button>

    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default BlogList;

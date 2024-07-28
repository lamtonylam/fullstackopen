import { useState, useEffect } from 'react';
import Blog from './components/Blog';

// services
import blogService from './services/blogs';
import loginService from './services/login';

const Login = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

const BlogList = ({ user, blogs }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
      console.log('logging in with', username, password);
    } catch {
      // setErrorMessage("wrong crendials");
      // setTimeout(() => {
      //     setErrorMessage(null);
      // }, 5000);
      console.log('wrong credentials');
    }
  };

  // get blogs only when user changes, and also that user is logged in
  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs => setBlogs(blogs));
    }
  }, [user]);

  if (user === null) {
    return (
      <Login
        handleLogin={handleLogin}
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
      />
    );
  }

  return <BlogList user={user} blogs={blogs} />;
};

export default App;

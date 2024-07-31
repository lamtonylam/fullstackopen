import { useState, useEffect } from 'react';

// components
import Blog from './components/Blog';
import ErrorNotification from './components/error';
import SuccessNotification from './components/success';
import Login from './components/login';
import BlogList from './components/Bloglist';
import CreateBlog from './components/Create_blog';
import Togglable from './components/Toggable';

// services
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // notification
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // blog creation form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      // set logged in user to local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

      setSuccessMessage(`logged in succesfully ${username}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage('wrong crendials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      console.log(error);
    }
  };

  const handeBlogPost = async event => {
    event.preventDefault();

    const blog = {
      title: title,
      author: author,
      url: url,
      user: user,
    };

    try {
      const post_blog = await blogService.create(blog);
      setTitle('');
      setUrl('');
      setAuthor('');
      const blogPostResult = post_blog;
      setBlogs(blogs.concat(blogPostResult));

      setSuccessMessage(
        `succesfully added blog ${blogPostResult.title} from author ${blogPostResult.author}`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage('error creating blog', error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      console.error('Error creating blog:', error);
    }
  };

  // get blogs only when user changes, and also that user is logged in
  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs => setBlogs(blogs));
    }
  }, [user]);

  // check if user is saved in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);

      setSuccessMessage(
        'succesfully logged in using saved credentials',
        username
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  }, []);

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {user === null ? (
        <div>
          <Login
            handleLogin={handleLogin}
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>{' '}

          <Togglable buttonLabel='new blog'>
            <CreateBlog
              handeBlogPost={handeBlogPost}
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
            />
          </Togglable>
          <BlogList user={user} blogs={blogs} />{' '}
        </div>
      )}
    </div>
  );
};

export default App;

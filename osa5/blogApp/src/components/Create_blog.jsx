// blog creation component

import { useState } from 'react';

const CreateBlog = ({ CreateBlog, user }) => {
  // blog creation form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = event => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
    };

    CreateBlog(newBlog);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
            data-testid='title'
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
            data-testid='author'
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
            data-testid='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default CreateBlog;

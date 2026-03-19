import { useMutation, useQuery } from '@apollo/client/react';
import { getAllAuthorsQuery, EDIT_BIRTHYEAR } from '../queries';
import { useState } from 'react';

const Authors = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const result = useQuery(getAllAuthorsQuery);
  const authors = result.data?.allAuthors ?? [];

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: getAllAuthorsQuery }],
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await editAuthor({ variables: { name, year: parseInt(year, 10) } });
    } catch (error) {
      console.error('Failed to update author birth year:', error.message);
    }

    setName('');
    setYear('');
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;

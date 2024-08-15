import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then((res) => res.data),
    retry: false
  });
  console.log(JSON.parse(JSON.stringify(result)));

  // if loading anecdotes is error. ie, server is down
  if (result.isError) {
    return <div>anecdote service is not available due to problems in server</div>;
  }

  // if loading anecodotes is still loading, return loading text
  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

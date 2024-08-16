import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAnecdotes, updateAnecdote } from './requests';
import { useContext, useReducer } from 'react';
import NotificationContext from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();

  const [notification, notificationDispatch] = useContext(NotificationContext);

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    }
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    notificationDispatch({
      type: 'addNotification',
      payload: `Voted ${anecdote.content}`
    });
    setTimeout(() => {
      notificationDispatch({ type: 'clearNotification' });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  });
  console.log(JSON.parse(JSON.stringify(result)));

  // if loading anecdotes is error. ie, server is down
  if (result.isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    );
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

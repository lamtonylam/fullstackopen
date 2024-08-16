import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';

import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  // mutation to create new anecdote
  const newAnecdoteMutation = useMutation({
    // mutation function is createanecdote
    mutationFn: createAnecdote,

    // this is used to update anecdotes on mutation success
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notificationDispatch({
        type: 'addNotification',
        payload: `added ${variables.content}`
      });
      setTimeout(() => {
        notificationDispatch({ type: 'clearNotification' });
      }, 5000);
    },

    // display error notification on server error, aka too short message.
    onError: (variables) => {
      notificationDispatch({
        type: 'addNotification',
        payload: `too short anecdote, must have length 5 or more`
      });
      setTimeout(() => {
        notificationDispatch({ type: 'clearNotification' });
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // initialize mutation
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

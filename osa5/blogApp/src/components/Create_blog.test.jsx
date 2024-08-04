import { render, screen } from '@testing-library/react';
import CreateBlog from './Create_blog';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

test('Blogform updates parent state and alls onsubmit', async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  const mock_user = {
    username: 'eines',
    name: 'Tony',
  };

  const { container } = render(
    <CreateBlog CreateBlog={createBlog} user={mock_user} />
  );
  screen.debug();

  const title_input = container.querySelector('#title-input');
  const author_input = container.querySelector('#author-input');
  const url_input = container.querySelector('#url-input');
  const send_button = screen.getByText('create');

  await user.type(title_input, 'Elämän tarinani');
  await user.type(author_input, 'Mikko Mallikas');
  await user.type(url_input, 'hs.fi');
  await user.click(send_button);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Elämän tarinani');
  expect(createBlog.mock.calls[0][0].author).toBe('Mikko Mallikas');
  expect(createBlog.mock.calls[0][0].url).toBe('hs.fi');
});

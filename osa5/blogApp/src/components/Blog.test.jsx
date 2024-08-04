import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { expect, test } from 'vitest';

test('renders blog title and author', () => {
  const blog = {
    user: {
      name: 'Tony',
    },
    title: 'testi blogi',
    author: 'Mikko Mallikas',
    url: 'hs.fi',
    likes: 40,
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText('testi blogi Mikko Mallikas');
  expect(element).toBeDefined();
});

test('expanding with click shows details', async () => {
  const blog = {
    user: {
      name: 'Tony',
    },
    title: 'testi blogi',
    author: 'Mikko Mallikas',
    url: 'hs.fi',
    likes: 40,
  };

  render(<Blog blog={blog} />);

  // click button
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  // get items to be tested
  const url = screen.getByText('hs.fi');
  const likes = screen.getByText('40');
  const user_test = screen.getByText('Tony');

  // assert that they are there
  expect(url, likes, user_test).toBeDefined();
});

test('clicking like button twice', async () => {
  const blog = {
    user: {
      name: 'Tony',
    },
    title: 'testi blogi',
    author: 'Mikko Mallikas',
    url: 'hs.fi',
    likes: 40,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} mockHandler={mockHandler} />);

  const user = userEvent.setup();
  const viewbutton = screen.getByText('view');
  await user.click(viewbutton);
  const likebutton = screen.getByText('like');
  await user.click(likebutton);
  await user.click(likebutton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

import { render, screen } from '@testing-library/react';
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

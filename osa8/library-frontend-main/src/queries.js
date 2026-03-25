import { gql } from '@apollo/client';

export const getBooksQuery = gql`
  query {
    allBooks {
      id
      published
      title
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const getAllAuthorsQuery = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      id
      name
      born
    }
  }
`;

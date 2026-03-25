import { GraphQLError } from 'graphql';
import Book from './models/book.js';
import Author from './models/author.js';

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      if (author && genre) {
        const foundAuthor = await Author.findOne({ name: author });
        if (foundAuthor) {
          return Book.find({ author: foundAuthor._id, genres: genre });
        }
        return [];
      }
      if (author) {
        const foundAuthor = await Author.findOne({ name: author });
        if (foundAuthor) {
          return await Book.find({ author: foundAuthor._id });
        }
        return [];
      }
      if (genre) {
        return await Book.find({ genres: genre });
      }

      return Book.find();
    },
    allAuthors: async () => await Author.find(),
  },

  Mutation: {
    addBook: async (root, { title, author, published, genres }) => {
      const foundBook = await Book.findOne({ title: title });

      if (foundBook) {
        throw new GraphQLError(`title must be unique ${title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: title,
          },
        });
      }

      if (author.length() < 0) {
        throw new GraphQLError(
          'Author name too short, must be at least one char',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: author,
            },
          }
        );
      }

      if (title.length() < 0) {
        throw new GraphQLError('title too short, must be at least one char', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: title,
          },
        });
      }

      const foundAuthor = await Author.findOne({ name: author });
      let authorDocument = foundAuthor;

      if (!foundAuthor) {
        const newAuthor = new Author({ name: author });
        authorDocument = await newAuthor.save();
      }

      const book = new Book({
        title,
        author: authorDocument._id,
        published,
        genres,
      });
      const savedBook = await book.save();
      return savedBook.populate('author');
    },
    editAuthor: async (root, { name, setBornTo }) => {
      const foundAuthor = await Author.findOne({ name: name });

      if (foundAuthor) {
        foundAuthor.born = setBornTo;
        return foundAuthor.save();
      }

      return null;
    },
  },

  Author: {
    bookCount: async (root) => {
      return 0;
    },
  },
};

export default resolvers;

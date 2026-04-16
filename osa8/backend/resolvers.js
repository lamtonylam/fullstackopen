import { GraphQLError } from 'graphql';
import Book from './models/book.js';
import Author from './models/author.js';
import User from './models/user.js';
import jwt from 'jsonwebtoken';

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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, { title, author, published, genres }) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

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
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

      const foundAuthor = await Author.findOne({ name: name });

      if (foundAuthor) {
        foundAuthor.born = setBornTo;
        return foundAuthor.save();
      }

      return null;
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const foundUser = await User.findOne({ username: username });

      if (foundUser) {
        throw new GraphQLError('user already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
          },
        });
      }

      const user = new User({ username: username, favoriteGenre });

      return user.save().catch((error) => {
        throw new GraphQLError(`creating user failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
            error,
          },
        });
      });
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username: username });

      if (!user || password !== 'salasana') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Author: {
    bookCount: async (root) => {
      return 0;
    },
  },
};

export default resolvers;

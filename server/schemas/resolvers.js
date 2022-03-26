const { Book, User } = require('../models');

// createUser,
//   getSingleUser,
//   saveBook,
//   deleteBook,
//   login,

const resolvers = {
    Query: {
        books: () => Book.find().sort({ createdAt: -1 }),
        book: (_, { id }) => Book.findById(id),
        users: () => User.find().sort({ createdAt: -1 }),
        user: async (_, { _id }) => await User.findById({ _id: _id }),
    },
    Mutation: {
        createUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            return user;
        },
        saveBook: async (_, { user, bookId }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: bookId } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
        deleteBook: async (_, { user, bookId }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            return updatedUser;
        }
        //login: async (_, { email, password }) => {

    }
};

module.exports = resolvers;
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

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

            if (!user) {
                return 'Something is wrong!'
            }
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    console.log('no user found');
                    return 'Can\'t find this user'
                }
                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) {
                    console.log('wrong password');
                    return 'Wrong password!'
                }
                const token = signToken(user);
                console.log('made it here');
                return user;
            } catch (err) {
                return 'test';
            }
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

    }
};

module.exports = resolvers;
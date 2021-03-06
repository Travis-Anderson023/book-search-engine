const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type book {
        _id: ID!
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [book]
        bookCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        books(userId: ID!): [book]
        book(_id: ID!): book
        users: [User]!
        user(_id: ID!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): Auth
        saveBook(user: ID!, bookId: String!): User
        deleteBook(user: ID!, bookId: String!): User
    }
    

`;

module.exports = typeDefs;
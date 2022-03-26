import { gql } from '@apollo/client';

export const QUERY_BOOKS = gql`
    query books {
        books {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;

export const QUERY_BOOK = gql`
    query book($id: ID!) {
        book(_id: $id) {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            password
            savedBooks
            bookCount
        }
    }
`;

export const QUERY_USER = gql`
    query user($id: ID!) {
        user(_id: $id) {
            _id
            username
            email
            password
            savedBooks
            bookCount
        }
    }
`;

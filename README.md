# GraphQL API Server

This project implements a GraphQL API server for managing a library collection. The API allows you to query libraries, books, authors, users, add new books, and update existing books.

## Prerequisites

List any prerequisites for your project here. For example:

- Node.js installed
- npm or Yarn package manager

## Installation

Provide step-by-step instructions on how to install and set up your project. For example:

1. Clone the repository: `git clone https://github.com/robinsingh1912/graphql.git`
2. Navigate to the project directory: `cd graphql`
3. Install dependencies: `npm install`

## Usage

To start the server, run:

```bash
npm start
```

The server will be running at http://localhost:4000. You can access the GraphQL Playground to test your queries and mutations.

## API Documentation

> Queries

- libraries: Get a list of all libraries.

Example Query:

```graphql
{
  libraries {
    name
    books {
      title
      author {
        name
      }
    }
  }
}
```

- books: Get a list of all books.

Example Query:

```graphql
{
  books {
    id
    title
    author
    library
  }
}
```

> Mutations

- Add a new book to the library.

`addBook(title: String!, author: String!, library: String!): Book`

Example Mutation:

```graphql
mutation {
  addBook(
    title: "New Book Title"
    author: "Author Name"
    library: "Library Name"
  ) {
    id
    title
    author
    library
  }
}
```

- Update an existing book.

`updateBook(id: ID!, title: String, author: String, library: String): Book`

Example Mutation:

```graphql
mutation {
  updateBook(id: "book-1", title: "Updated Book Title") {
    id
    title
    author
    library
  }
}
```

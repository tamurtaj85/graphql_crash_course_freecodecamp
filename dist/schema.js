// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
/**
  `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }`
 */
// there are 5 data types available in graphql i.e: int, float, string, boolean, ID
export const typeDefs = `#graphql
  type Game{
    id: ID!,
    title: String!,
    platforms:[String!]! # excalmation sign make the field required and can't be null
  }

  type Review{
    id: ID!,
    rating: Int!,
    content: String!
  }

  type Author{
    id: ID!,
    name: String!,
    verified: Boolean!
  }

  # defining the query schema kind of endpoints accessible to the user, here we defined 3 endpoints returning the collection of each type of schema
  type Query{
    reviews:[Review],
    # syntax for getting a single item
    review(id: ID!): Review
    games:[Game],
    authors:[Author]
  }
`;

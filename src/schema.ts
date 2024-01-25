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
    reviews: [Review!] # the logic here of not placing ! after the sq brackets is that the array can be null but the data cant be null
  }

  type Review{
    id: ID!,
    rating: Int!,
    content: String!
    game: Game!
    author: Author!
  }

  type Author{
    id: ID!,
    name: String!,
    verified: Boolean!
    reviews: [Review!]
  }

  # defining the query schema kind of endpoints accessible to the user, here we defined 3 endpoints returning the collection of each type of schema
  type Query{
    reviews:[Review],
    games:[Game],
    authors:[Author],
    # syntax for getting a single item
    review(id: ID!): Review,
    game(id: ID!): Game,
    author(id: ID!): Author
  }

  # Mutations i.e. post, put patch and delete behaviors
  type Mutation{
    # post
    addGame(payload:AddGameInput): Game,
    # put, patch
    updateGame(id:ID!, payload:EditGameInput): Game,
    # delete
    deleteGame(id: ID!): [Game]
  }

  # defining the payloads for mutations
  input AddGameInput{
    title: String!,
    platforms: [String!]!
  }

  input EditGameInput{
    title: String,
    platforms: [String!]
  }
`;

const { ApolloServer, gql } = require("apollo-server");
const { getDB } = require("./mysql");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Todo {
    id: Int
    description: String
    isFinished: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    todos: [Todo]
  }
  type Mutation {
    addTodo(description: String): String
    deleteTodo(id: Int): String
    updateTodo(description: String, isFinished: Boolean, id: Int): String
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    todos: async () => {
      const db = await getDB();
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM todo", (err, todos) => {
          if (err) {
            reject(err);
          } else {
            resolve(todos);
          }
        });
      });
    },
  },
  Mutation: {
    addTodo: async (parent, args, context, info) => {
      console.log(args);
      const query = "INSERT INTO todo (description) VALUES ?"
      const db = await getDB();
      const values = [
        [args.description],
      ];
      return new Promise((resolve, reject) => {
        db.query(query, [values], function (err, result) {
          if (err) return reject(err)
          console.log(`insert ${values} success`)
          return resolve('result')
        })
      })
    },
    deleteTodo: async (parent, args, context, info) => {
      console.log(args);
      const query = "DELETE FROM todo WHERE id=?"
      const db = await getDB();
      const values = [
        [args.id],
      ];
      return new Promise((resolve, reject) => {
        db.query(query, [values], function (err, result) {
          if (err) return reject(err)
          return resolve('result')
        })
      })
    },
    updateTodo: async (parent, args, context, info) => {
      console.log(args);
      const query = "UPDATE todo\
                      SET description = ?, isFinished= ?\
                      WHERE id = ?;"
      const db = await getDB();
      const values = [
        args.description, args.isFinished, args.id,
      ];
      return new Promise((resolve, reject) => {
        db.query(query, values, function (err, result) {
          if (err) return reject(err)
          return resolve('result')
        })
      })
    },
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

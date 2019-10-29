require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const { MONGODB_URI, SECRET } = process.env

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    updateGenre(
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author.id
      }
      if(args.genre) {
        filter.genres = { $in: [args.genre] }
      }

      const filteredBooks = await Book.find({
        ...filter
      })
      .populate('author')
      return filteredBooks
    },
    allAuthors: () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const {
        title,
        author,
        published,
        genres,
      } = args

      if (!currentUser) {
        throw new AuthenticationError('Please login to add books')
      }

      // check if book author exists,
      // if not add it to the authors
      let authorId = ''
      const authorExists = await Author.findOne({ name: author})
      if (authorExists) {
        authorId = authorExists._id
      } else {
        let newAuthor = new Author({ name: author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        authorId = newAuthor._id
      }

      const newBook = new Book({
        title,
        author: authorId,
        published,
        genres,
      })

      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return Book.findById(newBook._id).populate('author')
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError('Please login to change author details')
      }

      const authorExists = await Author.findOne({ name: args.name })
      if (authorExists) {
        authorExists.born = args.setBornTo
        try {
          return authorExists.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      } else {
        return null
      }
    },
    updateGenre: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError('Please login to change author details')
      }

      currentUser.favoriteGenre = args.favoriteGenre

      try {
        return currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username
      })

      if (!user || args.password !== 'secret123') {
        throw new UserInputError('invalid credentials')
      }

      const userData = {
        id: user._id,
        username: user.username,
      }

      return {
        value: jwt.sign(userData, SECRET)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
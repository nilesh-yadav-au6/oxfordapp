import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import cors from "cors"
const PORT = process.env.PORT || 4000
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()

const startServer = async () => {
const app = express();

app.use(cors())


  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });
  console.log(process.env.MONGODB_URI)
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
  });


  if(process.env.NODE_ENV === "production"){
    console.log(process.env.NODE_ENV)
    app.use(express.static(path.resolve(__dirname, "client", "build")))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


  app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();

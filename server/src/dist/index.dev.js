"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _resolvers = require("./resolvers");

var _typeDefs = require("./typeDefs");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 4000;

var dotenv = require("dotenv");

var path = require("path");

dotenv.config();

var startServer = function startServer() {
  var app, server;
  return regeneratorRuntime.async(function startServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          app = (0, _express["default"])();
          app.use((0, _cors["default"])());
          server = new _apolloServerExpress.ApolloServer({
            typeDefs: _typeDefs.typeDefs,
            resolvers: _resolvers.resolvers
          });
          server.applyMiddleware({
            app: app
          });
          console.log(process.env.MONGODB_URI);
          _context.next = 7;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          }));

        case 7:
          if (process.env.NODE_ENV === "production") {
            console.log(process.env.NODE_ENV);
            app.use(_express["default"]["static"](path.resolve(__dirname, "client", "build")));
            app.get("*", function (req, res) {
              res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
            });
          }

          app.listen(PORT, function () {
            return console.log("Server ready at http://localhost:".concat(PORT).concat(server.graphqlPath));
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

startServer();
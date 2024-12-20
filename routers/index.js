const usersRouter = require("./userRoutes");
const messageRoutes = require("./messageRoutes");
const postRoutes = require("./posts");
const commentRoutes = require("./commentRoutes");
const likeRoutes = require("./like");
const aiRoutes = require("./aiRoutes");
function routes(app) {
  app.use("/api/auth", usersRouter);
}

module.exports = routes;

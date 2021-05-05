const todoController = require("./controllers/todoController");
const {
    register,
    login,
    isVerify,
    dashboard,
} = require("./controllers/usersController");
const schema = require("./models/schema");
const validate = require("./middleware/validation");
const authorization = require("./middleware/authorization");

module.exports = (app) => {
    /* User section */
    app.get("/is-verify", authorization, isVerify);
    app.post("/signup", validate(schema.signUp), register);
    app.post("/login", validate(schema.login), login);
    app.get("/user", authorization, dashboard);

    /* Todo section */
    app.get("/todos", todoController.allTodo);
    app.get("/todos/:id", todoController.getTodoById);
    app.post("/todos", validate(schema.todos), todoController.insertTodo);
    app.put("/todos/:id", todoController.updateTodo);
    app.delete("/todos/:id", todoController.deleteTodo);
};
const todoController = require("./controllers/todoController");
const usersController = require("./controllers/usersController");
const contact = require("./controllers/contact");
const courseController = require("./controllers/courseController");
const schema = require("./models/schema");
const validate = require("./middleware/validation");
const authorization = require("./middleware/authorization");

module.exports = (app) => {
    /* User section */
    // app.get("/is-verify", authorization, usersController.isVerify);
    app.post("/signup", validate(schema.signUp), usersController.register);
    app.post("/login", validate(schema.login), usersController.login);
    app.get("/user", authorization, usersController.user);

    /* Todo section */
    app.get("/todos", todoController.allTodo);
    app.get("/todos/:id", todoController.getTodoById);
    app.post("/todos", validate(schema.todos), todoController.insertTodo);
    app.put("/todos/:id", todoController.updateTodo);
    app.delete("/todos/:id", todoController.deleteTodo);

    /* Contact section */
    app.post("/contactUs", validate(schema.contact), contact.contact);

    /* Course section */
    app.post(
        "/course",
        /* authorization,  */
        validate(schema.course),
        courseController.insertCourse
    );
    app.get("/courses", /* authorization, */ courseController.AllCourse);
    app.get("/courses/:id", /* authorization, */ courseController.getCourseId);
    app.put("/courses/:id", /* authorization, */ courseController.updateCourse);
};
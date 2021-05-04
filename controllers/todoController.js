const { pool } = require("../models/db");
/* const validate = require("../middleware/validation"); */

//Get all todo
module.exports = {
    async allTodo(req, res) {
        try {
            const allTodos = await pool.query("SELECT * FROM todo");
            res.json(allTodos.rows);
        } catch (error) {
            // res.status(error.statusCode).json(error);
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },

    //Get a todo
    async getTodoById(req, res) {
        const { id } = req.params;
        try {
            const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
                id,
            ]);
            if (todo.rows.length == 0) {
                return res.status(401).send({ error: "Id does not exist" });
            } else {
                res.json(todo.rows[0]);
                console.log(todo.rows[0]);
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    },
    //Create todo
    async insertTodo(req, res, next) {
        try {
            let { description } = req.body;
            const newTodo = await pool.query(
                "INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]
            );
            res.json(newTodo.rows[0]);
        } catch (error) {
            // res.status(error.statusCode).json(error);
            console.log(error.message);
            res.status(500).send("Server Error");
        }
        // next();
    },
    //Update todo
    async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            const update = await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]
            );
            res.json("Todo updated successfully");
        } catch (error) {
            res.status(error.statusCode).json(error);
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
    //Delete todo
    async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const deleteTodo = await pool.query(
                "DELETE FROM todo WHERE todo_id = $1", [id]
            );
            res.json("Todo deleted successfully");
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
};
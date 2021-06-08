const { pool } = require("../models/db");

module.exports = {
    /* Get Course */
    async AllCourse(req, res) {
        try {
            const courses = await pool.query(
                "SELECT * FROM course ORDER BY course_id DESC"
            );
            if (courses.rows.length == 0) {
                return res.status(401).send({ error: "No course available" });
            }
            res.send({
                message: "Successful",
                data: courses.rows,
            });
        } catch (error) {
            res.status(500).send({ error: "Error trying to get course" });
            console.log(error.message);
        }
    },
    /* Get By Id */
    async getCourseId(req, res) {
        const { id } = req.params;
        try {
            const course = await pool.query(
                "SELECT * FROM course WHERE course_id = $1", [id]
            );
            if (course.rows.length == 0) {
                return res.status(401).send({ error: "Course not available" });
            }
            res.send({
                message: "Successful",
                data: course.rows[0],
            });
        } catch (error) {
            res.status(500).send({ error: "Error trying to get course" });
        }
    },
    /* Insert Course */
    async insertCourse(req, res) {
        try {
            let { title, description, instructor } = req.body;
            const newCourse = await pool.query(
                "INSERT INTO course (title, description, instructor) VALUES ($1,$2,$3) RETURNING *", [title, description, instructor]
            );
            res.json(newCourse.rows[0]);
        } catch (error) {
            res.status(500).send({ error: "Error trying to add course" });
        }
    },
    /*  Update course */
    async updateCourse(req, res) {
        try {
            const { id } = req.params;
            const { title, description, instructor } = req.body;
            const update = await pool.query(
                "UPDATE course SET title =$1, description=$2, instructor=$3 WHERE course_id= $4", [title, description, instructor, id]
            );
            if (update.rows.length !== 0) {
                res.status(400).send("Course not available");
            }
            res.status(201).json(`Course modified with ID: ${id}`);
        } catch (error) {
            res.status(500).send({ error: "Error trying to update course" });
            console.log(error.message);
        }
    },
    //Delete Course
    async deleteCourse(req, res) {
        try {
            const { id } = req.params;
            const deleteCourse = await pool.query(
                "DELETE FROM course WHERE course_id = $1", [id]
            );
            if (deleteCourse.rows.length == 0) {
                res.status(400).send("Course not available");
            } else {
                res.json(`Course with ID: ${id} deleted successfully`);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
};
const { pool } = require("../models/db");

module.exports = {
    /* Get Course */
    async AllCourse(req, res) {
        try {
            const courses = await pool.query("SELECT * FROM course");
            // if (courses.rows.length == 0) {
            //     return res.status(401).send({ error: "No course is available" });
            // }
            res.send({
                message: "Successful",
                data: courses.rows,
            });
            console.log(courses.rows);
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
            console.log(course.rows[0]);
        } catch (error) {
            res.status(500).send({ error: "Error trying to get course" });
            console.log(error.message);
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
            console.log(newCourse.rows[0]);
        } catch (error) {
            res.status(500).send({ error: "Error trying to add course" });
            console.log(error.message);
        }
    },
    async updateCourse(req, res) {
        try {
            const { id } = req.params;
            const { title, description, instructor } = req.body;
            const update = await pool.query(
                "UPDATE course SET (title,description,instructor) = ($1,$2,$3) WHERE course_id= $4", [title, description, instructor, id]
            );
            res.json("Your update was Successful");
        } catch (error) {
            res.status(500).send({ error: "Error trying to update course" });
            console.log(error.message);
        }
    },
};
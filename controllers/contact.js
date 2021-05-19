const { pool } = require("../models/db");
/* Contact section */
module.exports = {
    async contact(req, res) {
        try {
            let { fullname, email, message } = req.body;
            const contact = await pool.query(
                "INSERT INTO contact (fullname,email,message) VALUES ($1,$2,$3) RETURNING *", [fullname, email, message]
            );
            // if (contact == null) {
            //     res.status(400).send({ error: "An error has occurred" });
            // }
            res.json({
                status: "Success",
                data: contact.rows[0],
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
};
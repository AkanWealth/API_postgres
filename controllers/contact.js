const { pool } = require("../models/db");
/* Contact section */
module.exports = {
    async contact(req, res) {
        try {
            let { contact_name, contact_email, contact_message } = req.body;
            const contact = await pool.query(
                "INSERT INTO contact (contact_name,contact_email,contact_message) VALUES ($1,$2,$3) RETURNING *", [contact_name, contact_email, contact_message]
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
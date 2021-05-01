const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { tokenGenerator } = require("../utils/tokenGenerator");

module.exports = {
    /* REGISTER */
    async register(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body;

            /* Checking if email exist */
            const user = await pool.query("SELECT * FROM users WHERE email = $1", [
                email,
            ]);

            if (user.rows.length !== 0) {
                return res.status(401).send("Email already exist");
            }

            /* Hashing password */
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const hashedPassword = await bcrypt.hash(password, salt);

            /* Insert into database */
            const newUser = await pool.query(
                "INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4) RETURNING *", [first_name, last_name, email, hashedPassword]
            );

            /* Generate jwt token */
            const token = tokenGenerator(newUser.rows[0].user_id);

            res.json({
                status: "Success",
                data: newUser.rows[0],
                accessToken: token,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
    /* LOGIN */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await pool.query("SELECT * FROM users WHERE email = $1", [
                email,
            ]);

            /* check for user */
            if (user.rows.length === 0) {
                return res.status(401).json("Incorrect Email or Password");
            }
            const validPassword = await bcrypt.compare(
                password,
                user.rows[0].password
            );
            if (!validPassword) {
                return res.status(401).json("Incorrect Email or Password");
            }
            /*  give the token */
            const token = tokenGenerator(user.rows[0].user_id);
            res.json({
                message: `${email}` + " You welcome",
                accessToken: token,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
    async isVerify(req, res) {
        try {
            res.json(true);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
    async dashboard(req, res) {
        try {
            // res.json(req.user);
            const user = await pool.query(
                "SELECT first_name FROM users WHERE user_id = $1", [req.user]
            );
            res.json(user.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    },
};
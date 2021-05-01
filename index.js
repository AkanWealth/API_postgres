const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

const app = express();

require("./models/db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));

//Route//
require("./routes")(app);

app.get("/", (req, res) => {
    res.send("WELCOME APPLICATION RUNNING");
});

const PORT = process.env.PORT;

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
);
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const transcriptRoute = require("./routes/transcriptRoute");
const openaiRoute = require("./routes/openaiRoute");
const bodyParser = require('body-parser');
const mongoDBConnString = process.env.MONGODB_CONN_STRING;
const port = process.env.PORT || 5000;

mongoose.connect(mongoDBConnString);
const database = mongoose.connection;

database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("Database Connected");
});

const app = express();
// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors());
app.use(express.json());
app.use("/api/transcript", transcriptRoute);
app.use("/api/openai", openaiRoute);

app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});

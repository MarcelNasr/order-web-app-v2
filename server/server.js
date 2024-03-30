const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express()
const routes = require("./routes")
const {connectSQL} = require('./config/database')
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/v1",routes)

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await connectSQL()
    console.log(`the server is running on port: ${PORT}`)
})
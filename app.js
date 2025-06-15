require('dotenv').config()
const handleDbConnection = require("./mongoConnection")
const express = require('express');
const app = express();
const authRoutes = require("./routes/auth")
const studentRouter = require("./routes/studentData")
const cors = require('cors')

app.use(express.json());
app.use(cors())
handleDbConnection()

app.use("/api", authRoutes)
app.use("/api/student", studentRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
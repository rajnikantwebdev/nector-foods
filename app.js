require('dotenv').config()
const handleDbConnection = require("./mongoConnection")
const express = require('express');
const app = express();
const authRoutes = require("./routes/auth")
app.use(express.json());
handleDbConnection()

app.use("/api", authRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const router = express.Router();
const { getAllStudent, deleteRow } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/data", getAllStudent);

router.delete("/:index", authMiddleware, async (req, res) => {
    const index = parseInt(req.params.index, 10);
    console.log("index, ", index)

    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied" });
    }

    try {
        await deleteRow(index);
        res.json({ msg: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting row", error: err.message });
      }
})
module.exports = router
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        status: "EXAMPLE ROUTE WORKING"
    })
})



module.exports = router
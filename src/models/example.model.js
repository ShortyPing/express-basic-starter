const mongoose = require("mongoose");


module.exports = mongoose.model("example", new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
}));


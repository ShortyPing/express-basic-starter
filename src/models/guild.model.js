const mongoose = require("mongoose");


module.exports = mongoose.model("guild", new mongoose.Schema({
    server_id: {
        type: String,
        required: true
    },
    
}));


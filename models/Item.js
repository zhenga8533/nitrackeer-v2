const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Item", itemSchema);

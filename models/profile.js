const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
    
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);

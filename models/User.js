const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String }, 
  department: { type: String },
  deanery: { type: String },
  email: { type: String, required: true, unique: true },
  regNo: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);

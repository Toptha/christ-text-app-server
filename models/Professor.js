const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  name: String,
  position: String,
  email: String,
  image: String,
  deanery: String,
  department: String,
});

module.exports = mongoose.model('Professor', professorSchema);

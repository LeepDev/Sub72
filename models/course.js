const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true },
  parOut: { type: Number, required: true },
  parIn: { type: Number, required: true },
  parTotal: { type: Number, required: true },
  holePars: [{ type: Number, required: true }],
  holeIndexes: [{ type: Number, required: true }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);

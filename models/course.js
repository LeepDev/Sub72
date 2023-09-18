const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true },
  parTotal: { type: Number, required: true, default: 72 },
  parOut: { type: Number },
  parIn: { type: Number },
  holePars: [{ type: Number }],
  holeIndexes: [{ type: Number }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);

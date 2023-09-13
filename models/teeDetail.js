const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teeDetailSchema = new Schema({
  color: { type: String, required: true },
  distanceOut: { type: Number, required: true },
  distanceIn: { type: Number, required: true },
  distanceTotal: { type: Number, required: true },
  rating: { type: Number, required: true },
  slope: { type: Number, required: true },
  holeDistances: [{ type: Number }],
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('TeeDetail', teeDetailSchema);

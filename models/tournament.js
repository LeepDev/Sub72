const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: { type: String, required: true },
  rounds: { type: Number, required: true },
  live: {
    type: Boolean,
    default: false
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    sparse: true
  }],
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
    sparse: true
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Tournament', tournamentSchema);

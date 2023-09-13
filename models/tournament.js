const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: { type: String, required: true },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Tournament', tournamentSchema);

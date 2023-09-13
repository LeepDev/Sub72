const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: { type: String, required: true },
  rounds: { type: Number, required: true },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    sparse: true
  }],
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
    sparse: true
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Tournament', tournamentSchema);

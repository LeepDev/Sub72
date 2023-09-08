const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Tournament', tournamentSchema);

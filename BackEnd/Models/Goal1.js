const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },
  usernameOne: {
    type: String,
    required: true,
  },
  usernameTwo: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  matches: {
    type: Number,
    default: 0,
  },
  mismatches: {
    type: Number,
    default: 0,
  },
  winner: {
    type: String,
    enum: ['usernameOne', 'usernameTwo', 'draw'],
    default: 'draw',
  },
  wordProposerUsername: {
    type: String,
    required: true,
  },
  hangmanUsername: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

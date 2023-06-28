const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/games', async (req, res) => {
  try {
    const { usernameOne, usernameTwo } = req.body;
    const word = // generate a random word here
    const game = new Game({
      gameId: // generate a unique game id here,
      usernameOne,
      usernameTwo,
      word,
      wordProposerUsername: Math.random() < 0.5 ? usernameOne : usernameTwo,
      hangmanUsername: Math.random() < 0.5 ? usernameOne : usernameTwo,
    });
    const result = await game.save();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
    } else {
        res.json(game);
      }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
        }
        });
        
        router.put('/games/:id', async (req, res) => {
        try {
        const { id } = req.params;
        const { letter, username } = req.body;
        const game = await Game.findById(id);
        if (!game) {
        res.status(404).json({ error: 'Game not found' });
        } else {
        const { word, wordProposerUsername, hangmanUsername } = game;
        const isLetterPresent = word.includes(letter);
        const isLetterUsed = wordProposerUsername === username
        ? game.matches > 0 && word.split('').slice(0, game.matches).includes(letter)
        : game.mismatches > 0 && word.split('').slice(0, game.mismatches).includes(letter);
        if (isLetterPresent && !isLetterUsed) {
        const matches = word.split('').filter((char) => char === letter).length;
        const mismatches = word.split('').filter((char) => char !== letter).length;
        const update = {
        matches: wordProposerUsername === username ? game.matches + matches : game.matches,
        mismatches: hangmanUsername === username ? game.mismatches + mismatches : game.mismatches,
        winner: mismatches === 6 ? wordProposerUsername : matches === word.length ? hangmanUsername : 'draw',
        };
        const result = await Game.findByIdAndUpdate(id, update, { new: true });
        res.json(result);
        } else {
        res.status(400).json({ error: 'Invalid letter' });
        }
        }
        } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
        }
        });
        
        module.exports = router;      
const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  verifyUser,
} = require('../Controllers/goalcontroller');
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/verify:token').get(verifyUser);

module.exports = router;
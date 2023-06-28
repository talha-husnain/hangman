
// const Goal = require('../models/goalModel')
const User = require('../models/Goal');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { response } = require('express');
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const getUserByEmail = await User.findOne({
    email: email,
  });
  // console.log(getUserByEmail)
  // console.log(req.body)

  if (getUserByEmail) {
    if (!getUserByEmail.email_verification) {
      return res.status(401).send({
        message:
          'Un-verified email. You must verify your email before proceeding further',
      });
    }
    const hash = getUserByEmail.password;
    // console.log(password)
    const validPass = await compare(password, hash);

    if (validPass) {
      res.send(getUserByEmail);
      console.log('Logged in: ', email);
    } else {
      res.send({ message: 'invalid pass!' });
      console.log('invalid pass!');
    }
  } else {
    res.status(404).send({ message: 'email does not exist' });
    console.log('email does not exist');
  }
  // res.status(200).json(getUserByEmail)
};

const verifyUser = (req, res, next) => {
  User.findOne({
    token: req.params.token,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Token not found' });
      }
      user.email_verification = true;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
      res.json({ message: 'Email verified. You can now login' });
    })
    .catch((err) => console.log('verification error', err));
};

const registerUser = async (req, res) => {
  // console.log("call", req.body)
  try {
    const { name, email, password, profile_link } = req.body;

    const getUser = await User.findOne({
      email: email,
    });

    if (getUser) {
      res.send({ message: 'Email already exists!' });
    } else {
      newUser = new User({
        name: name,
        email: email,
        password: password,
        user_name: name,
        token: token,
        flag: 0,
        profile_picture: null,
        profile_link: profile_link,
      });
      // User.insertMany(newUser)
      newUser.save((err) => {
        if (err) {
          console.log('here');
          res.send(err);
          return;
        }
        res.send({
          message: 'Successfully Registered, Please verify your email.',
        });
        console.log("email sending", email, token)
        nodemailer.sendVerificationEmail(name, email, token)
        console.log("hmmm")
        
      });
    }
  } catch (err) {
    res.json({ message: 'register error' });
  }

  // res.status(200)
};


// const deleteUser = async()

module.exports = {
  loginUser,
  registerUser,
  verifyUser,

};
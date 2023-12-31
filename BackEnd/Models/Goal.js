// const mongoose = require('mongoose');
// // require('mongoose-type-email');
// // const { isEmail } = require('validator');
// // const bcrypt = require('bcrypt');

// const Schema = mongoose.Schema;

// const goal = new Schema({
//   text: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   numbers:{type:[Number]}
  
// });





// module.exports = mongoose.model('Goal', goal);




const mongoose = require('mongoose');
// require('mongoose-type-email');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const user = new Schema({
  email: {
    type: String,
    required: true,
    // validate: [isEmail, 'invalid email'],
    unique: true,
  },
  email_verification: { type: Boolean, required: true, default: false },
  token: { type: String, unique: true },
  password: { type: String, required: true },
  user_name: { type: String, required: false, unique: true },
  name: { type: String, required: true },
});

user.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    // const hashed = await bcrypt.hash(this.password, 10);
    // this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

user.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model('Goal', user);
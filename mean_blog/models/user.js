const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if (!email) {
    return false;
  } else {
    if (email.length < 5 || email.length > 30) {
      return false;
    } else {
      return true;
    }
  }
}

let validEmailChecker = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
}

let userNameLengthChecker = (username) => {
  if (!username) {
    return false;
  } else {
    if (username.length < 5 || username.length > 15) {
      return false;
    } else {
      return true;
    }
  }
};

let validUserName = (username) => {
  if (!username){
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
};

//Username validators
const userNameValidators = [
  {
    validator: userNameLengthChecker, message: 'Username length must be at least 5 characters but no more than 15.'
  },

  {
    validator: validUserName, message: 'Username is not valid!'
  }
];

//email Valdator
const emailValidators = [
  {
    validator: emailLengthChecker, message: 'Email must be at least 5 characters but no more than 30'
  },

  {
    validator: validEmailChecker, message: 'Must be a valid email!'
  }

];

// Validate Function to check password length
let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format
let validPassword = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};

// Array of Password validators
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  // Second password validator
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowecase: true, validate: userNameValidators },
  password: { type: String, required: true, validate: passwordValidators }
});

//Schema middleware to encrypt password
userSchema.pre('save', function(next) {
  if (!this.isModified('password'))
  return next();

//apply encryption
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

module.exports  = mongoose.model('User', userSchema);

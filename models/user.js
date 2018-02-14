const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const passwordRegex= (password) => {
  if(!password) {
    return false
  } else {
    const regEx = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    console.log(regEx.test(password));
    console.log(password);
    return regEx.test(password);
  }
}

const passwordValidator = [
  {
    validator: passwordRegex,
    message: 'Password Must contain at least: one digit, one lower case, one upper case and one special character'
  }
]

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

      var UserSchema = new Schema({
        username: {
          type: String,
          lowercase: true,
          required: true,
          unique: true,
          match: [/^[a-zA-Z0-9]{4,10}$/, 'Username must not have special characters'],
          minlength: [5, 'Username must be at least 5 characters'],
          maxlength: [15, 'Username cannot be more than 15 characters']
        },
        email: {
          type: String,
          lowercase: true,
          match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please Enter a valid Email'],
          required: true,
          unique: [true, 'Email already being used']
        },
        password: {
          type: String,
          required: true,
          minlength: [8, 'Password must be at least 8 characters'],
          validate: passwordValidator
        },
        isAdmin: {
          type: Boolean,
          required: true,
          default: false
        },
        assigned: [{
          type: ObjectId,
          ref: 'ticket'
        }],
        adminedProjects: [{
          type: ObjectId,
          ref: 'Project'
        }],
      });


      // Schema Middleware to Encrypt Password
      UserSchema.pre('save', function(next) {
        // Ensure password is new or modified before applying encryption
        if (!this.isModified('password'))
          return next();

          bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(this.password, salt, (err, hash) => {
              if(err) throw err;
              this.password = hash;
          next(); // Exit middleware
        });
      });
      });


UserSchema.methods.comparePassword = (password) => {
  bcrypt.compare(password, this.password, function(err, res) {
    if(err) throw err;
    return res;
  });
};
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = (newUser, callback) => {
       newUser.save(callback);
}

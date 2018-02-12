const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

      var UserSchema = new Schema({
        username: {
          type: String,
          lowercase: true,
          required: true
        },
        email: {
          type: String,
          lowercase: true,
          match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          required: true
        },
        password: {
          type: String,
          required: true
        },
        isAdmin: {
          type: Boolean,
          required: true,
          default: false
        },
        assigned: [{
          type: ObjectId,
          ref: 'ticket'
          }]

      });


const User = module.exports = mongoose.model('User', UserSchema);

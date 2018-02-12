const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

      var ProjectSchema = new Schema({
        name: {
          type: String,
          uppercase: true,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        tickets: [{
          type: ObjectId,
          ref: 'Ticket'
        }],
      });


const Project = module.exports = mongoose.model('Project', ProjectSchema);

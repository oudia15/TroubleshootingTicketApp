const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

      var TicketSchema = new Schema({
        name: {
          type: String,
          uppercase: true,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        project: {
          type: ObjectId,
          ref: 'Project',
          required: true
        },
        assignedTo: {
          type: ObjectId,
          ref: 'User'
        },
        severity: {
          type: String,
          enum: ['low', 'medium', 'high']
          required: true
        }
      });


const Ticket = module.exports = mongoose.model('Ticket', TicketSchema);

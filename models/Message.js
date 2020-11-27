import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

const MessageSchema = new Schema({
  chatId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
},
});

export default model('Message', MessageSchema);
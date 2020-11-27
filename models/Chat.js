import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

const ChatSchema = new Schema({
    //participants format: [{
    //    userid: string,
    //    name: String
    //    }]
    participants: {
		type: Array,
		default: []
    },
    //if name is '' then use participants to get a name
    name: {
        type: String,
        default: ''
    },
});

export default model('Chat', ChatSchema);
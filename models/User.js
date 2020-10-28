import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Schema 
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	hobbies: {
		type: Array,
		default: {}
	},
	courses: {
		type: Array,
		default: {}
	}
});

export default model('User', UserSchema);
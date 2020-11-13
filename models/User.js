import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		requred: true,
	},
	bio: {
		type: String,
		default: "",
	},
	hobbies: {
		type: Array,
		default: [],
	},
	courses: {
		type: Array,
		default: [],
	},
	friends: {
		type: Array,
		default: [],
	},
});

export default model("User", UserSchema);

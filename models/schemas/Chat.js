const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = Schema({
	id: Number,
	first_name: String,
	last_name: String,
	username: String,
	type: String
});

module.exports = Chat;
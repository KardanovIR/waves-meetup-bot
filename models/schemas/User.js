const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
	id: Number,
	first_name: String,
	last_name: String,
	username: String,
	language_code: String,
	state: {}
});

module.exports = User;
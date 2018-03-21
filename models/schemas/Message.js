const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = Schema({
	message_id: Number,
	date: Number,
	text: String
});

module.exports = Message;
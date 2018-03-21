const UserSchema = require('./schemas/User');
const MessageSchema = require('./schemas/Message');
const ChatSchema = require('./schemas/Chat');
const mongoose = require('mongoose');

const User = mongoose.model('User', UserSchema);
const Chat = mongoose.model('Chat', ChatSchema);
const Message = mongoose.model('Message', MessageSchema);

module.exports = { User, Chat, Message };
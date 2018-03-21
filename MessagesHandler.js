const Models = require('./models/models');
const { createStore, combineReducers } = require('./StateManager');
const rootReducer = require('./reducers/root');
const selfieReducer = require('./reducers/selfie');

class MessagesHandler {
	
	constructor(telegramBot, mongoose) {
		this.telegram_bot = telegramBot;
		this.mongoose = mongoose;
		this.users = {};
		this.attachMainHandlers();
	}
	
	getUser(user) {
		return new Promise((resolve, reject) => {
			const options = { upsert: true, setDefaultsOnInsert: true };
			Models.User.update({}, user, options, (err) => {
					if (err) return reject(err);
					if (this.users[user.id] === undefined) {
						
						const messagesApp = combineReducers({
							root: rootReducer,
							selfie: selfieReducer
						});
						user.store = createStore(messagesApp);
					} else {
						user.store = this.users[user.id].store;
					}
					//TODO: get state from mongo
					return resolve(user);
				}
			)
		})
	}
	
	saveMessage(msg) {
		return new Promise((resolve, reject) => {
			const options = { upsert: true, setDefaultsOnInsert: true };
			Models.Message.update({}, msg, options, (err) => {
					if (err) return reject(err);
					return resolve(msg);
				}
			)
		})
	}
	
	saveChat(chat) {
		return new Promise((resolve, reject) => {
			const options = { upsert: true, setDefaultsOnInsert: true };
			Models.Chat.update({}, chat, options, (err) => {
					if (err) return reject(err);
					return resolve(chat);
				}
			)
		})
	}
	
	attachMainHandlers() {
		const bot = this.telegram_bot;
		bot.on('message', (msg) => {
			this.saveMessage({ message_id: msg.message_id, date: msg.date, text: msg.text });
			this.saveChat(msg.chat);
			
			this.getUser(msg.from)
				.then(user => {
					user.store.dispatch({ ...msg, user: user, type: msg.text })
						.then(state => {
							this.sendResponses(msg.chat, state.responses);
							this.users[user.id] = user;
						});
				})
				.catch((err) => {
					console.error(err);
				});
		})
	}
	
	sendResponses(chat, responses) {
		responses.forEach(data => {
			this.responseTo(chat, data);
		})
	}
	
	
	responseTo(chat, message) {
		this.telegram_bot.sendMessage(chat.id, message.text, message);
	}
}


module.exports = MessagesHandler;
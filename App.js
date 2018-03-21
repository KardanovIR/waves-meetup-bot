const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const MessagesHandler = require('./MessagesHandler');
const config = require('./config.json');
const mongoose = require('mongoose');

class App {
	
	constructor() {
		
		if (config.hasOwnProperty('telegram') === false) {
			throw new Error('Telegram section in config.json is required');
		}
		if (config.telegram.hasOwnProperty('bot_token') === false) {
			throw new Error('bot_token in Telegram section of config.json is required');
		}
		if (config.hasOwnProperty('waves') === false) {
			throw new Error('Waves section in config.json is required');
		}
		if (config.waves.hasOwnProperty('private_key') === false) {
			throw new Error('private_key in Waves section of config.json is required');
		}
		this.config = config;
		this.connectToDb();
	}
	
	connectToDb(){
		this.mongoose = mongoose.connect('mongodb://localhost/' + this.config.mongo.database);
		const db = mongoose.connection;
		db.on('error', (err) => {
			console.error.bind(console, 'connection error:');
			throw new Error(err);
		});
		
		db.once('open', () => {
			this.start();
		});
	}
	
	async applyConfig(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
				if (err) return reject(err);
				this.config = JSON.parse(data);
				resolve(this.config);
			})
		})
	}
	
	attachWatcher() {
	
	}
	
	start() {
		console.log('[START]');
		this.telegramBot = new TelegramBot(this.config.telegram.bot_token, { polling: true });
		this.msgHandler = new MessagesHandler(this.telegramBot, this.mongoose);
	}
}


module.exports = App;
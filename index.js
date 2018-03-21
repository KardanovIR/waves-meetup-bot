const App = require('./App');
const DEXWatcher = require('./watchers/DEXWatcher');
const QuestionsWatcher = require('./watchers/QuestionsWatcher');
const WavesTransactionsWatcher = require("./watchers/WavesTransactionsWatcher");
const TwitterWatcher = require("./watchers/TwitterWatcher");


const app = new App();

app.applyConfig('./config.json')
	.then((settings) => {
		const wDEX = new DEXWatcher();
		const wQuestions = new QuestionsWatcher();
		const wWavesTx = new WavesTransactionsWatcher();
		const wTwitter = new TwitterWatcher();
		
		
		app.attachWatcher(wDEX);
		app.attachWatcher(wQuestions);
		app.attachWatcher(wWavesTx);
		app.attachWatcher(wTwitter);
	})
	.catch(err => {
		throw err;
	});
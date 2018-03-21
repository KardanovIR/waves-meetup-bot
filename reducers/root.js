const STATE_START = '/start';
const STATE_HELP = '/help';
const STATE_CHANGE_ADDRESS = '/change_address';
const STATE_REQUEST_AN_ADDRESS = 'REQUEST_AN_ADDRESS';
const STATE_READY_TO_START = 'READY_TO_START';
const WavesSDK = require('../WavesSDK');
const Responses = require('./responses');

const WSDK = new WavesSDK();

const main = (state = [], action) => {
	return new Promise((resolve, reject) => {
		switch (action.type) {
			case STATE_START: {
				resolve({
					history: state,
					type: STATE_REQUEST_AN_ADDRESS,
					responses: [
						Responses.getByKey(STATE_START, action.user),
						Responses.getByKey(STATE_REQUEST_AN_ADDRESS),
					]
				});
				return
			}
			case STATE_HELP: {
				resolve(state);
				return
			}
			case STATE_CHANGE_ADDRESS: {
				resolve({
					history: state,
					type: STATE_REQUEST_AN_ADDRESS,
					responses: [
						Responses.getByKey(STATE_REQUEST_AN_ADDRESS),
					]
				});
				return
			}
			
			default: {
				//only if we're waiting for the address
				if (state.type === STATE_REQUEST_AN_ADDRESS) {
					WSDK.validateAddressOrAlias(action.text)
						.then(res => {
							if (res.valid !== false) {
								resolve({
									history: state,
									type: STATE_READY_TO_START,
									address: res,
									responses: [
										Responses.getByKey("READY_TO_START"),
									]
								});
							} else {
								resolve({
									history: state,
									type: STATE_REQUEST_AN_ADDRESS,
									responses: [
										Responses.getByKey("ERROR_IN_ALIAS")
									]
								});
							}
						})
						.catch(err => {
							console.error(err);
							reject({
								history: state,
								type: STATE_REQUEST_AN_ADDRESS,
								responses: [
									Responses.getByKey("REQUEST_AN_ADDRESS_2"),
								]
							});
						});
				}
			}
		}
	});
};


module.exports = main;
const STATE_WAITING_FOR_SELFIE = 'WAITING_FOR_SELFIE';
const STATE_READY_TO_START = 'READY_TO_START';

const Responses = require('./responses');


const selfie = (state = [], action) => {
		return new Promise((resolve, reject) => {
			switch (action.type) {
				case STATE_READY_TO_START: {
					resolve({
						history: state,
						type: STATE_WAITING_FOR_SELFIE,
						responses: [
							Responses.getByKey('WAITING_FOR_SELFIE', action.user)
						]
					});
					return;
				}
				default: {
					resolve(state);
				}
			}
		});
	}
;


module.exports = selfie;
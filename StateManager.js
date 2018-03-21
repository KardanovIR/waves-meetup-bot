const createStore = (reducer) => {
	let state;
	let listeners = [];
	
	
	const getState = () => state;
	
	const dispatch = (action) => {
		return new Promise((resolve, reject) => {
			reducer(state, action)
				.then(newState => {
					state = newState;
					resolve(state);
				});
		})
	};
	
	
	dispatch({});
	
	return { getState, dispatch }
};

const combineReducers = (reducers) => {
	return (state = {}, action) => {
		
		const promiseSerial = functions => functions.reduce((promise, func) =>
				promise.then(result => func().then(Array.prototype.concat.bind(result))),
			Promise.resolve([])
		);
		
		
		const reducerCalls = Object.keys(reducers).map((key) => () => {
			reducers[key](state[key], action);
		});
		
		promiseSerial(reducerCalls)
			.then(console.log.bind(console))
			.catch(console.error.bind(console))
	};
};

module.exports = { createStore, combineReducers };
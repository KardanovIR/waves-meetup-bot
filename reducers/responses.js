const responses = () => {
	
	const WEB_VERSION_URL = 'https://beta.wavesplatform.com/';
	const APP_STORE_URL = 'https://itunes.apple.com/us/app/waves-wallet/id1233158971?mt=8';
	const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.wavesplatform.wallet&hl=en';
	
	const getByKey = (key, data = {}) => {
		const options = {
			"/start": {
				text: `Yay! Howdy, ${data.first_name}? Nice to meet you! I am a meetup bot and I am going to play with you! :) I can give you some opportunities to communicate with other attendees. Let's make good networking today!`
			},
			"ERROR_GENERAL": {
				text: "Whoops... Looks like there are some problems with my head. Give some time to rest, please."
			},
			"REQUEST_AN_ADDRESS": {
				text: "Send me your WAVES address or alias to start the game! You can get it from Waves Mobile App or Web version.",
				reply_markup: {
					inline_keyboard: [
						[{ text: 'Google Play', url: GOOGLE_PLAY_URL }],
						[{ text: 'App Store', url: APP_STORE_URL }],
						[{ text: 'Web version', url: WEB_VERSION_URL }]
					]
				}
			},
			"REQUEST_AN_ADDRESS_2": {
				text: "I really need your WAVES address! PLEASE, send me your waves address or alias to start the game! You can get it from Waves Mobile App or Web version. You can request /help at any time."
			},
			"WAITING_FOR_SELFIE": {
				text: "Alright, first of all I need your selfie! \n\n "
			},
			"ERROR_IN_ALIAS": {
				text: "Hm, I can't find the address. Send me your WAVES address or alias to start the game! You can get it from Waves Mobile App or Web version.",
				reply_markup: {
					inline_keyboard: [
						[{ text: 'Google Play', url: GOOGLE_PLAY_URL }],
						[{ text: 'App Store', url: APP_STORE_URL }],
						[{ text: 'Web version', url: WEB_VERSION_URL }]
					]
				}
			},
			"READY_TO_START": {
				text: "Yeah, got it! We can start our game right now! If you want to change your address just send me command /change_address",
			}
		};
		
		return options[key];
	};
	
	return { getByKey }
};

module.exports = responses();
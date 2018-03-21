const restler = require('restler');

class WavesSDK {
	
	
	constructor() {
		this.NODE = 'http://nodes.wavesnodes.com';
	}
	
	async validateAddressOrAlias(address) {
		return new Promise((resolve, reject) => {
			restler
				.json(`${this.NODE}/addresses/validate/${address}`)
				.on('complete', (res) => {
					console.log(typeof res);
					if (res instanceof Error) {
						reject(res);
					} else {
						if (res.valid === true) {
							resolve(address)
						} else {
							restler
								.json(`${this.NODE}/alias/by-alias/${address}`)
								.on('complete', (res) => {
									if (res instanceof Error) {
										reject(res.address);
									} else {
										resolve(res)
									}
								});
						}
					}
				});
		});
	};
}

module.exports = WavesSDK;
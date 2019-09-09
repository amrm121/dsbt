var discord = require('./discord'),
	mp = require('./mp');

const axios = require('./axios.js');

mp();
axios();
discord();
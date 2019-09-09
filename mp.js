var mercadopago = require('mercadopago');
var colors = require('colors');

function mp(){
	mercadopago.configure({
		sandbox: true,
		access_token: 'TEST-1313730632078117-090411-229081d81388a1f5f2e601c7d75f9aa7-465684785'
	});

}

module.exports = mp;

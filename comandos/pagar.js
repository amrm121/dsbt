const request = require('request');
const util = require('../util/util.js');

exports.run = async (client, message) => {
    let url = 'https://api.hgbrasil.com/finance?format=json&key=a67d9b60';
    request(url, (err, response, body) => {
        if(err) console.log(err);
        else {
            let data = JSON.parse(body);
            message.channel.send({embed: {
                color: util.getRandonColor(),
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Valor atual do dolar:",
                description: `Dolar: ${data.results.currencies.USD.buy.toString().substring(0, 4)}`,
                thumbnail: {
                    url: "https://banner2.kisspng.com/20180426/zyq/kisspng-dollar-sign-united-states-dollar-logo-5ae1b0e9558cc3.4594985215247403293504.jpg"
                },
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.username,
                },
                timestamp: new Date()
            }});
        }
    });
}
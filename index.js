const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
var axios = require('axios');
var mercadopago = require('mercadopago');
var colors = require('colors');
var config = require('./config.json');
var oldAccessToken = mercadopago.configurations.getAccessToken();
//bot.commands = new Discord.Collection(); -> Adicionar module.exports bot?

/*
Carregar DB
*/


//Carregando Eventos
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});


client.commands = new Enmap();
//Carregando os comandos
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./events/${file}`);
        let commandName = file.split(".")[0];
        console.log(`> Carregando comando:  [${commandName}]`);
        client.commands.set(commandName, props);
    });
});

client.on('error', error => {
    console.log(error);
});



client.login('NjE4Njk3NDg5ODAxMDE5Mzky.XW-ODA.WndIGzWaMP7EpJYqKZF3BmodZ-Q');
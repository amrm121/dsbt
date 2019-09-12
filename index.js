const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const express = require('express');
var colors = require('colors');
var config = require('./config.json');
client.config = config;
//bot.commands = new Discord.Collection(); -> Adicionar module.exports bot?

/*
Carregar DB
*/

var app = express();

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
fs.readdir("./comandos/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./comandos/${file}`);
        let commandName = file.split(".")[0];
        console.log(`> Carregando comando:  [${commandName}]`);
        client.commands.set(commandName, props);
    });
});

client.on('error', error => {
    console.log(error);
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('servidor boot rodando...')
});


client.login('NjE4Njk3NDg5ODAxMDE5Mzky.XW-ODA.WndIGzWaMP7EpJYqKZF3BmodZ-Q');
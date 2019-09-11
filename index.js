const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
const express = require('express');
var axios = require('axios');
var mercadopago = require('mercadopago');
var colors = require('colors');
var config = require('./config.json');
var oldAccessToken = mercadopago.configurations.getAccessToken();
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
    if(err) console.log(err);

    let arquivosjs = files.filter(f => f.split(".").pop() == "js");
    arquivosjs.forEach((f,i) => {
        let props = require(`./comandos/${f}`);
        console.log(`comandos ${f} carregadores com sucesso.`)
        //push num BD?
        client.commands.set(props.help.name.props);

    })

});

client.on('error', error => {
    console.log(error);
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('servidor boot rodando...')
});


client.login('NjE4Njk3NDg5ODAxMDE5Mzky.XW-ODA.WndIGzWaMP7EpJYqKZF3BmodZ-Q');
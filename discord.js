const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
var colors = require('colors');

axios.create({
  baseURL: 'https://api.mercadopago.com'
});

/*
var = urlBase
Var(var) => {
    axios.get('path')
}
*/

function discord(){
    client.on('message', (receivedMessage) => {
        if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
            return
        }

        if (receivedMessage.content.startsWith("!")) {
            processCommand(receivedMessage)
        }
    })
} 



function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log(("Command received: " + primaryCommand).red);
    console.log(("Arguments: " + arguments).red) // There may not be any arguments

    if (primaryCommand == "pagar") {
        pagar(arguments, receivedMessage);
    } else if (primaryCommand == "outra") {
        teste(arguments, receivedMessage);
    } else {
        receivedMessage.channel.send("!pagar ou !outra")
    }
}



async function pagar(arguments, receivedMessage) {
    if (arguments.length > 0) {
        var args = Array.from(arguments);
        var st = "";
        let ind = 0;
        for(ind in args){
            st += "/" + args[ind++];
        }
        //EMAIL CARTAO CPF
        //console.log((args[0]).red);
        const response = await axios.get('/v1/payments?access_token=TEST-1313730632078117-090411-229081d81388a1f5f2e601c7d75f9aa7-465684785');
        console.log(response);
        receivedMessage.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "This is an embed",
    url: "http://google.com",
    description: "This is a test embed to showcase what they look like and what they can do.",
    fields: [{
        name: "Fields",
        value: "They can have different fields with small headlines."
      },
      {
        name: "Masked links",
        value: "You can put [masked links](http://google.com) inside of rich embeds."
      },
      {
        name: "Markdown",
        value: "You can put all the *usual* **__Markdown__** inside of them."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Example"
    }
  }
});
        receivedMessage.channel.send("args: " + st);
    } else {
        receivedMessage.channel.send("as: " + receivedMessage + " - - ")
    }
}

function teste(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("ra")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

client.login('NjE4Njk3NDg5ODAxMDE5Mzky.XW-ODA.WndIGzWaMP7EpJYqKZF3BmodZ-Q');

module.exports = discord;
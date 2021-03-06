const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap');
var axios = require('axios');
var mercadopago = require('mercadopago');
var colors = require('colors');
var config = require('./config.json');
var oldAccessToken = mercadopago.configurations.getAccessToken();
bot.commands = new Discord.Collection();

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



//Carregando os comandos
fs.readdir("./comandos/", (err, files) => {
    if(err) console.log(err);

    let arquivosjs = files.filter(f => f.split(".").pop() == "js");
    arquivosjs.forEach((f,i) => {
        let props = require(`./comandos/${f}`);
        console.log(`comandos ${f} carregadores com sucesso.`)
        //push num BD?
        bot.commands.set(props.help.name.props);

    })

});






// comand  de base  !!
/*
var = urlBase
Var(var) => {
    axios.get('path')
}
*/
// var payment = {
//     description: 'Buying a PS4',
//     transaction_amount: 10500,
//     payment_method_id: 'rapipago',
//     payer: {
//       email: 'test_user_3931694@testuser.com',
//       identification: {
//         type: 'DNI',
//         number: '34123123'
//       }
//     }
// };

// exports.run = function (req, res) {
//   mercadopago.configurations.setAccessToken(config.access_token);

//   mercadopago.payment.create(payment).then(function (data) {
//     console.log(data).yellow;

//   }).catch(function (error) {
//     console.error(error).green;
//   }).finally(function() {
//     mercadopago.configurations.setAccessToken(oldAccessToken);
//   });
// };

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
    try{
            if (arguments.length > 0) {
                var args = Array.from(arguments);
                var st = "";
                let ind = 0;
            for(ind in args){
                st += "|" + args[ind++];
            }
            //EMAIL CARTAO CPF
            //console.log((args[0]).red);
            //const response = await axios.post('/v1/payments?access_token=TEST-1313730632078117-090411-229081d81388a1f5f2e601c7d75f9aa7-465684785');
            //console.log(response).green;
            email = ''
            senha = ''
            receivedMessage.channel.send(email + st + senha);
        } else {
            receivedMessage.channel.send("as: " + receivedMessage + " email|senha ")
        }
    }catch(error){
        console.error(error)
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
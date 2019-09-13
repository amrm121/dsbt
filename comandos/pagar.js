const request = require('request');
const payer = require('../payer.json')
const util = require('../util/util.js');
const axios = require('axios');
var express = require('express');
var cors = require('cors');
var config = require('../config.json')
var mercadopago = require('mercadopago');

var app = express();

var corsOptions = {
  origin: 'https://api.mercadopago.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



   /* src="https://www.mercadopago.com.br/integrations/v1/web-tokenize-checkout.js"
    data-public-key="ENV_PUBLIC_KEY"
    data-transaction-amount="100.00"> */

//Os campos obrigatórios para envio são o token, transaction_amount, payment_method_id e o payer.email.

let preference = {
  items: [
    {
      title: 'Exemplo',
      unit_price: 100,
      quantity: 1,
    }
  ]
};
var pid = '';
mercadopago.preferences.create(preference)
.then(function(res){
// Este valor substituirá a string "$$init_point$$" no seu HTML
    pid = res.body.id;
    console.log(pid);
    
    
    
  //console.log(error);
  //global.init_point = response.body.init_point;
}).catch(function(error){
  console.log(error);
});

var payment = {
  description: 'Buying a PS4',
  transaction_amount: 10500,
  payment_method_id: 'rapipago',
  payer: {
    email: 'test_user_3931694@testuser.com',
    identification: {
      type: 'DNI',
      number: '34123123'
    }
  }
};



/*
mercadopago.payment.create({
  description: 'Buying a PS4',
  transaction_amount: 10500,
  payment_method_id: 'visa',
  access_token: 'TEST-5912165670143479-090907-ced34daa9a77ad1c47f02274de5a0d4d-9796544',
  token : "b3a7dbec3eb0d71798c4f19fec445795",
  payer: {
    email: 'test_user_3931694@testuser.com',
    identification: {
      type: 'DNI',
      number: '34123123'
    }
  }
}).then(function (mpResponse) {
  console.log(mpResponse);
}).catch(function (mpError) {
  console.log(mpError);
});*/

mercadopago.payment.create(payment, {
  access_token: 'TEST-5912165670143479-090907-ced34daa9a77ad1c47f02274de5a0d4d-979654',
}).then(function (mpResponse) {
    console.log(mpResponse);
});


exports.run = async (client, message) => {
    axios.post('https://api.mercadopago.com/v1/advanced_payments', {
        url: `/users/${pid}/test_user?access_token=TEST-5912165670143479-090907-ced34daa9a77ad1c47f02274de5a0d4d-9796544`,
        headers: 'Content-Type: application/json',
        data: {
             site_id: 'MLB'
        }
    })
    .then(function(response){
        message.channel.send(JSON.stringify(response.data));
    })
    .catch(function(error){        
        console.log(error);
    });
    //message.channel.send(JSON.stringify(payer));
}


/*exports.run = async (client, message) => {
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
}*/

function getBin() {
  const cardnumber = document.getElementById("cardnumber");
  return cardnumber.substring(0,6);
}

function guessingPaymentMethod(event) {
    var bin = getBin();

    if (event.type == "keyup") {
        if (bin.length >= 6) {
            window.Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethodInfo);
        }
    } else {
        setTimeout(function() {
            if (bin.length >= 6) {
                window.Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethodInfo);
            }
        }, 100);
    }
};

function setPaymentMethodInfo(status, response) {
    if (status == 200) {
        const paymentMethodElement = document.querySelector('input[name=paymentMethodId]');

        if (paymentMethodElement) {
            paymentMethodElement.value = response[0].id;
        } else {
            const input = document.createElement('input');
            input.setattribute('name', 'paymentMethodId');
            input.setAttribute('type', 'hidden');
            input.setAttribute('value', response[0].id);     

            form.appendChild(input);
        }
    } else {
        alert(`payment method info error: ${response}`);  
    }
};


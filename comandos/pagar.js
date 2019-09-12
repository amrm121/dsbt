const request = require('request');
const axios = require('axios');
const util = require('../util/util.js');

axios.create({
    BaseURL: " https://api.mercadopago.com/v1/advanced_payments";
})



axios({
  method: 'post',
  url: '',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});


   /* src="https://www.mercadopago.com.br/integrations/v1/web-tokenize-checkout.js"
    data-public-key="ENV_PUBLIC_KEY"
    data-transaction-amount="100.00"> */

//Os campos obrigatórios para envio são o token, transaction_amount, payment_method_id e o payer.email.

exports.run = async (client, message) => {
    let url = 
    let data = JSON.parse()

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


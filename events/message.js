module.exports = (client, message) => {    

    if (message.author.bot) return; //ignora msgs do bot
    if (message.content.indexOf(client.config.prefix) !== 0) return; //ignora as mensagens que n tem prefix
    

    console.log(message);

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    
    const cmd = client.commands.get(command);
    
    if (!cmd) return;
    
    cmd.run(client, message, args);
};
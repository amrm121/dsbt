module.exports = async client => {
    client.user.setActivity(`Digite: ${client.config.prefix}help`);
    // client.user.setActivity(`under maintenance`);
    console.log(`> Bot iniciado em [${client.guilds.size}] servidores`);
}
module.exports = async client => {
    client.user.setActivity(`p a y m`);
    // client.user.setActivity(`under maintenance`);
    console.log(`> Bot iniciado em [${client.guilds.size}] servidores`);
}
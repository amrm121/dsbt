exports.getRandonColor = () => {
    return Math.floor(Math.random() * 9999999);
}
exports.getDefaultChannel = guild => {
    try {
        // get "original" default channel
        if(guild.channels.has(guild.id))
        return guild.channels.get(guild.id)
        
        // Check for a "general" channel, which is often default chat
        const generalChannel = guild.channels.find(channel => channel.name === "general" || channel.name === "geral");
        if (generalChannel)
        return generalChannel;
        // Now we get into the heavy stuff: first channel in order where the bot can speak
        // hold on to your hats!
        return guild.channels
        .filter(c => c.type === "text" &&
        c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
        .sort((a, b) => a.position - b.position ||
        Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
        .first();
        
    } catch (error) {
        console.log(error);
    }
}
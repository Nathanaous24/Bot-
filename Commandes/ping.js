
module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",
    ownerOnly: false,
    permission: "Aucune",
    ownerOnly: false,
    category: "Informations",
    dm: true,
    
    async run(bot, interaction) {

        await interaction.reply(`Ping : \`${bot.ws.ping}\` ms`);
    },
};
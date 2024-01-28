const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

    const ownerId = "704008039266517004";

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()


    if(interaction.commandName === "setantiraid" || interaction.commandName === "setantispam" || interaction.commandName === "memberrole" || interaction.commandName === "setlogs"  || interaction.commandName === "setchatgpt") {
    
        let choices = ["on", "off"]
        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
    }

    if(interaction.commandName === "translate") {

        let choices = ["en", "fr"]
        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))

    }
}

        if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        if (command.ownerOnly && interaction.user.id != ownerId) return await interaction.reply('Seul le développeur du bot peut utiliser cette commande !');
        command.run(bot, interaction, interaction.options, bot.db)
    }
}
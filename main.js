const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const config = require("./config")
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
/////////////////////////////////////////////////////////////////////////////////////

bot.commands = new Discord.Collection()
bot.color = "#2268b1";

/////////////////////////////////////////////////////////////////////////////////////

bot.login(config.token);

/////////////////////////////////////////////////////////////////////////////////////

process.on('unhandledRejection', error => {
    if (error.name === "DiscordAPIError[10062]") return;
    else console.error('Unhandled promise rejection:', error);
});

/////////////////////////////////////////////////////////////////////////////////////

loadCommands(bot)
loadEvents(bot)

/////////////////////////////////////////////////////////////////////////////////////

console.log("Le main.js a était chargé avec succès !")
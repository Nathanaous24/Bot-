const Discord = require ("discord.js")
const config = require("../config")
const { Configuration, OpenAIApi } = require("openai");

module.exports = async(bot, message) => {

    if(message.channel.id === "1176214824460501152") {
        const configuration = new Configuration({
            apiKey: (config.apiKey),
        });

        const openai = new OpenAIApi(configuration);
        try {
            if (message.author.bot) return;
            await message.channel.sendTyping()
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${message.content}`,
                temperature: 0.9,
                max_tokens: 1000,
            });

            if (response.data.choices[0].text.trim() !== '') {
                message.reply(`${response.data.choices[0].text}`);
            }
            return;
        } catch (e) {
            console.log(e)
        }
    }
}
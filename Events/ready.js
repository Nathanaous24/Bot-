const Discord = require("discord.js")
const { Client, GatewayIntentBits, ActivityType } = require('discord.js') 
const DBD = require("discord-dashboard")
const Theme = require("dbd-capriham-theme")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const config = require("../config")
const loadDatabase = require("../Loaders/loadDatabase")


module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function () {

        console.log("Base de donnée connectée avec succès !")
    })

    await loadSlashCommands(bot);

    const activities = [
        { name: `${bot.guilds.cache.size} Serveurs`, type: 3 }, 
        { name: `${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Membres`, type: 3 }, 
    ];


    const status = [
        'dnd'
    ];
    let i = 0;
    setInterval(() => {
        if(i >= activities.length) i = 0
        bot.user.setActivity(activities[i])
        i++;
    }, 5000);
    
    let s = 0;
    setInterval(() => {
        if(s >= activities.length) s = 0
        bot.user.setStatus(status[s])
        s++;
    }, 30000);

    let allcommands = [];
    await bot.commands.forEach(command => allcommands.push({commandName: command.name, commandUsage: command.utilisation, commandDescription: command.description}))

    console.log(`${bot.user.tag} est bien en ligne !`)

    await DBD.useLicense(config.license)
    DBD.Dashboard = DBD.UpdatedClass()

    const Dashboard = new DBD.Dashboard({

        port: 8080,
        client: {
            id: bot.user.id,
            secret: (config.secret) 
        },
        redirectUri: "https://localhost:8080/discord/callback",
        domain: "https://localhost",
        useCategorySet: true,
        minimalizedConsoleLogs: true,
        acceptPtivacyPolicy: true,
        bot: bot,
        theme: Theme({
            websiteName: "Dashboard de Anti Raid",
            iconURL: "https://www.noelshack.com/2022-49-7-1670772431-png-clipart-internet-bot-command-discord-twitch-flappy-bird-chatbot-logo-online-chat.png",
            index: {
                card: {
                    title: "Anti Raid est un bot de modératon",
                    description: "Ajoute le ;)"
                },
                 information: {
                    title: "Informations",
                    description: "Anti Raid a tout pour vous plaire",
                },
                feeds: {
                    title: "Feeds",
                    list: [
                        {
                            icon: "fa fa-house",
                            text: "New user registered",
                            timetext: "Just now",
                            bg: "bg-light-info"
                        },
                        {
                            icon: "fa fa-server",
                            text: "Server issues",
                            timetext: "3 minutes ago",
                            bg: "bg-light-danger"
                        }
                    ]
                }
            },
            commands: {
                pageTitle: "Commandes",
                table: {
                    title: "Toutes les commandes",
                    subTitle: "La liste des commandes",
                    list: allcommands
                }
            }
        }),
        settings: [
            
            {
                categoryid: "admin",
                categoryName: "Administration",
                categoryDescription: "Gère le module d'administration",
                getActualSet: async ({guild}) => {
                    const antispam = new Promise((resolve, reject) => {
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].antispam === "true") ? resolve(true): resolve(false)
                        })
                    })
                    return await [{optionId: "antispam", data: await antispam}]
                },
                setNew: async ({guild, data}) => {
                    for(let i = 0; i < data.length; i++) {
                        bot.db.query(`UPDATE server SET ${data[i].optionId} = '${data[i].data}' WHERE guild = ${guild.id}`)
                    }
                },
                categoryOptions: [
                    {
                        optionId: "antispam",
                        optionName: "AntiSpam",
                        optionDescriptions: "Active ou désactive l'antispam",
                        optionType: DBD.formTypes.switch(false)
                    }
                ]
            }
        ]
    })

    Dashboard.init()
}

console.log("Le ready.js a était chargé avec succès !")
console.log("Le dashboard a était chargé avec succès !")
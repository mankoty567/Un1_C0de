const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("./Data/botconfig.json");
//import de la base de donnée, écriture de fichier et API discord.
module.exports.run = async (bot, message, args) => {
    message.delete();//suppression de la commande
    if (!message.member.hasPermission('ADMINISTRATOR')) message.channel.send(":arrow_forward: Vous ne disposez pas des permissions requises pour cette commande.");
    //sécurité si l'utilisateur n'a pas de permission d'administrateur
    else if (!args[0]) message.channel.send(":arrow_forward: Merci d'entrer un channel pour les logs.");
    //sécurité si l'utilisateur oublie de préciser le channel visé
    else if (!message.guild.channels.find("name", args[0]).id) message.channel.send(`:arrow_forward: Channel ${args[0]} introuvable.`);
    //si jamais le channel est introuvable, sécurité
    else {
        botconfig.log = message.guild.channels.find("name", args[0]).id;
        fs.writeFile("./commands/Data/botconfig.json", JSON.stringify (botconfig, null, 4), err => {
          if (err) throw err;
        });
        message.channel.send(`:arrow_forward: Channel de log définit sur ${args[0]}`);
    }//change dans le fichier config le channel de log


}

module.exports.help = {
    name: "setlog"//nom de la commande dans le répertoire
}

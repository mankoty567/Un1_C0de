const Discord = require("discord.js");
//import de l'API discord
const botconfig = require("./Data/botconfig.json");//import de la base de donnée de configuration
const data = require("./Data/data.json");//import de la base de donnée de donnée d'utilisateur

module.exports.run = async (bot, message, args) => {
  message.delete();
    if ( message.guild.members.find("nickname", args[0]) || bot.users.find("username", args[0])){
      //vérification de l'existence de la personne
      if (bot.users.find("username", args[0])) {
        var cible = bot.users.find("username", args[0]).id;
        var cible = message.guild.members.find("id", cible)
      }
      else var cible = message.guild.members.find("nickname", args[0]);
      var log = bot.channels.get(botconfig.log);
      log.send(`:arrow_forward: ${message.author} vient de warn ${args[0]} pour la raison ${args.slice(1).join(" ")}`);
      data[message.member.id].nbwarn = data[message.member.id].nbwarn + 1
      fs.writeFile("./commands/Data/data.json", JSON.stringify (data, null, 4), err => {
        if (err) throw err;
      });//permet d'augmenter le nombre d'avertissement de 1
    }
    else if (!message.guild.members.find("nickname", args[0])) message.channel.send(`:arrow_forward: L'utilisateur ${args[0]} n'a pas été trouvé!`);
    //vérifie si la personne existe
    else if (!args[1]) message.channel.send(`:arrow_forward: Merci d'indiquer la raison du warn.`);
    //vérifie si la personne donne une raison
}

module.exports.help = {
    name: "warn"//nom de la commande dans le répertoire
}

const Discord = require("discord.js");
const fs = require('fs');
const data = require("./Data/data.json");
const botconfig = require("./Data/botconfig.json");//import de la base de donnée de configuration
//import de la base de donnée, écriture de fichier et API discord.

module.exports.run = async (bot, message, args) => {
  message.delete();//suppression de la commande du message
  if (!message.member.hasPermission('MANAGE_ROLES')) message.channel.send(":arrow_forward: Vous n'avez pas les droits requis pour cette commande!");
  //sécurité si la personne ne peut pas changer les rôles
  else {
    if ( message.guild.members.find("nickname", args[0]) || bot.users.find("username", args[0])){
      //Vérification de si la personne ciblé existe
      if (bot.users.find("username", args[0])) {
        var cible = bot.users.find("username", args[0]).id;
        var cible = message.guild.members.find("id", cible)
      }
      else var cible = message.guild.members.find("nickname", args[0]);
      var log = bot.channels.get(botconfig.log);
      cible.removeRole(message.member.guild.roles.find("name", "muet"));
      log.send(`:arrow_forward: ${message.author} vient de pardonner ${args[0]} pour la raison ${args.slice(1).join(" ")}`);
      data[message.member.id].nbwarn = 0
      fs.writeFile("./commands/Data/data.json", JSON.stringify (data, null, 4), err => {
        if (err) throw err;
      });//recherche de la cible, retrait du nombre d'avertissement et renvoi de la raison du pardon dans le channel de log
    }
    else if (!message.guild.members.find("nickname", args[0])) message.channel.send(`:arrow_forward: L'utilisateur ${args[0]} n'a pas été trouvé!`);
    //sécurité si l'utilisateur n'existe pas
    else if (!args[1]) message.channel.send(`:arrow_forward: Merci d'indiquer la raison du pardon.`);
    //sécurité si aucune raison n'est indiqué
  }
}

module.exports.help = {
    name: "pardon"//nom de la commande dans le répertoire
}

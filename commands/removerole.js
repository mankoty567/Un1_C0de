const Discord = require("discord.js");
//import de l'API discord
const botconfig = require("./Data/botconfig.json");//import de la base de donnée de configuration

module.exports.run = async (bot, message, args) => {
  message.delete();//suppression du message
  if (!message.member.hasPermission('MANAGE_ROLES')) message.channel.send(":arrow_forward: Vous n'avez pas les droits requis pour cette commande!");
//sécurité si la personne ne peut pas changer les rôles
  else {
    if ( message.guild.members.find("nickname", args[0]) || bot.users.find("username", args[0]) && message.member.guild.roles.find("name", args[1]) ){
      //vérifie si la personne existe
      if (bot.users.find("username", args[0])) {
        var cible = bot.users.find("username", args[0]).id;
        var cible = message.guild.members.find("id", cible)
      }
      else var cible = message.guild.members.find("nickname", args[0]);
      cible.removeRole(message.member.guild.roles.find("name", args[1]));
      var log = bot.channels.get(botconfig.log);
      log.send(`:arrow_forward: Rôle ${args[1]} retiré à l'utilisateur ${args[0]}!`)
    }
    //cherche l'utilisateur ciblé et lui retire le rôle demandé
    else if (!message.guild.members.find("nickname", args[0])) message.channel.send(`:arrow_forward: L'utilisateur ${args[0]} n'a pas été trouvé!`);
    //sécurité si l'utilisateur n'a pas été trouvé
    else if (!message.member.guild.roles.find("name", args[1])) message.channel.send(`:arrow_forward: Le rôle ${args[1]} n'a pas été trouvé!`);
    //sécurité si le rôle n'a pas été trouvé
    else if (!args[1] || args[2]) message.channel.send(":arrow_forward: Arguments entrés incorrects.");
    //s'il manque un champ entré par l'utilisateur
  }
}

module.exports.help = {
    name: "removerole"//nom de la commande dans le répertoire
}

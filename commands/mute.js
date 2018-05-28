const Discord = require("discord.js");//import de l'API discord
const botconfig = require("./Data/botconfig.json");//import de la base de donnée de configuration

module.exports.run = async (bot, message, args) => {
  message.delete();//suppression du message
  if (!message.member.hasPermission('MANAGE_ROLES')) message.channel.send(":arrow_forward: Vous n'avez pas les droits requis pour cette commande!");
  //sécurité si la personne ne peut pas changer les rôles

  else if (!args[0]) message.channel.send(`:arrow_forward: Merci d'indiquer la raison du mute.`);
  //si la personne ne donne aucune raison
  else {
    if ( message.guild.members.find("nickname", args[0]) || bot.users.find("username", args[0])){
      //vérification si l'utilisateur ciblé existe
      if (bot.users.find("username", args[0])) {
        var cible = bot.users.find("username", args[0]).id;
        var cible = message.guild.members.find("id", cible)
      }
      else var cible = message.guild.members.find("nickname", args[0]);
      cible.addRole(message.member.guild.roles.find("name", "muet"));
      var log = bot.channels.get(botconfig.log);
      log.send(`:arrow_forward: ${message.author} vient de mute ${args[0]} pour la raison ${args.slice(1).join(" ")}`);
    }//récupération de la cible et modification de son rôle en muet. Renvoie la raison du mute dans le channel de log
  else if (!message.guild.members.find("nickname", args[0]) || !bot.users.find("username", args[0])) message.channel.send(`:arrow_forward: L'utilisateur ${args[0]} n'a pas été trouvé!`);
  //si l'utilisateur n'existe pas
  }
}

module.exports.help = {
    name: "mute"//nom de la commande dans le répertoire
}

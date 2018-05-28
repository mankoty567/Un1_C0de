const Discord = require("discord.js"); //import de l'API discord
const botconfig = require("./Data/botconfig.json");//import de la base de donnée de configuration

module.exports.run = async (bot, message, args) => {
  message.delete(); //supprime le message de la commande
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
      cible.addRole(message.member.guild.roles.find("name", args[1]));
      var log = bot.channels.get(botconfig.log);
      log.send(`:arrow_forward: Rôle ${args[1]} ajouté à l'utilisateur ${args[0]}!`);
      //Vérification si la personne ciblée existe, puis recherche et changement de rôle.
    }

    else if (!message.guild.members.find("nickname", args[0])) message.channel.send(`:arrow_forward: L'utilisateur ${args[0]} n'a pas été trouvé!`);
    //sécurité si la personne n'existe pas.
    else if (!message.member.guild.roles.find("name", args[1])) message.channel.send(`:arrow_forward: Le rôle ${args[1]} n'a pas été trouvé!`);
    //sécurité si le rôle demandé n'existe pas.
    else if (!args[1] || args[2]) message.channel.send(":arrow_forward: Arguments entrés incorrects.");
    //au cas où l'utilisateur a oublié un champ.
  }
}

module.exports.help = {
    name: "addrole" //nom de la commande dans le répertoire
}

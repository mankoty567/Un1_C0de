const Discord = require("discord.js");//import de l'API discord

module.exports.run = async (bot, message, args) => {
  message.delete();//suppression de la commande
  const embed = {
  "color": 1615662,//on créé un objet spécial appelé embed qui sera lut par discord.js, donnant un bel aspect esthétique.
  "fields": [
    {
      "name": "__Liste des commandes :__",
      "value": "\n:black_small_square: !addrole <utilisateur> <rôle>\n\nPermet de modifier le rôle d'un utilisateur. Requiert la ^pssibilité de changer un rôle.\n\n:black_small_square: !help\n\nAffiche les commandes disponibles\n\n:black_small_square: !mute <utilisateur>\n\nPermet de mute un utilisateur.\n\n:black_small_square: !profile\n\nPermet d'afficher vos statistiques sur le serveur, ainsi que le nombre de warn et messages.\n\n:black_small_square: !removerole\n\nPermet de modifier le rôle d'une personne pour lui en retirer un.\n\n:black_small_square: !setlog <channel>\n\nPermet de modifier le channel de log du serveur.\n\n:black_small_square: !warn <utilisateur>\n\nPermet de rajouter un avertissement à la personne.\n\n:black_small_square: !pardon <utilisateur>\n\nPermet de retirer les warn à la personne."
    },
  ]
};
message.author.send({ embed });
}//envoi d'un message en message privé qui liste les commandes

module.exports.help = {
    name: "help"//nom de la commande dans le répertoire
}

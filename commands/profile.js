const Discord = require("discord.js");
const data = require("./Data/data.json");
//import de l'API discord et de la base de données
module.exports.run = async (bot, message, args) => {
  message.delete();//Suppression de la commande
  const embed = { //création d'un embed, objet spécial lut et traduit par discord.js pour un aspect estéthique
  "color": 1615662,
  "image": {
    "url": `${message.member.user.avatarURL}`,
    "height":200,
    "width":200
  }, //récupération de l'image de la personne
  "fields": [
    {
      "name": "__Fiche utilisateur :__",
      "value": "Cette fiche dispose de toutes les informations nécessaires."
    },
    {
      "name": "__Informations basiques :__",
      "value": `Username : ${message.author}\nNickname : ${message.member.nickname}\nId : ${message.member.id}`
    },//information basique de l'utilisateur
    {
      "name": "__Informations administratives :__",
      "value": `Nombre de warn : ${data[message.member.id].nbwarn}\nNombre de messages dans le serveur : ${data[message.member.id].nbmsg}`
    }//information administratives de l'utilisateur
  ]
};
message.channel.send({ embed });//envoi de l'objet en message sur le channel où était la commande
}

module.exports.help = {
    name: "profile"//nom de la commande dans le répertoire
}

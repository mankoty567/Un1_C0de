const botconfig = require("./commands/Data/botconfig.json");
const Discord = require("discord.js");
const data = require("./commands/Data/data.json");
const fs = require("fs");
const clientDiscord = new Discord.Client({disableEveryone: true});
//tout les imports, API nécessaires.

clientDiscord.commands = new Discord.Collection(); //Va créer un répertoire de nom de commandes

fs.readdir("./commands", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")//décompose les fichier lut uniquement par le nom sans extesion
  if(jsfile.length <= 0){
    console.log("Le fichier de commande est vide.")
    return;
  }//Sécurité au cas où le fichier de commande est vide

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} chargée!`);
    clientDiscord.commands.set(props.help.name, props);//remplis le répertoire de commande
  });
});

sansAccent = (function() { //fonction qui retire une grosse partie des accents
    var trad_re = /[¹²³áàâãäåaaaÀÁÂÃÄÅAAAÆccç©CCÇÐÐèéê?ëeeeeeÈÊË?EEEEE€gGiìíîïìiiiÌÍÎÏ?ÌIIIlLnnñNNÑòóôõöoooøÒÓÔÕÖOOOØŒr®Ršs?ßŠS?ùúûüuuuuÙÚÛÜUUUUýÿÝŸžzzŽZZ .,:;'-/()!*`]/g;
    //tout les caractères à traduire dans une variable de forme /<content>/ pour définir un genre de tableau
    var trad = {
"¹":"1","²":"2","³":"3","á":"a","à":"a","â":"a","ã":"a","ä":"a","å":"a","a":"a","a":"a","a":"a","À":"a","Á":"a","Â":"a","Ã":"a","Ä":"a","Å":"a","A":"a","A":"a",
"A":"a","Æ":"a","c":"c","c":"c","ç":"c","©":"c","C":"c","C":"c","Ç":"c","Ð":"d","Ð":"d","è":"e","é":"e","ê":"e","ë":"e","e":"e","e":"e","e":"e","e":"e",
"e":"e","È":"e","Ê":"e","Ë":"e","E":"e","E":"e","E":"e","E":"e","E":"e","€":"e","g":"g","G":"g","i":"i","ì":"i","í":"i","î":"i","ï":"i","ì":"i","i":"i",
"i":"i","i":"i","Ì":"i","Í":"i","Î":"i","Ï":"i","Ì":"i","I":"i","I":"i","I":"i","l":"l","L":"l","n":"n","n":"n","ñ":"n","N":"n","N":"n","Ñ":"n","ò":"o",
"ó":"o","ô":"o","õ":"o","ö":"o","o":"o","o":"o","o":"o","ø":"o","Ò":"o","Ó":"o","Ô":"o","Õ":"o","Ö":"o","O":"o","O":"o","O":"o","Ø":"o","Œ":"o","r":"r","®":"r",
"R":"r","š":"s","s":"s","?":"s","ß":"s","Š":"s","S":"s","?":"","ù":"u","ú":"u","û":"u","ü":"u","u":"u","u":"u","u":"u","u":"u","Ù":"u","Ú":"u","Û":"u","Ü":"u",
"U":"u","U":"u","U":"u","U":"u","ý":"y","ÿ":"y","Ý":"y","Ÿ":"y","ž":"z","z":"z","z":"z","Ž":"z","Z":"z","Z":"z"," ":"",".":"",",":"",":":"",";":"","'":"","-":"","/":"",
"(":"",")":"","!":"","*":"","`":""
};//objet qui contient toutes les traductions
    return function(s) {
        return(s.replace(trad_re, function(match){return trad[match];}) );
    }//change la chaîne en chaîne sans accent
})();


clientDiscord.on("ready", async () => {
  console.log(`${clientDiscord.user.username} est lancé!`);
  clientDiscord.user.setGame(`${clientDiscord.user.username} version 0.1b`);
}); //lorsque le bot est lancé, il définit un jeu et informe le possesseur du bot qu'il est lancé



clientDiscord.on("message", async message => { //équivaut à : quand il y a un message
  if (botconfig.mute && !message.member.guild.roles.find("name", "muet")) message.member.guild.createRole({
    name: "muet"
  });//créé un grade muet s'il n'existe pas et que l'option est activée

  if (message.member.roles.has(message.member.guild.roles.find("name", "muet").id)) {
    message.delete();
    message.author.send(":arrow_forward: Vous êtes actuellement mute, attendez d'avoir le grade retiré avant de pouvoir parler.");
  }//Si le posteur du message à le grade muet, son message est supprimé

  if(message.author.clientDiscord) return; //sécurité pour pas que le bot réagi avec lui-même
  if(message.channel.type === "dm") return; //permet d'éviter de répondre aux messages privés

  if(!data[message.member.id]){
    data[message.member.id]= {
      nbwarn: 0,
      nbmsg: 0
    } //Si l'utilisateur n'est pas dans la base de donnée , le bot créé un champ pour lui
    fs.writeFile("./commands/Data/data.json", JSON.stringify (data, null, 4), err => {
      if (err) throw err;
    });//fonction d'écriture dans la base de donnée
  }
  if (data[message.member.id].nbwarn == 5 && !message.member.roles.has(message.member.guild.roles.find("name", "muet").id)){
    message.member.addRole(message.member.guild.roles.find("name", "muet"));
    message.author.send(":arrow_forward: Au vu de vos 5 avertissements, vous avez été mute.")
  }//Si l'utilisateur a reçu 5 avertissement et n'est pas muet , au message , il se fait rendre muet

  data[message.member.id].nbmsg = data[message.member.id].nbmsg + 1
  fs.writeFile("./commands/Data/data.json", JSON.stringify (data, null, 4), err => {
    if (err) throw err;
  });//incrément du nombre de message

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let cmdsplit = cmd.split(/(?:)/u);
  let commandfile = clientDiscord.commands.get(cmd.slice(prefix.length));
  //Permet de décomposer le messages en plein de variables utiles pour les commandes

  if (cmdsplit[0] != botconfig.prefix) { //si le message n'est pas une commande
    var compteur = 0;
    var msgtraite = sansAccent(message.content).toLowerCase().split("");
    var filtre = data.filtre;
    for (i = 0; i <= Object.keys(msgtraite).length - 1; i++) {
      for (j = 0; j <= Object.keys(data.filtre).length - 1; j++){
        var mot = filtre[j].split(/(?:)/u);
        if (mot[0] == msgtraite[i]){
          var compteur = 1;
          for(k = 1; k <= mot.length - 1; k++){
//les trois boucles se basent sur : la longueur du message en caratères,la taille du filtre, la taille du mot si corrélation à la première lettre du filtre
            if(mot[k] == msgtraite[i+k]) compteur++; //si la lettre suivant corrèle, on rajoute un
            if(!mot[k] == msgtraite[i+k]) compteur = 0;
            if(Object.keys(mot).length == compteur){
              message.delete();
              data[message.member.id].nbwarn = data[message.member.id].nbwarn + 1
              fs.writeFile("./commands/Data/data.json", JSON.stringify (data, null, 4), err => {
                if (err) throw err;
              });
              message.author.send(`:arrow_forward: Vous avez pris un avertissement. Nombre total d'avertissements : ${data[message.member.id].nbwarn}`);
              //si un mot corrèle a un mot du filtre,  le message est supprimé et l'utilisateur se prend un avertissement
            }
          }
        }
        if (msgtraite[i] == "h"){
          var lien = msgtraite.slice(i,i+4);
          if (lien.join("").toLowerCase() == "http"){
          message.delete();
          data[message.member.id].nbwarn = data[message.member.id].nbwarn + 1
          fs.writeFile("./commands/Data/data.json", JSON.stringify (data, null, 4), err => {
            if (err) throw err;
          });
          message.author.send(`:arrow_forward: Vous avez pris un avertissement. Nombre total d'avertissements : ${data[message.member.id].nbwarn}`);
        } //en cas de lien de site , le message est supprimé et lutilisateur se prend un avertissement
        }
      }
    }
  }
  else if (commandfile) commandfile.run(clientDiscord,message,args);
  //si la commande corrèle avec un du répertoire
  else message.channel.send(`:arrow_forward: Commande ${cmd} spécifiée introuvable. Veuillez vérifier les commandes disponibles grâce à !help.`);
  //sinon si la commande n'est pas reconnue
});


clientDiscord.login(botconfig.token);
//le bot se connecte avec token, qui est un genre d'identifiant

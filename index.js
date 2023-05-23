/*
* Modified by DemsXD#9330
* Coded by DemsXD#9330
* Helped by DemsXD#9330
*/

const Discord = require('discord.js')
const client = new Discord.Client()
var fs = require('fs');
const exec = require('child_process').exec;
const lineReader = require('line-reader');
var randomColor = require('randomcolor');
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.clear();
console.log("GTPS Status Discord Bot Remaked by DemsXD#9330\nCoded by DemsXD#9330\nHelped by DemsXD#9330\n")

if (!fs.existsSync("appconfig.json"))
{
    let tokendiscordbot;
    let channeliddiscordbot;
    let playerfoldername;
    let worldfoldername;
    let guildfoldername;
    let regisfoldername;
    let onlineplayertxt;
    rl.question("Your Token Discord Bot = ", function(token) {
        rl.question("Your Channel Discord = ", function(channel) {
            rl.question("your players folder name = ", function(player) {
                rl.question("your worlds folder name = ", function(world) {
                rl.question("your guilds folder name = ", function(guild) {
                rl.question("your regis folder name = ", function(regis) {
                    rl.question("your online player file name = ", function(onlineplayer) {
                        rl.question("your exe gtps file name = ", function(exe) {
                        
                        rl.close();
                        fs.writeFileSync("appconfig.json", `{
                            "token" : "${token}",
                            "channel" : "${channel}",
                            "player" : "${player}",
                            "world" : "${world}",
                            "guild" : "${guild}",
                            "regis" : "${regis}",
                            "onlineplayer" : "${onlineplayer}",
                            "exegtps" : "${exe}"
                        }`)
                        console.log("GTPS Status Discord Bot Has been Setted Up!")
                        console.log("Starting Bot...")
                        start();
                        });
                        
        });
        });
        });
        });
        });
    });
});


}
else
{
    start();
}
    function start()
    {
    const config = require("./appconfig.json")
    const isRunning = (query, cb) => {
        let platform = process.platform;
        let cmd = '';
        switch (platform) {
            case 'win32' : cmd = `tasklist`; break;
            case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
            case 'linux' : cmd = `ps -A`; break;
            default: break;
        }
        exec(cmd, (err, stdout, stderr) => {
            cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
        });
    }
    
    client.on('ready', () => {
    
      console.log(`${client.user.tag} Now Is Online!`)
      client.user.setActivity('CleoPS | Server Status Up!', { type: 'STREAMING' });
    
          const statusz = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setAuthor(`CleoPS`)
        .addField('*Server Status:**', '**DOWN**')
        .addField('Players Online:', 'Please wait.')
        .setTimestamp()
        .setFooter('Last Updated');
    
        client.channels.cache.get(config.channel).send(statusz).then((msg)=> {
    
      setInterval(function(){
          var color = randomColor();
    isRunning(`${config.exegtps}`, (status) => {
        if (status == true) {
            if (!fs.existsSync(config.onlineplayer))
            {
            const f1 = fs.readdirSync(config.player).length
            const f2 = fs.readdirSync(config.world).length
            const f3 = fs.readdirSync(config.guild).length
            const f4 = fs.readdirSync(config.regis).length
            const statuszz = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
        .addField('**Server Status:**', '**UP**')
        .addField('**Players File Count: **', f1)
        .addField('**Worlds File Count: **', f2)
        .addField('**Guild File Count: **', f3)
        .addField('**ip registered File Count: **', f4)
        .setTimestamp()
        .setFooter('Last Updated');
        
            msg.edit(statuszz);
            }
            else
            {
            lineReader.eachLine(config.onlineplayer, function(line) {
            const f1 = fs.readdirSync(config.player).length
            const f2 = fs.readdirSync(config.world).length
            const f3 = fs.readdirSync(config.guild).length
            const f4 = fs.readdirSync(config.regis).length
            const statuszz = new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
            .addField('**Server Status:**', '**UP**')
            .addField('**Players Online:**', line)
            .addField('**Players File Count: **', f1)
            .addField('**Worlds File Count: **', f2)
            .addField('**Guild File Count: **', f3)
            .addField('**Ip Registered File Count: **', f4)

            .setTimestamp()
            .setFooter('Last Updated');
            msg.edit(statuszz);
    });
}
        }
        else
        {
            const f1 = fs.readdirSync(config.player).length
            const f2 = fs.readdirSync(config.world).length
            const f3 = fs.readdirSync(config.guild).length
            const f4 = fs.readdirSync(config.regis).length

            const statusz = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
        .addField('**Server Status:**', '**DOWN**')
        .addField('**Players online:**', '0')
            .addField('**Players File Count: **', f1)
        .addField('**Worlds File Count: **', f2)
        .addField('**Guild File Count: **', f3)
        .addField('**Ip Registered File Count: **', f3)

        .setTimestamp()
        .setFooter('Last Updated');
         
             msg.edit(statusz);
        }
    })
      }, 3000)
    }); 
    })
    
    client.login(config.token)
    }

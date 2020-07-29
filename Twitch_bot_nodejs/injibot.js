const tmi = require("tmi.js");
const {RCONClient} = require("rcon.js");
const request = require("request");
const util = require("util")
const pass = require("./pass")

const rconClient = new RCONClient({
    host: "127.0.0.1",
    port: 25575
});

const channel_points = {
	"timeout_somebody_else" : "9c817789-1479-4f3a-a8f0-d9f12689427e",
	"you_must_die" : "35c6eda4-78e6-4398-bb48-4180711500e0"
}

rconClient.login("password").catch((error)=>{console.log(error)})

const twitchClient = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: "injibot",
		password: pass.oauth()
	},
	channels: [ "injisera" ]
});


twitchClient.on("connected", (address, port) => {
	twitchClient.color("YellowGreen");
});

twitchClient.on("chat", (channel, tags, message, self) => {
	if(self) return;

	if("custom-reward-id" in tags){//some channel points WITH text were used

		switch(tags["custom-reward-id"]){
			
			case channel_points["timeout_somebody_else"]:
				//timeout everyone except for mods (because the bot cannot re-apply mod privilege)
				twitchClient.mods(channel)
				.then((moderator) => {//my ding ding dong goes wing wing wong
					if(!(message.toLowerCase() in moderator)){//the person about to be banned is a moderator
						//message = ""
						//str.search(regexp)
						//go through all the strings, the one who has a match => time that person out
						//then even sloppy writing should enable some banning
						twitchClient.say(channel, `/timeout ${message} 300`);
					}
				}).catch((err) => {console.log(err)});
			break;
			case channel_points["you_must_die"]:
				rconClient.command("/silent-command for _,player in pairs(game.players) do player.character.die() end")
				rconClient.command(`[color=1,0,0]${message}[/color]`)
  				.catch((err)=>{console.log(err)})
			break;
		}
	}
/*
	if("moderator" in tags.badges){

	}else if("broadcaster" in tags.badges){
		console.log("===================\ntags")
		console.log(util.inspect(tags))
	}*/
	
});

twitchClient.connect();
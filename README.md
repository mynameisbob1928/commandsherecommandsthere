# commandsherecommandsthere
Hola.

The functionality of this is simple, you can have different commands registered in different servers. some commands here, some commands there. Just like the name :3.

All that is in this project right now is a basic slash command bot with 3 premade commands (ping, stats and reply). It has the code needed to make the registering commands work and also has 3 prefix commands for admins/owners only (,addcmd/,removecmd/,help).The last thing it has is a http express server running on port 80 (can be changed) which allows each changing of what commands are in what server.

## Setup
Setup is quite simple, providing you know what you are doing.

First up: rename config.json.example to just config.json add the admins/owner ids in the ownerIds array\
Then get the .env.example and rename it to just .env . Inside that file you'll need to place just your bot's token after the `token=`.\
Also get the guilds.json.example and rename it to guilds.json\
From there just run `npm i` in your terminal, then run `node .` and it should all be working.

## Usage

### Dashboard
It can be accessable from 127.0.0.1 providing you are accessing it from the save device you are hosting it on. Other than that if it's on the same network it'll be 192.168.x.x . If it's not on the same network you'll need port forwarding I think and the ip of the device.\
A n y w a y  the main page of the dashboard is just a list of all servers that your bot is in (the cached ones at least). Clicking on one will show the commands enabled and ones you can enable/disable. After configuring to what you want, click on 'Apply commands' in the top left and it should update straight away.

You should also note that there is no security on the dashboard, so if anyone were to connect they too could change the commands avaliable.

### El bot
As I have already mentioned it comes with three premade commands. One of them is /ping which literally tells you the ping. Another is /stats which shows a bunch of stats about the bot and device (Credit to @g.spxrk for original [code](https://discord.com/channels/970775928596746290/1228343512378904617) ). The last is /reply which allows moderators to anonymously reply to users messages.\
As for the more backend stuff, the bot is able to set default commands upon joining a guild and remove when leaving. It also checks any newly joined guilds while it's offline to apply commands when starting up.\
The bot also has 3 prefix commands, again as i have already mentioned. There is ,help which shows the syntax of the three prefix commands. The ,addcmd can be used to ad commands to the server it's being run in, and can take multiple commands at once. For example `,addcmd stats ping`. The ,removecmd is basically the same but it removes commands, same syntax with multiple options commands at once.

Anyway i think thats it, anything else I may have forgotten either let me know on discord or in an issue here.

### Some images :]

![Main page](https://github.com/mynameisbob1928/commandsherecommandsthere/assets/129603125/d8d9d585-72ab-4984-b9b8-6e263c0c41d3)\
(The colour scheme is very bad i know)\
![Server page](https://github.com/mynameisbob1928/commandsherecommandsthere/assets/129603125/b47083be-8e59-49ae-8c99-b0b4a82ba96e)\
![Stats command](https://github.com/mynameisbob1928/commandsherecommandsthere/assets/129603125/833dcc99-8836-4f98-8379-b4f84e136d97)\
![Premade command list](https://github.com/mynameisbob1928/commandsherecommandsthere/assets/129603125/76779200-523b-4f70-8d20-155434cd33a8)\
![Reply command](https://github.com/mynameisbob1928/commandsherecommandsthere/assets/129603125/9b7530a3-f779-4ce3-9f8b-bdb3f7046478)\

/**
 * An example of how you can send embeds
 */

// Extract the required classes from the discord.js module
const { prefix, token } = require('./config.json');
const { Client, MessageEmbed } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});


client.on('message', message => {

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send('Who are you!?');
  }
  else if (message.content.startsWith(`${prefix}pong`)) {
    message.channel.send('Fuck you again.');
  }
  else if (message.content === `${prefix}server`) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }
  else if (message.content === `${prefix}user-info`) {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }
  else if (message.content.startsWith(`${prefix}attendance`)) {

    try {
      const CHA = message.member.voice.channel;
      const list = client.guilds.cache.get(message.guild.id);
      let memberList = list.members.cache;

      let count = 1;
      let attendance_array = '\n';
      let attendance_arrayCont = '\n';
      let absentArray = '\n';
      let absentArrayCont = '\n';
      let absentCount = 1;

      //  Set present members
      for (const member of CHA.members) {
        if (count <= 50) {
          attendance_array = attendance_array + '' + count + '. ' + member[1].displayName + '\n';
        } else {
          attendance_arrayCont = attendance_arrayCont + '' + count + '. ' + member[1].displayName + '\n';
        }
        count++;
      }

      //  Set absent members
      let updatedMemberList = filterArray(memberList, CHA.members);
      for (const arrayItem of updatedMemberList) {
        if (absentCount <= 50) {
          absentArray = absentArray + '' + absentCount + '. ' + arrayItem[1].displayName + '\n';
        } else {
          absentArrayCont = absentArrayCont + '' + absentCount + '. ' + arrayItem[1].displayName + '\n';
        }
        absentCount++;
      }
      console.log(attendance_arrayCont);
      const total_count = count - 1;
      const total_absent = absentCount - 1;

      const attendance_record = new MessageEmbed()
        .setTitle('War of Emperium Attendance:')
        .setColor(0xff0000);

      //  Check if attendance is greater than 50.
      attendance_record.addField('Online Guild Members: ' + total_count + ' Members Online', attendance_array);
      if (count > 50) {
        attendance_record.addField('Continuation...', attendance_arrayCont)
      }

      //  Check if absents are greater than 50.
      attendance_record.addField('Offline Guild Members: ' + total_absent + ' Members Offline', absentArray);
      if (absentCount > 50) {
        attendance_record.addField('Continuation...', absentArrayCont);
      }
      message.channel.send(attendance_record);
    } catch (e) {
      console.log(e);
      message.reply(' Hey! You must be in a voice channel to run this command or I will crash and stop :(');
    } finally {

    }

  }
  else if (message.content.startsWith(`${prefix}member-list`)) {

    let member_counter = 1;
    let total_members = '\n';
    const list = client.guilds.cache.get(message.guild.id);

    for (const member of list.members.cache) {
      total_members = total_members + '' + member_counter + '. ' + member[1].displayName + '\n';
      member_counter++;
    }

    const total_record = new MessageEmbed()
      .setTitle('Displaying All Guild Members:')
      .setColor(0xff0000)
      .setDescription(total_members);
    // Send the embed to the same channel as the message
    message.channel.send(total_record);

  }
  else if (message.content === `${prefix}absent-nuke`) {
    message.channel.send('Do you want me to destroy the phones of all the absent members? Yes/No');
  } else if (message.content === `${prefix}party`) {
    try {

      const selfParty = new MessageEmbed()
        .setTitle('Debauchery Tea Party - Party List')
        .setColor(0xff0000)
        .setDescription('This is still under development and will be showing up proper results soon!');

      message.channel.send(selfParty);

      let userId = message.author.id;



    } catch (error) {
      console.log(error);
    }

  } else if (command === 'organize') {
    const roleID = '835555436177522759';
    if (!args.length) {
       
        const notificationSquad = new MessageEmbed()
        .setTitle('Dungeon Party Organizer - Help')
        .setColor(0xFFFF00)
        .setDescription(`${message.author}, please refer below to properly organize a party.`)
        .addField('Dungeon Code', 'et - Endless Tower\noracle-hard - Oracle Hard\noracle-nm - Oracle Nightmare\nboc - Battle of Cake\npurga - Purgatory\nttb - Thanatos Tower • Brave\nttl - Thanatos Tower • Legend\nec - Echoing Corridor\nvr - Valhalla Ruins')
        .addField('Call Time', '<time><am/pm> (Do not include a space in between)')
        .addField('Example', '~organize oracle-nm 10am')
        .addField('Note', 'Please only use this command on #weekly-runs channel!');

        message.channel.send(notificationSquad);

    } else if (args[0] === 'oracle-nm') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing an Oracle Nightmare party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nOracle Nightmare - ${startTime}\n1. ${message.author}\n2.\n3.\n4.\n5.\n6.`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'ttb') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing a Thanatos Tower • Brave party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nThanatos Tower • Brave - ${startTime}\nFirst Party\n1. ${message.author}\n2.\n3.\n4.\n5. (Full Support)\n6. (Tank)\n\nSecond Party\n1.\n2.\n3. (Full Support)\n4. (Convert)\n5. (Tank)\n6. (High DPS)`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'ttl') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing a Thanatos Tower • Legend party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nThanatos Tower • Legend - ${startTime}\nFirst Party\n1. ${message.author}\n2.\n3.\n4.\n5. (Full Support)\n6. (Tank)\n\nSecond Party\n1.\n2.\n3. (Full Support)\n4. (Convert)\n5.(Tank)\n6. (High DPS)`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'oracle-hard') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing an Oracle the Hard party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nOracle Hard - ${startTime}\n1. ${message.author}\n2.\n3.\n4.\n5.\n6.`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'boc') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing a Battle of Cake party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nBattle of Cake - ${startTime}\n1. ${message.author}\n2.\n3.\n4.\n5.\n6.`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'purga') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing a Purgatory party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nPurgatory - ${startTime}\n1. ${message.author}\n2.\n3.\n4.\n5.\n6.`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'vr') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing a Valhalla Ruins party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nValhalla Ruins - ${startTime}\n1. ${message.author}\n2.\n3.\n4.\n5.\n6.`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'ec') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing a Echoing Corridor party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nEchoing Corridor - ${startTime}\n1. ${message.author}\n2.\n3.`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else if (args[0] === 'et') {

      let startTime = 'ASAP';
      let callTime = 'The dungeon run will start immediately once the party has been organized.\n.';

      if (args[1]) {
        callTime = `The dungeon run will start later around ${args[1]}\n.`;
        startTime = args[1];
      }

      const organize = ` ${message.author} is organizing an Endless Tower party!\nCopy and list out your name on the list below.\n.\n${callTime}`;
      const organize_list = `\nEndless Tower - ${startTime}\n1. ${message.author}\n2.\n3.\n4.\n5.\n6.`;

      message.channel.send(organize);
      message.channel.send(organize_list);
      message.channel.send(`.\n<@&${roleID}>`);
    } else {
      const notificationSquad = new MessageEmbed()
        .setTitle('Dungeon Party Organizer - Help')
        .setColor(0xFFFF00)
        .setDescription(`${message.author}, please refer below to properly organize a party.`)
        .addField('Dungeon Code', 'et - Endless Tower\noracle-hard - Oracle Hard\noracle-nm - Oracle Nightmare\nboc - Battle of Cake\npurga - Purgatory\nttb - Thanatos Tower • Brave\nttl - Thanatos Tower • Legend\nec - Echoing Corridor')
        .addField('Call Time', '<time><am/pm> (Do not include a space in between)')
        .addField('Example', '~organize oracle-nm 10am')
        .addField('Note', 'Please only use this command on #weekly-runs channel!');

        message.channel.send(notificationSquad);
    }

    const organizeNotice = new MessageEmbed()
        .setTitle('Weekly Runs Notification')
        .setColor(0xFFFF00)
        .setDescription(`Use "~run-notify" to be notified whenever a dungeon party is being organized`);

        message.channel.send(organizeNotice).then(msg => { msg.delete({ timeout: 20000 /*time unitl delete in milliseconds*/})});

  } else if (message.content === `${prefix}run-notify`) {
    try {
     
      if (!message.member.roles.cache.has('835555436177522759')) {

        message.member.roles.add('835555436177522759');
       
        const notificationSquad = new MessageEmbed()
        .setTitle('Weekly Runs Notification')
        .setColor(0xFFFF00)
        .setDescription(`${message.author}, you are now a member of the notification squad!\nYou will be notified whenever a dungeon party is being organized on #weekly-runs!\n\nTo opt-out of this notification use the command "~run-notify-off".`);

        message.channel.send(notificationSquad);

      } else {
        const notificationSquad = new MessageEmbed()
        .setTitle('Weekly Runs Notification')
        .setColor(0xFFFF00)
        .setDescription(`${message.author}, you are already in the notification squad.`);

        message.channel.send(notificationSquad);
      }

    } catch (error) {
      console.log(error);
    }

  } else if (message.content === `${prefix}run-notify-off`) {
    try {
     
      if (!message.member.roles.cache.has('835555436177522759')) {

        const notificationSquad = new MessageEmbed()
        .setTitle('Weekly Runs Notification')
        .setColor(0xFFFF00)
        .setDescription(`${message.author}, you are not included in the notification squad!\n\n To opt-in, just use the command "~run-notify".`);

        message.channel.send(notificationSquad);

      } else {
        message.member.roles.remove('835555436177522759');
       
        const notificationSquad = new MessageEmbed()
        .setTitle('Weekly Runs Notification')
        .setColor(0xFFFF00)
        .setDescription(`${message.author}, you are now removed from the notification squad!\n\n To opt-in, just use the command "~run-notify" again :P`);

        message.channel.send(notificationSquad);
      }

    } catch (error) {
      console.log(error);
    }

  }
});

function filterArray(a, b) {
  const c = a.filter(function(objFromA) {
    return !b.find(function(objFromB) {
      return objFromA.id === objFromB.id
    });
  });

  return c;
}

const mySecret = process.env['disc_token']
client.login(mySecret);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
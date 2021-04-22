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

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Fuck you~');
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

        const CHA = message.member.voice.channel;
        const list = client.guilds.cache.get('648435112769486897');
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

    }
    else if (message.content.startsWith(`${prefix}member-list`)) {

        let member_counter = 1;
        let total_members = '\n';
        const list = client.guilds.cache.get('648435112769486897');

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
        message.channel.send('Do you want me to destroy the phone of all the absent members? Yes/No');
    }
});

function filterArray(a, b) {
    const c = a.filter(function (objFromA) {
        return !b.find(function (objFromB) {
            return objFromA.id === objFromB.id
        });
    });

    return c;
}

const mySecret = process.env['disc_token']
client.login(mySecret);
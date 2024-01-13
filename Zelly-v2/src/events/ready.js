const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require('..');
const { fetcher } = require('apiv2-fetcher')
require('colors');

client.on('ready', async () => {
    try {
        await fetcher();
        console.log();
    } catch (error) {
        console.error(error);
    }

    const activityList = [
        { name: `Zelly`, type: ActivityType.Watching }
    ];

    const channel = client.channels.cache.get('1187752824818389043');
    if (!channel) return;

    const startEmbed = new EmbedBuilder()
        .setTitle('Bot Started')
        .setDescription(`\`${client.user.username}\` is now online and operational.`)
        .setColor(0x57F287)
        .setTimestamp();

    await channel.send({ embeds: [startEmbed] });

    let i = 0;
    setInterval(() => {
        if (i >= activityList.length) i = 0;
        client.user.setActivity(activityList[i]);
        i++;
    }, 10000);

    console.log(`Client - Connected as ${client.user.tag}`.green);
});
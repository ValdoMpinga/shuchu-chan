const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { COLORS } = require('../globals/colors')
const fs = require('fs');

module.exports = function getEmbed(title, description)
{
    try
    {
        const replyEmbed = new EmbedBuilder()
            .setColor(COLORS.color4)
            .setTitle(title)
            .setThumbnail('https://th.bing.com/th/id/OIP.w3AdDIgtXOMPe8BENP-vmgHaHa?pid=ImgDet&w=204&h=204&c=7&dpr=2')
            .setDescription(description)
            .setTimestamp()

        return replyEmbed
    } catch (e)
    {
        console.log(e);
    }
}


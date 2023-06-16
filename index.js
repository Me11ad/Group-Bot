const express = require('express')
const {Telegraf, Markup} = require('telegraf');

const bot = new Telegraf('BOT_TOKEN');

bot.use(async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

bot.on('text', (ctx) => ctx.reply(`Текст "${ctx.update.message.text}" не поддерживается.`))


bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
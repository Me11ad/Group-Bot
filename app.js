const express = require('express')
const {Telegraf, Markup} = require('telegraf');

const bot = new Telegraf('6084139426:AAFPjW6DxwF6HGFZuIqVu0ZeRO-mHCCvEBo');

bot.use(async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

bot.on('text', (ctx) => ctx.reply(`Текст "${ctx.update.message.text}" не поддерживается.`))

bot.use(async (ctx) => {
    await ctx.reply('Что нужно сделать?', Markup
        .keyboard([
            ['Добавить студента', 'Показать список студентов', 'Удалить студента'],
        ]).resize()
    )
});


bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
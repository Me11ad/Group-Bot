import express from 'express'
import { PORT, TOKEN } from './config.js'
import Telegraf from 'telegraf'
//import { getMainMenu } from './keyboard.js'

const app = express()
const bot = new Telegraf(TOKEN)

bot.start(ctx => {
    ctx.replyWithHTML('Приветствую в <b>GroupBot</b>\n\n'+
    'Чтобы быстро добавить студента, просто напишите и отправьте боту',
    getMainMenu())
})

//bot.hears('Добавить студента', ctx => {
    //ctx.reply('Тут вы сможете добавить студента')
//})

//bot.hears('Список студентов', ctx => {
    //ctx.reply('Тут будет список студентов')
//})
bot.on('text', ctx => {
    ctx.replyWithHTML(
        `Вы действительно хотите добавить студента:\n\n`+
        `<i>${ctx.message.text}</i>`,
         yesNoKeyboard()
    )
})

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
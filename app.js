import express from 'express'
import { PORT, TOKEN } from './config.js'
import Telegraf from 'telegraf'
import { getMainMenu } from '.keyboard.js'

const app = express()
const bot = new Telegraf(TOKEN)

bot.start(ctx => {
    ctx.reply('Welcome, bro', getMainMenu())
})

bot.hears('Добавить студента', ctx => {
    ctx.reply('Тут вы сможете добавить студента')
})

bot.hears('Список студентов', ctx => {
    ctx.reply('Тут будет список студентов')
})
bot.on('text', ctx => {
    ctx.reply('just text')
})

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
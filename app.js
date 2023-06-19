import express from 'express'
import { PORT, TOKEN } from './config.js'
import {Telegraf} from 'telegraf'
import session from 'telegraf/session.js'
import { getMainMenu, yesNoKeyboard} from './keyboard.js'
import { getStudents, addStudent, deleteStudent } from './db.js'

const app = express()
const bot = new Telegraf(TOKEN)

bot.use(session())

bot.start(ctx => {
    ctx.replyWithHTML('Приветствую в <b>GroupBot</b>\n\n'+
    'Чтобы быстро добавить студента, просто напишите и отправьте боту',
    getMainMenu())
})

//bot.hears('Добавить студента', ctx => {
    //ctx.reply('Тут вы сможете добавить студента')
//})

bot.hears('Список студентов', async ctx => {
    const students = await getStudents()
    let result = ''

    for (let i = 0; i < students.length; i++) {
        result = result + `[${i+1}] ${tasks[i]}\n`
    }

    ctx.replyWithHTML (
        '<b>Список студентов:</b>\n\n'+
        `${result}`
    )
})

bot.hears('Удалить студента', ctx => {
    ctx.replyWithHTML(
        'Введите фразу <i>"удалить `порядковый номер студента`"</i>, чтобы удалить сообщение,'+
        'например, <b>"удалить 3"</b>:'
    )
})

bot.hears(/^удалить\s(\d+)$/, ctx => {
    const id = Number(+/\d+/.exec(ctx.message.text)) - 1
    deleteStudent(id)
    ctx.reply('Студент успешно удалён')
})

bot.on('text', ctx => {
    ctx.session.studentText = ctx.message.text

    ctx.replyWithHTML(
        `Вы действительно хотите добавить студента:\n\n`+
        `<i>${ctx.message.text}</i>`,
         yesNoKeyboard()
    )
})

bot.action(['yes', 'no'], ctx => {
    if (ctx.callbackQuery.data === 'yes') {
        addTask('сюда будем передавать имя студента')
        ctx.editMessageText('Студент успешно добавлен')
    } else {
        ctx.deleteMessage()
    }
})

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))

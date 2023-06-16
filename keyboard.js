import Markup from 'telegraf/markup.js'

export function getMainMenu() {
    return Markup.keyboard([
        ['Добавить студента', 'Список студентов', 'Удалить студента']
    ]).resize().extra()
}

export function yesNoKeyboard() {
    return Markup.inlineKeyboard([
        Markup.callbackButton('Да','yes'),
        Markup.callbackButton('Нет', 'no')
    ], {columns: 2}).extra()
}
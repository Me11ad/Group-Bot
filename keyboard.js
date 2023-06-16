import Markup from 'telegraf/markup.js'

export function getMainMenu() {
    return Markup.keyboard([
        ['Добавить студента', 'Список студентов', 'Удалить студента']
    ]).resize().extra()
}
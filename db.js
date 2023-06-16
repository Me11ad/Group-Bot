export let StudentList = []

export function getStudents() {
    return new Promisse((resolve) => {
        setTimeout(() => {
            resolve(StudentList)
        }, 500)
    })
}
export function addStudent(text) {
    studentList.push(text)
}

export function deleteStudent(id) {
    studentList.splice(id, 1)
}
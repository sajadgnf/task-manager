let $ = document

const bildTaskForm = $.querySelector(".bild_task")
const inputTask = $.querySelector("#input_task")
const users = $.querySelector("#users")
const submitTask = $.querySelector(".submit_task")
const modal = $.querySelector("#modal")
const taskBox = $.querySelectorAll('.task_body')
var tasksData = []

// Store Employees
let usersList = [{ name: "علی", value: "ali" }, { name: "رضا", value: "reza" }, { name: "حسین", value: "hosein" }, { name: "احسان", value: "ehsan" }]

const setUsers = usersList.forEach(item => {
    users.innerHTML += `<option value=${item.value}>${item.name}</option>`
})

// clear
const clear = () => {
    inputTask.value = ""
    users.value = "none"
}

// error
const error = () => {
    if (inputTask.value == "" || users.value == "none") {
        modal.style.opacity = "1"
        setTimeout(() => {
            modal.style.opacity = "0"
        }, 3000)
        return true
    }
}

// Delete Task 
const deleteTasks = (index) => {
    let deleteTaskConfirm = confirm("Are You Sure...?")
    if (deleteTaskConfirm) {
        tasksData.splice(index, 1)
    }
    localStorage.setItem("tasks", JSON.stringify(tasksData))
    fetchtasks()
}

// Bild Tasks
const bildTask = () => {
    taskBox.forEach(item => item.innerHTML = "")

    tasksData.forEach((element, index) => {
        let userTask = $.querySelector("." + element.userValue + "_task")
        const template = `
        <li class="task_item">
        <p>${element.task}</p>
        <i onclick=deleteTasks(${index}) class="fas fa-trash delete_task"></i>
        </li>
      `
        userTask.insertAdjacentHTML("beforeend", template)
    })
}

// Validate Tasks
const validateData = event => {
    event.preventDefault()

    if (error()) {
        return false
    }

    tasksData.push({ task: inputTask.value, userValue: users.value })
    localStorage.setItem("tasks", JSON.stringify(tasksData))
    bildTask()

    clear()
}

// Fetch
const fetchtasks = () => {
    if (localStorage.getItem("tasks")) {
        tasksData = JSON.parse(localStorage.getItem("tasks"))
    } else {
        tasksData = []
        localStorage.setItem("tasks", JSON.stringify(tasksData))
    }
    bildTask()
}

// events
window.addEventListener("load", setUsers)
bildTaskForm.addEventListener("submit", validateData)
fetchtasks()







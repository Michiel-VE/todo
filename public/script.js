const list = document.getElementById('list')
const textInput = document.getElementById('text')
const editTextInput = document.getElementById('editText')
const addElement = document.getElementById('add')
const editElement = document.getElementById('edit')
const baseUrl = 'http://localhost:5001/todos'

textInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        createTodo()
    }
});

editTextInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const idAttr = editElement.children[2].getAttribute('onclick')
        let id = idAttr.substring(14, 38)
        saveEditTodo(id)
    }
});

const allTodos = async () => {
    try {
        list.innerHTML = "<p>Loading Todo\'s</p>"

        const todos = await axios.get(`${baseUrl}`)

        if (todos.data.length >= 1) {
            const todosList = todos.data.map((todo) => {
                return `<div>
            <p class="text-xl">${todo.text.charAt(0).toUpperCase() + todo.text.slice(1)}
            <span class="mx-4 cursor-pointer text-blue-900 font-bold text-xl" onclick="editTodo('${todo._id}', '${todo.text}')">e</span>
            <span class="cursor-pointer text-red-900 font-bold text-xl" onclick="deleteTodo('${todo._id}')">&times;</span>
            </p>
            </div>`
            })

            list.innerHTML = todosList.join('')
        }
        else {

            list.innerHTML = "<p>No todo's yet</p>"
        }


    } catch (error) {
        console.log(error)
    }
}
allTodos()

const createTodo = async () => {
    if (textInput.value) {
        try {
            await axios.post(`${baseUrl}/newTodo`, {
                text: textInput.value
            })

            allTodos()
        } catch (error) {
            console.log(error)
            list.innerHTML = `<div>Something went wrong</div>`
        }
    }

    textInput.value = ''
}

const editTodo = async (id, text) => {
    if (editElement.classList.contains('hidden')) {
        addElement.classList.toggle('hidden')
        editElement.classList.toggle('hidden')
    }

    editTextInput.value = text
    editElement.children[2].setAttribute('onclick', `saveEditTodo('${id}')`)
}

const saveEditTodo = async (id) => {
    try {
        await axios.put(`${baseUrl}/${id}`, {
            text: editTextInput.value
        })

        allTodos()

    } catch (error) {
        console.log(error)
        list.innerHTML = `<div>Something went wrong</div>`
    }

    editTextInput.value = ''
    addElement.classList.toggle('hidden')
    editElement.classList.toggle('hidden')
}

const deleteTodo = async (id) => {
    try {
        await axios.delete(`${baseUrl}/${id}`)

        allTodos()
    } catch (error) {
        console.log(error)
        list.innerHTML = `<div>Something went wrong</div>`
    }
}
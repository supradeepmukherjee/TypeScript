import './style.css'

type todo = {
  readonly id: string
  title: string
  done: boolean
}

const todos: todo[] = []
// const todos: Array<todo> = []

const input = document.getElementsByName('title')[0] as HTMLInputElement

const todosContainer = document.querySelector('.todosContainer') as HTMLDivElement

document.getElementsByTagName('form')[0].onsubmit = e => {
  e.preventDefault()
  todos.push({
    id: String(Math.ceil(Math.random() * 100000)),
    title: input.value,
    done: false
  })
  input.value = ''
  todosContainer.innerHTML = ''
  todos.forEach(({ id, title }) => {
    const todo = document.createElement('div')
    todo.className = 'todo'
    todo.id = id
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    const p = document.createElement('p')
    p.innerText = title
    p.className = checkBox.checked ? 'done' : ''
    checkBox.onchange = () => {
      p.className = checkBox.checked ? 'done' : ''
      todos.find(i => i.id === id ? i.done = checkBox.checked : null)
    }
    const btn = document.createElement('button')
    btn.innerText = 'X'
    todo.append(checkBox, p, btn)
    btn.onclick = () => {
      todos.splice(todos.findIndex(i => i.id === id), 1)
      todosContainer.innerHTML = ''
      // render it after this by making a function
    }
    todosContainer.append(todo)
  })
}
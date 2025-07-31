const task = document.getElementById('txtTask')
const btn = document.getElementById('btn')
const ul = document.querySelector('#list')
const feedback = document.querySelector('#feedbackMessage')
const btnFeedback = document.getElementById('btnFeedback')
let arrTasks = []
let intervalo = null

if(localStorage.getItem('tasks')){
 arrTasks = JSON.parse(localStorage.getItem('tasks'))
renderTasks()
}

// evento de click no botão
btn.addEventListener('click', ()=> { 
const txtTask = task.value.trim() // ()trim tira os espaços do inicio e fim

if(!txtTask) {
msgError('Digite uma tarefa para proseguir...')
setTimeout(hiddenMessage, 3000)
 return
} 
const newTasks = {id: Date.now(), task: txtTask, completed: false}

const existe = arrTasks.some( ele => ele.task.toLowerCase() === txtTask.toLowerCase())

if(!existe){
 arrTasks.push(newTasks)
}else{
 msgError(`Tarefa: ${txtTask}, ja adicionada.`)
 feedback.style.background = 'Blue'
 return
}
renderTasks()
saveData()

task.value = ''
task.focus()
})

// quando pressionar enter dentro do input, o botão é clicado imediatamente
task.addEventListener('keyup', (e)=> {
 if(e.key === 'Enter'){
  btn.click()
 }
})


// função para escrever as tarefas na tela
function renderTasks(){
 ul.innerHTML = ''

arrTasks.forEach( ele => {
 const li = document.createElement('li')
 li.className = 'task-li'

 const spanTask = document.createElement('span')
 spanTask.className = 'spanTask'
 spanTask.textContent = ele.task

 if(ele.completed) spanTask.classList.add('tarefaMarcada')
 
const btnCheck = document.createElement('button')
btnCheck.className = 'btnCheck'
btnCheck.addEventListener('click', ()=> taskStatus(ele.id))
btnCheck.innerHTML = !ele.completed ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-rotate-left"></i>';

const btnDelete = document.createElement('button')
btnDelete.className = 'btnDelete'
btnDelete.addEventListener('click', ()=> deleteTask(ele.id))

btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'

li.append(spanTask, btnCheck, btnDelete)

ul.appendChild(li)

})

}
// função para gravar as tarefas
function saveData(){
 localStorage.setItem('tasks', JSON.stringify(arrTasks)) 
}

//mudar status da tarefa
function taskStatus(id){

 if(arrTasks.length === 0) return

 arrTasks = arrTasks.map( ele => 
  ele.id === id
  ? {...ele,  completed: !ele.completed}
  : ele
 )

 console.log(arrTasks)

 renderTasks()
 saveData()
} 

// excluir tarefa

function deleteTask(id){
 arrTasks = arrTasks.filter( ele => ele.id !== id)
 console.log(arrTasks)
 renderTasks()
 saveData()
 
}

// mensagem de feedback
function msgError(txt){
 
 const msrError = document.querySelector('#feedbackTxt')
 msrError.innerHTML = txt

 feedback.style.transform = `translateY(0)`

  task.focus()
}


function hiddenMessage(){
feedback.style.transform = `translateY(-150%)`
}

btnFeedback.addEventListener('click', hiddenMessage)


let todos = [
    {
        'id': 0, //timestamp
        'titel': 'Website redesignen',
        'info': 'Modify the Content of the main Website...',
        'progress-bar': '1/2 Done',
        'status': 'todo',
    },

    {
        'id': 1,
        'titel': 'Call potencial clients',
        'info': 'Make the product presentation to prospective buyers',
        'progress-bar': '1/2 Done',
        'status': 'progress',
    },
    {
        'id': 2,
        'titel': 'video',
        'info': 'Edit the new company video',
        'progress-bar': '1/2 Done',
        'status': 'done',
    },
    {
        'id': 3,
        'titel': 'einkaufen',
        'info': 'apfel,banane',
        'progress-bar': '1/2 Done',
        'status': 'feedback',
    }
// id = tasks.length - 1
// category
// titel = id.title
// description = id.description
// assignments
// priority
// status



];

let currentDraggedElements;

function updateBoard() {
    let todo = todos.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }


    let done = todos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }

    let progress = todos.filter(t => t['status'] == 'progress');
    document.getElementById('progress').innerHTML = '';

    for (let index = 0; index < progress.length; index++) {
        const element = progress[index];
        document.getElementById('progress').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }

    let feedback = todos.filter(t => t['status'] == 'feedback');
    document.getElementById('feedback').innerHTML = '';

    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        document.getElementById('feedback').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }
}

function generateTodoHTML(element) {
    

    return /*html*/ `
    <div class="card" id="${element['id']}" draggable="true" onclick="showCards(${element["id"]})" ondragstart="startDragging(${element['id']})">
    <div class="detailView" id="detailView" style="display:none"></div>
    <div  class="card-name" style="background-color:#FF7A00;;">Designs</div>
                                <div class="card-text">
                                    <span class="card-headline">${element['titel']}</span>
                                    <span class="card-info">${element['info']}</span>
                                    <div class="progress-div">
                                        <div class="progress-bar">
                                        </div>
                                        <span>${element['progress-bar']}</span>
                                    </div>
                                </div>
                                <div class="card-bottom">
                                    <div class="user-icons">
                                        <div class="user-icon" style="background:#EE00D6"><span>DS</span></div>
                                        <div class="user-icon" style="background:#0190E0;left:30px"><span>SS</span>
                                        </div>
                                        <div class="user-icon" style="background:#000000;left:60px"><span>+2</span>
                                        </div>
                                    </div>
                                    <div><img src="img/arrow-down.svg"></div>
                                </div>
                            </div>
    `;

}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateBoard();
}


function showNewTaskCard() {
    let newTaskCloseBtn = document.getElementById('new-task-close-btn');
    newTaskCloseBtn.classList.remove('d-none');
    addShadowScreen();
    slideInTaskCard()
}


function hideNewTaskCard() {
    let newTaskCloseBtn = document.getElementById('new-task-close-btn');
    slideOutTaskCard();
    removeShadowScreen();
    setTimeout(function () { newTaskCloseBtn.classList.add('d-none'); }, 450);
}


function addShadowScreen() {
    let shadowScreen = document.getElementById('shadow-screen');
    shadowScreen.classList.remove('d-none');
    shadowScreen.classList.remove('smooth-opacity-out');
    shadowScreen.classList.add('smooth-opacity-in');
}


function removeShadowScreen() {
    let shadowScreen = document.getElementById('shadow-screen');
    shadowScreen.classList.remove('smooth-opacity-in');
    shadowScreen.classList.add('smooth-opacity-out');
    setTimeout(function () { shadowScreen.classList.add('d-none'); }, 450);
}


function slideInTaskCard() {
    let newTask = document.getElementById('center-new-task-card');
    newTask.classList.remove('slide-right');
    newTask.classList.add('slide-left');
}


function slideOutTaskCard() {
    let newTask = document.getElementById('center-new-task-card');
    newTask.classList.remove('slide-left');
    newTask.classList.add('slide-right');
}


/**
 * created by sasha
 */


function showCards(idOfCard){
    
 
    let todoArray = todos[idOfCard];
    let detailContainer = document.getElementById("detailView");
    let info = todoArray["info"];
    let progressBar = todoArray["progress-bar"]
    let status = todoArray["status"]
    let titel = todoArray["titel"]

    detailContainer.innerHTML = `<div>
        <span>${info}</span>
        <span>${progressBar}</span>
        <span>${status}</span>
        <span>${titel}</span>
    </div>`

    detailContainer.removeAttribute("style");
    
}



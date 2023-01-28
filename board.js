/*let todos = [
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



];*/

/*Variablen Namen und Reihenfolge: (title, description, categoryTitle, assignedContacts, color, date, priority, subtasks,status)*/

let todos = [
    new Task('Website redesign', 'Modify the Content of the main Website...', 'Design', 'Hans Stieber', 'orange', '01/21/2022', 'low', '', 'todo', '0'),
    new Task('Call potencial clients', 'Make the product presentation to prospective buyers', 'Sales', 'Daniela Scholz', 'purple', '02/08/2022', 'urgent', '', 'progress', '1'),
    new Task('Accounting invoices', 'Write open invoices for customer', 'Backoffice', 'Hans Stieber', 'cyan', '01/23/2022', 'medium', '', 'feedback', '2'),
    new Task('Video cut', 'Edit the new company video', 'Media', 'Hans Stieber', 'yellow', '01/24/2022', 'medium', '', 'feedback', '3'),
    new Task('Social media strategy', 'Develop an ad campaign for brand positioning', 'Marketing', 'Hans Stieber', 'blue', '01/25/2022', 'low', '', 'done', '4'),
];

let currentDraggedElements;

function updateBoard() {
    let todo = todos.filter(t => t.status == 'todo');
    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }

    let done = todos.filter(t => t.status == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }

    let progress = todos.filter(t => t.status == 'progress');
    document.getElementById('progress').innerHTML = '';

    for (let index = 0; index < progress.length; index++) {
        const element = progress[index];
        document.getElementById('progress').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }

    let feedback = todos.filter(t => t.status == 'feedback');
    document.getElementById('feedback').innerHTML = '';

    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        document.getElementById('feedback').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }
}

function generateTodoHTML(element) {

    return /*html*/ `
    <div class="card" id="${element.id}" draggable="true" onclick="showCards(${element.id}" ondragstart="startDragging(${element.id})">
    <div class="detailView" id="detailView" style="display:none"></div>
    <div  class="card-name" style="background-color:${element.category.color};">${element.category.title}</div>
                                <div class="card-text">
                                    <span class="card-headline">${element.title}</span>
                                    <span class="card-info">${element.description}</span>
                                    <div class="progress-div">
                                        <div class="progress-bar">
                                        </div>
                                        <span>${element.progress}</span>
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
                                    <div><img src="img/priority-${element.priority}.svg"></div>
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
    let newTaskCloseBtn = document.getElementById('content-new-task');
    newTaskCloseBtn.classList.remove('d-none');
    showShadowScreen();
    slideInCard()
}


function hideNewTaskCard() {
    let newTaskCloseBtn = document.getElementById('content-new-task');
    slideOutCard();
    hideShadowScreen();
    setTimeout(function () { newTaskCloseBtn.classList.add('d-none'); }, 450);
}

// =============================================wurde durch GENERAL SHOW AND HIDE FUNCTIONS in script.js ersetzt
// function addShadowScreen() {
//     let shadowScreen = document.getElementById('shadow-screen');
//     shadowScreen.classList.remove('d-none');
//     shadowScreen.classList.remove('smooth-opacity-out');
//     shadowScreen.classList.add('smooth-opacity-in');
// }


// function removeShadowScreen() {
//     let shadowScreen = document.getElementById('shadow-screen');
//     shadowScreen.classList.remove('smooth-opacity-in');
//     shadowScreen.classList.add('smooth-opacity-out');
//     setTimeout(function () { shadowScreen.classList.add('d-none'); }, 450);
// }


// function slideInTaskCard() {
//     let newTask = document.getElementById('center-new-task-card');
//     newTask.classList.remove('slide-right');
//     newTask.classList.add('slide-left');
// }


// function slideOutTaskCard() {
//     let newTask = document.getElementById('center-new-task-card');
//     newTask.classList.remove('slide-left');
//     newTask.classList.add('slide-right');
// }


/**
 * created by sasha
 */

function showCards(idOfCard) {
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



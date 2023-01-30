
/*Variablen Namen und Reihenfolge: (title, description, categoryTitle, assignedContacts, color, date, priority, subtasks,status,id)*/

let tasks = [
    new Task('Website redesign', 'Modify the Content of the main Website...', 'Design', 'Hans Stieber', 'orange', '01/21/2022', 'low', '', 'todo', '0'),
    new Task('Call potencial clients', 'Make the product presentation to prospective buyers', 'Sales', 'Daniela Scholz', 'purple', '02/08/2022', 'urgent', '', 'progress', '1'),
    new Task('Accounting invoices', 'Write open invoices for customer', 'Backoffice', 'Hans Stieber', 'cyan', '01/23/2022', 'medium', '', 'todo', '2'),
    new Task('Video cut', 'Edit the new company video', 'Media', 'Hans Stieber', 'yellow', '01/24/2022', 'medium', '', 'feedback', '3'),
    new Task('Social media strategy', 'Develop an ad campaign for brand positioning', 'Marketing', 'Hans Stieber', 'blue', '01/25/2022', 'low', '', 'done', '4'),
];

let searchedTodos = [];
let currentDraggedElements;

async function initBoard() {
    await load();
    selectingArrayForBoardUpdate();
}

function clearBoard() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('progress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


function renderBoard(todos) {
    clearBoard();
    // loadTasks();
    renderTodoColumn(todos);
    renderProgressColumn(todos);
    renderFeedbackColumn(todos);
    renderDoneColumn(todos);
}


function renderTodoColumn(todos) {
    let todo = todos.filter(t => t.status == 'todo');
    console.log(todo);
    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        const status = element.status;
        console.log(element);
        console.log(status);
        document.getElementById('todo').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }
}

function renderProgressColumn(todos) {
    let progress = todos.filter(t => t.status == 'progress');
    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        const status = element.status;
        console.log(element);
        console.log(status);
        document.getElementById('progress').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }
}

function renderFeedbackColumn(todos) {
    let feedback = todos.filter(t => t.status == 'feedback');
    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        const status = element.status;
        console.log(element);
        console.log(status);
        document.getElementById('feedback').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }
}

function renderDoneColumn(todos) {
    let done = todos.filter(t => t.status == 'done');
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        const status = element.status;
        console.log(element);
        console.log(status);
        document.getElementById('done').insertAdjacentHTML("beforeend", generateTodoHTML(element));
    }
}


/**
 * Function checks if there is a specific search value at the search input-field. If not, the board is updated from the
 * array todos, which includes ALL tasks. If a search value exists the board is updated from the array searchedTodos.
 */
function selectingArrayForBoardUpdate() {
    if (!document.getElementById('find-task').value) {
        renderBoard(todos);
    } else {
        renderBoard(searchedTodos);
    }
}

function generateTodoHTML(element) {

    return /*html*/ `
    <div class="card" id="${element.id}" draggable="true" onclick="showCards(${element.id})" ondragstart="startDragging(${element.id})">
    <div class="detailView" id="detailView" style="display:none"></div>
    <div  class="card-name" style="background-color:${element.category.color};">${element.category.title}</div>
                                <div class="card-text">
                                    <span class="card-headline">${element.title}</span>
                                    <span class="card-info">${element.description}</span>
                                    <!-- <div class="progress-div">
                                            <div class="progress-bar"></div>
                                            <span>${element.progress}</span></div> -->
                                    <!-- </div> -->
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
    renderBoard(todos);
    saveStatus();
}


function saveStatus() {
    let todosAsText = JSON.stringify(todos);
    backend.setItem('todo', todosAsText);
}

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

/*----------- SEARCH FUNKTION FOR FINDING SPECIFIC TASK -----------*/
/**
 * Function that checks if the value of the search input-field matches with title or description values of the tasks in the todos array.
 * If a task title or description includes the search value it is pushed into the array searchedTodos before it finally gets updated to the
 * board.
 */
function findTask() {
    searchedTodos = [];
    let search = document.getElementById('find-task').value;
    for (let i = 0; i < todos.length; i++) {
        const title = todos[i].title;
        const description = todos[i].description;
        if (title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
            searchedTodos.push(todos[i]);
            console.log(searchedTodos);
        }
        selectingArrayForBoardUpdate();
    }
}

/*----------- ADDS NEW TASK TO SELECTED STATUS -----------*/


function addTaskToStatusProgress() {
    progressStatus = 'progress';
    showNewTaskCard();
}

function addTaskToStatusFeedback(){
    progressStatus = 'feedback';
    showNewTaskCard();
}

function addTaskToStatusDone(){
    progressStatus = 'done';
    showNewTaskCard();
}
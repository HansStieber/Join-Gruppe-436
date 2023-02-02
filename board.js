/*Variablen Namen und Reihenfolge,für Tasks: (title, description, categoryTitle, assignedContacts, color, date, priority, subtasks,status,id)*/

let tasks = [];
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
    renderTodoColumn(todos);
    renderProgressColumn(todos);
    renderFeedbackColumn(todos);
    renderDoneColumn(todos);
}


function renderTodoColumn(todos) {
    let todo = todos.filter(t => t.status == 'todo');
    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        const id = todo[i].id;
        const assignments = todo[i].assignments;
        document.getElementById('todo').insertAdjacentHTML("beforeend", generateTodoHTML(element, assignments));
        checkForSecondUser(assignments, id);
        checkForMoreUsers(assignments, id);
    }
}


function renderProgressColumn(todos) {
    let progress = todos.filter(t => t.status == 'progress');
    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        const id = progress[i].id;
        const assignments = progress[i].assignments;
        document.getElementById('progress').insertAdjacentHTML("beforeend", generateTodoHTML(element, assignments));
        checkForSecondUser(assignments, id);
        checkForMoreUsers(assignments, id);
    }
}


function renderFeedbackColumn(todos) {
    let feedback = todos.filter(t => t.status == 'feedback');
    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        const id = feedback[i].id;
        const assignments = feedback[i].assignments;

        document.getElementById('feedback').insertAdjacentHTML("beforeend", generateTodoHTML(element, assignments));
        checkForSecondUser(assignments, id);
        checkForMoreUsers(assignments, id);
    }
}


function renderDoneColumn(todos) {
    let done = todos.filter(t => t.status == 'done');
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        console.log(element.assignments);
        const id = done[i].id;
        const assignments = done[i].assignments;
        document.getElementById('done').insertAdjacentHTML("beforeend", generateTodoHTML(element, assignments));
        checkForSecondUser(assignments, id);
        checkForMoreUsers(assignments, id);
    }
}


function checkForSecondUser(assignments, id) {
    if (assignments.length > 1) {
        let secondUserIcon = assignments[1].firstName.slice(0, 1) + assignments[1].lastName.slice(0, 1);
        document.getElementById(`user-icons-${id}`).innerHTML += `
        <div id="second-user-icon-${id}" class="user-icon" style="background:${assignments[1].color}; left:30px;"><span>${secondUserIcon}</span></div>
        `;
    }
}


function checkForMoreUsers(assignments, id){
    if (assignments.length >=2) {
        let userlength = assignments.length -2;
        document.getElementById(`user-icons-${id}`).innerHTML += `
        <div id="more-than-two-users" class="user-icon" style="background:#000000; left:60px"><span>+${userlength}</span></div>
        `;
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


function generateTodoHTML(element, assignments) {
    let firstUserIcon = assignments[0].firstName.slice(0, 1) + assignments[0].lastName.slice(0, 1);

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
                                    <div id="user-icons-${element.id}" class="user-icons">
                                        <div id="first-user-icon-${element.id}" class="user-icon" style="background:${assignments[0].color}"><span>${firstUserIcon}</span></div>
                                        <!-- <div id="more-than-two-users" class="user-icon" style="background:#000000; left:60px"><span>+2</span></div> -->
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

function addTaskToStatusFeedback() {
    progressStatus = 'feedback';
    showNewTaskCard();
}

function addTaskToStatusDone() {
    progressStatus = 'done';
    showNewTaskCard();
}
/*Variablen Namen und Reihenfolge,für Tasks: (title, description, categoryTitle, assignedContacts, color, date, priority, subtasks,status,id)*/

let tasks = [];
let searchedTodos = [];
let currentDraggedElements;
let taskToEdit;


async function initBoard() {
    await load();
    selectingArrayForBoardUpdate();
}


function highlightCurrentNavPoint() {
    currentNavPoint = document.URL;
    console.log(currentNavPoint);

    // if (document.URL.includes(currentURL)) {
    //     console.log(currentURL);
    //     document.getElementById(currentURL).classList.add('bg-highlight');
    // }
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


function checkForMoreUsers(assignments, id) {
    if (assignments.length > 2) {
        let userlength = assignments.length - 2;
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
    <!-- <div class="detailView" id="detailView" style="display:none"></div> -->
    <div  class="card-name ${element.category.color}">${element.category.title}</div>
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



function showCards(idOfCard) {
    taskToEdit = idOfCard;
    let detailContainer = document.getElementById('detailView');
    detailContainer.classList.remove('d-none');
    showShadowScreen('detail-view-shadow-screen');
    let todoArray = todos[idOfCard];
    let categoryTitel = todoArray.category.title;
    let categoryBg = todoArray.category.color;
    let title = todoArray.title;
    let description = todoArray.description;
    let dueDate = todoArray.date;
    let priority = todoArray.priority;
    let assignedContacts = todoArray.assignments[0].firstName + todoArray.assignments[0].lastName;

    detailContainer.innerHTML =/*html*/ `
        <img src="assets/img/close.svg" alt="closing-icon" class="close-detail-view" onclick="closeDetailView()">
        <div class="card-name ${categoryBg}">${categoryTitel}</div>
        <div class="detail-view-title">${title}</div>
        <div>${description}</div>
        <div>
            <span class="bold-styling">Due date: </span>
            <div>${dueDate}</div>
        </div>
        <div>
            <span class="bold-styling">Priority: </span>
            <div>${priority}</div>
        </div>
            <span class="bold-styling">Assigned to: </span>
        <div>
            ${assignedContacts}
        </div>
        <img src="assets/img/pencil-btn-default.svg" alt="icon of a pencil" class="edit-task-btn" onclick="editTask(${idOfCard})">
        
        <button id="edit-delete-btn" onclick="confirmDelete('deleteTask()')" class="delete-btn" type="button">
                        <div>
                            <span id="delete-btn-span">Delete</span>
                            <img src="../assets/img/close.svg">
                        </div>
                    </button>
`;
}

function closeDetailView() {
    let detailContainer = document.getElementById('detailView');
    detailContainer.classList.add('d-none');
    hideShadowScreen('detail-view-shadow-screen');

}

function deleteTask() {
    showDeleteBtn();
    todos.splice(taskToEdit, 1);
    saveArrayToBackend('todo', todos);
    closeDetailView();
    renderBoard(todos);
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


/*----------- ADDS NEW TASK TO SELECTED STATUS -----------*/
function editTask(id) {
    document.getElementById('detail-view-shadow-screen').setAttribute('onclick', 'unfocusInput()');
    let detailContainer = document.getElementById('detailView');
    let title = todos[id].title;
    let description = todos[id].description;
    //let dueDate = todoArray.date;
    //let priority = todoArray.priority;
    detailContainer.innerHTML = /*html*/`
            <div class="field-container margin-bottom-zero">
                <label class="label" for="title">Title</label>
                <input type="text" id="new-title" name="title" onclick="editTitle()" required>
                <span id="title-to-edit" class="title-to-edit">${title}</span>
            </div>
            <div class="field-container margin-bottom-zero">
                <label class="label" for="description">Description</label>
                <textarea type="text" id="new-description" name="description" onclick="editDescription()"
                    required></textarea>
                <span id="description-to-edit" class="description-to-edit">${description}</span>
            </div>
            <div class="field-container margin-bottom-zero">
                <span class="label">Due date</span>
                <input id="date" type="date">
            </div>
            <div class="field-container margin-bottom-zero">
                <span class="label">Prio</span>
                <div class="prio-box">
                    <img id="prio-urgent" class="prio-urgent" src="assets/img/urgent_big.svg"
                        onclick="taskIsUrgent('urgent', 'urgent_big', 'medium', 'low')"
                        onmouseover="hover('urgent', 'urgent_big')" onmouseout="leave('urgent', 'urgent_big')">
                    <img id="prio-medium" class="prio-medium" src="assets/img/medium_big.svg"
                        onclick="taskIsMedium('medium', 'medium_big', 'low', 'urgent')"
                        onmouseover="hover('medium', 'medium_big')" onmouseout="leave('medium', 'medium_big')">
                    <img id="prio-low" class="prio-low" src="assets/img/low_big.svg"
                        onclick="taskIsLow('low', 'low_big', 'urgent', 'medium')" onmouseover="hover('low', 'low_big')"
                        onmouseout="leave('low', 'low_big')">
                </div>
            </div>
            <div class="field-container margin-bottom-zero">
                <span class="label">Assign to</span>
                <div id="new-contact-container" class="field-container d-none">
                    <input type="text" id="new-contact" name="new-contact" class="d-none" placeholder="Contact email">
                    <img class="new-category-icon left-pos" src="assets/img/close_new_task_button.svg"
                        onclick="closeInviteContact()">
                    <div class="border-small mid-pos"></div>
                    <img id="invite-contact-icon" class="new-category-icon right-pos" src="assets/img/confirm.svg"
                        onclick="inviteContact()">
                </div>
                <div id="contact-options-container" class="options-container">
                    <div class="option">
                        <div id="select-contact-container" class="select-container" onclick="openDropdownAssignment()">
                            <span>Select contacts to assign</span><img class="dropdown-arrow"
                                src="assets/img/arrow_select_dropdown.svg">
                        </div>
                    </div>
                    <div id="options-contact" class="options">
                        <div id="contacts-dropdown-container">
                        </div>
                        <div id="invite-new-contact"
                            class="option d-none selectable checkbox-container space-between last-option"
                            onclick="inviteNewContact()">
                            <span>Invite new contact</span><img src="assets/img/invite_contact.svg">
                        </div>
                    </div>
                </div>
                <div id="assignments-icons-container" class="assignments-icons-container">
                </div>
                <div class="edit-todo-button" onclick="saveChanges(${id})">
                </div>
            </div>
            
    `;
    console.log(title);
}

function unfocusInput() {
    //document.getElementById('title-to-edit').classList.remove('d-none');
}

function editTitle() {
    document.getElementById('title-to-edit').classList.add('d-none');
    document.getElementById('title').setAttribute('placeholder', "Enter a title");
}

function editDescription() {
    document.getElementById('description-to-edit').classList.add('d-none');
    document.getElementById('description').setAttribute('placeholder', "Enter a description");
}

function saveChanges(id) {
    let newTitle = document.getElementById('new-title').value;
    if (newTitle) {
        todos[id].title = newTitle;
    }
    let newDescription = document.getElementById('new-description').value;
    if (newDescription) {
        todos[id].description = newDescription;
    }
    closeDetailView();
    saveTasks();
    selectingArrayForBoardUpdate();
}
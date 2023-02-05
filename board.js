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
        const id = done[i].id;
        const assignments = done[i].assignments;
        document.getElementById('done').insertAdjacentHTML("beforeend", generateTodoHTML(element, assignments));
        checkForSecondUser(assignments, id);
        checkForMoreUsers(assignments, id);
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


function deleteTask() {
    showDeleteBtn();
    todos.splice(taskToEdit, 1);
    setNewTodoIds();
    saveArrayToBackend('todo', todos);
    closeDetailView();
    renderBoard(todos);
}


function setNewTodoIds() {
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todo.id = i;
    }
}


/*----------- DRAG AND DROP -----------*/

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
/*----------- DETAIL CARD-----------*/
function showCards(idOfCard) {
    taskToEdit = idOfCard;
    let detailContainer = document.getElementById('detailView');
    detailContainer.classList.remove('d-none');
    showShadowScreen('detail-view-shadow-screen');
    detailContainer.innerHTML = generateHTMLDetailCard(idOfCard);
    howMuchUsersAreAssigned(idOfCard);
}
function closeDetailView() {
    let detailContainer = document.getElementById('detailView');
    detailContainer.classList.add('d-none');
    hideShadowScreen('detail-view-shadow-screen');
}
function howMuchUsersAreAssigned(idOfCard) {
    let assignmentsArray = todos[idOfCard].assignments;
    for (let i = 0; i < assignmentsArray.length; i++) {
        const assignment = assignmentsArray[i];
        let assignedContact = assignment.firstName + " " + assignment.lastName;
        let initials = assignment.firstName.slice(0,1) + assignment.lastName.slice(0,1);
        let initialsBg = assignment.color;
        document.getElementById('assignedContacts').innerHTML += /*html*/`
        <div class="assignedContacts">
            <div class="initials-icon" style="background: ${initialsBg}">
                <span>${initials}</span>
            </div>
            <div>${assignedContact}</div>
        </div>
        `;
    }
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
/*----------- HTML Templates -----------*/

function generateHTMLDetailCard(idOfCard) {
    taskToEdit = idOfCard;
    let todoArray = todos[idOfCard];
    let categoryTitel = todoArray.category.title;
    let categoryBg = todoArray.category.color;
    let title = todoArray.title;
    let description = todoArray.description;
    let dueDate = todoArray.date;
    let priority = todoArray.priority;
    let assignedContacts = todoArray.assignments[0].firstName + todoArray.assignments[0].lastName;
    return /*html*/`
        <img src="assets/img/close.svg" alt="closing-icon" class="icon-settings" onclick="closeDetailView()">
        <img src="assets/img/left_arrow.svg" alt="left arrow" class="icon-settings d-none">
        <div class="category-styling ${categoryBg}">${categoryTitel}</div>
        <div class="detail-view-title">${title}</div>
        <div>${description}</div>
        <div class="flex-center">
            <span class="subheading-styling">Due date: </span>
            <div>${dueDate}</div>
        </div>
        <div class="flex-center">
            <span class="subheading-styling">Priority: </span>
            <img src="assets/img/${priority}_detailview.svg">
        </div class="flex-center">
            <span class="subheading-styling">Assigned to: </span>
        <div id="assignedContacts">
        </div>
        <img src="assets/img/pencil-btn-default.svg" alt="icon of a pencil" class="edit-task-btn" onclick="editTask(${idOfCard})">
        <button id="edit-delete-btn" onclick="confirmDelete('deleteTask()')" class="delete-btn delete-btn-board" type="button">
                        <div>
                            <span id="delete-btn-span">Delete</span>
                            <img src="../assets/img/close.svg">
                        </div>
                    </button>
`;

}

function editTask(id) {
    let detailContainer = document.getElementById('detailView');
    let title = todos[id].title;
    let description = todos[id].description;
    let y1 = todos[id].date.charAt(0);
    let y2 = todos[id].date.charAt(1);
    let y3 = todos[id].date.charAt(2);
    let y4 = todos[id].date.charAt(3);
    let m1 = todos[id].date.charAt(5);
    let m2 = todos[id].date.charAt(6);
    let d1 = todos[id].date.charAt(8);
    let d2 = todos[id].date.charAt(9);

    detailContainer.innerHTML = /*html*/`
        <div class="field-container margin-bottom-zero">
            <label class="label" for="title">Title</label>
            <input type="text" id="new-title" name="title" onclick="editTitle()" onfocusout="showOldTitle()" required>
            <span id="title-to-edit" class="title-to-edit" onclick="editTitle()">${title}</span>
        </div>

        <div class="field-container margin-bottom-zero">
            <label class="label" for="description">Description</label>
            <textarea type="text" id="new-description" name="description" onclick="editDescription()" onfocusout="showOldDescription()"
                required></textarea>
            <span id="description-to-edit" class="description-to-edit" onclick="editDescription()">${description}</span>
        </div>

        <div class="field-container margin-bottom-zero">
            <span class="label">Due date</span>
            <input class="color-transparent" id="new-date" type="date" onclick="editDate()" onfocusout="showOldDate()">
            <span id="date-to-edit" class="date-to-edit" onclick="editDate()">${d1}${d2}/${m1}${m2}/${y1}${y2}${y3}${y4}</span>
        </div>

        <div class="field-container margin-bottom-zero">
            <span class="label">Prio</span>
            <div class="prio-box">
                <img id="edit-prio-urgent" class="prio-urgent" src="assets/img/urgent_big.svg"
                    onclick="taskIsUrgent('urgent', 'urgent_big', 'medium', 'low')"
                    onmouseover="hover('urgent', 'urgent_big')" onmouseout="leave('urgent', 'urgent_big')">
                <img id="edit-prio-medium" class="prio-medium" src="assets/img/medium_big.svg"
                    onclick="taskIsMedium('medium', 'medium_big', 'low', 'urgent')"
                    onmouseover="hover('medium', 'medium_big')" onmouseout="leave('medium', 'medium_big')">
                <img id="edit-prio-low" class="prio-low" src="assets/img/low_big.svg"
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
    let priority = todos[id].priority;
    if (priority == 'urgent') {
        taskIsUrgent('urgent', 'urgent_big', 'medium', 'low', 'edit-');
    }
    if (priority == 'medium') {
        taskIsMedium('medium', 'medium_big', 'low', 'urgent', 'edit-');
    }
    if (priority == 'low') {
        taskIsLow('low', 'low_big', 'urgent', 'medium', 'edit-');
    }

    for (let i = 0; i < todos[id].assignments.length; i++) {
        const option = todos[id].assignments[i];
        if (assignments.every(a => a.firstName !== option.firstName) && assignments.every(a => a.lastName !== option.lastName)) {
            assignments.push(option);
        }
    }
    loadAssignmentOptions();
    for (let i = 0; i < assignments.length; i++) {
        const assignment = assignments[i];
        if (todos[id].assignments.some(a => a.firstName == assignment.firstName) && todos[id].assignments.some(a => a.lastName == assignment.lastName)) {
            assignContact(i);
        }
    }
}


function editTitle() {
    document.getElementById('title-to-edit').classList.add('d-none');
    document.getElementById('new-title').focus();
}

function showOldTitle() {
    let newTitle = document.getElementById('new-title').value;
    if (!newTitle) {
        document.getElementById('title-to-edit').classList.remove('d-none');
    }
}

function editDescription() {
    document.getElementById('description-to-edit').classList.add('d-none');
    document.getElementById('new-description').focus();
}

function showOldDescription() {
    let newDescription = document.getElementById('new-description').value;
    if (!newDescription) {
        document.getElementById('description-to-edit').classList.remove('d-none');
    }
}

function editDate() {
    document.getElementById('date-to-edit').classList.add('d-none');
    document.getElementById('new-date').classList.add('color-unset');
    document.getElementById('new-date').focus();
}

function showOldDate() {
    let newDate = document.getElementById('new-date').value;
    if (!newDate) {
        document.getElementById('date-to-edit').classList.remove('d-none');
        document.getElementById('new-date').classList.remove('color-unset');
    }
}

function saveChanges(id) {
    assignedContacts = [];
    let newTitle = document.getElementById('new-title').value;
    if (newTitle) {
        todos[id].title = newTitle;
    }
    let newDescription = document.getElementById('new-description').value;
    if (newDescription) {
        todos[id].description = newDescription;
    }
    let newDate = document.getElementById('new-date').value;
    if (newDate) {
        todos[id].date = newDate;
    }
    getPriority();
    todos[id].priority = priority;
    todos[id].assignments = [];
    for (let i = 0; i < assignedContacts.length; i++) {
        const contact = assignedContacts[i];
        todos[id].assignments.push(contact);
    }
    closeDetailView();
    saveTasks();
    selectingArrayForBoardUpdate();
}
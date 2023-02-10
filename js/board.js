/**
 * The array includes all todos that match with input value of the search input-field at the top of board.html.
 */
let searchedTodos = [];
/**
 * Elements that are currently dragged.
 */
let currentDraggedElements;
/**
 * Id of the task that is currently edited.
 */
let taskToEdit;

/**
 * The function initiates the Board. The data from the backend is loaded and the board is rendered.
 */
async function initBoard() {
    await load();
    selectingArrayForBoardUpdate();
    checkURLandHighlight('board');
}


/**
 * The Eventlistener runs a function on resizing the window. If the location is currently contacts.html or board.html and the new task card is
 * open, the new task card is closed.
 */
window.addEventListener('resize', function () {
    if (location.href.includes('board.html') || location.href.includes('contacts.html')) {
        if (newTaskOpen == true) {
            hideNewTaskCard();
        }
    }
});



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
        document.getElementById('todo').insertAdjacentHTML("beforeend", generateHTMLTaskCard(element, assignments));
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
        document.getElementById('progress').insertAdjacentHTML("beforeend", generateHTMLTaskCard(element, assignments));
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
        document.getElementById('feedback').insertAdjacentHTML("beforeend", generateHTMLTaskCard(element, assignments));
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
        document.getElementById('done').insertAdjacentHTML("beforeend", generateHTMLTaskCard(element, assignments));
        checkForSecondUser(assignments, id);
        checkForMoreUsers(assignments, id);
    }
}


/*----------- ADDS NEW TASK TO SELECTED STATUS -----------*/
/**
 * By pressing the plus button at the disired status (progress, feedback, done) this function opens the add task overlay.
 */
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


/**
 * This function calls all functions needed for, to let the User delete a Task. First it shows the Delete Button, then splices the 
 * todos Array at a specific position, given by the Global var taskToEdit.
 * Then calls function setNewTodoIds() wich giv all todos new Ids so they have still the same Ids like their position in todos Array.
 * Then saves manipulated Array to Backend. On Next step it close the Detail View of the Todo.
 * On Last it calls renderBoard() with new todos Array.
 */
function deleteTask() {
    showDeleteBtn();
    todos.splice(taskToEdit, 1);
    setNewTodoIds();
    saveArrayToBackend('todo', todos);
    closeDetailView();
    renderBoard(todos);
}


/**
 * This function iterates thru the todos Array, and give each todo a new Id, from first todo wich became the Id: 0,
 * till last todo wich then have the same Id like the todos Array length.
 */
function setNewTodoIds() {
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todo.id = i;
    }
}


/*----------- DRAG AND DROP -----------*/
/**
 * The global defined variable 'currentDraggedElement' is undefined in the first place. When moving a task to another status-column the global 
 * variable gets the value of the id of the current task card.
 * @param {number} id id of the current task card
 */
function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This functions overwirte the status when moving the task to a new status-column and saves it at the backend.
 * @param {string} status - there are 4 different status option: to do, in progress, feedback and done
 */
function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    renderBoard(todos);
    saveStatus();
}


function saveStatus() {
    let todosAsText = JSON.stringify(todos);
    backend.setItem('todo', todosAsText);
}


/*----------- DETAIL VIEW OF TASK CARD-----------*/
/**
 * This function shows the details of a task when clicking on it.  
 * @param {number} idOfCard - id of the current task card
 */
function showTaskCard(idOfCard) {
    taskToEdit = idOfCard;
    let detailContainer = document.getElementById('detailView');
    detailContainer.classList.remove('d-none');
    showShadowScreen('detail-view-shadow-screen');
    detailContainer.innerHTML = generateHTMLDetailCard(idOfCard);
    howMuchUsersAreAssigned(idOfCard);
}


/**
 * This function closes the detail view of the card when pressing the x-mark. The shadow-screen is removed and the board update.
 */
function closeDetailView() {
    let detailContainer = document.getElementById('detailView');
    detailContainer.classList.add('d-none');
    hideShadowScreen('detail-view-shadow-screen');
    renderBoard(todos);
}


/**
 * This function checks how much persons are assigned to one task. It generates the full name, the initials and the background color 
 * of the initials-container of each person which is shown at the detail view of the task card.
 * @param {number} idOfCard - id of the current task card
 */
function howMuchUsersAreAssigned(idOfCard) {
    let assignmentsArray = todos[idOfCard].assignments;
    for (let i = 0; i < assignmentsArray.length; i++) {
        const assignment = assignmentsArray[i];
        let assignedContact = assignment.firstName + " " + assignment.lastName;
        let initials = assignment.firstName.slice(0, 1) + assignment.lastName.slice(0, 1);
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


/*----------- HTML templates -----------*/

// template for the task cards at the board
function generateHTMLTaskCard(element, assignments) {
    let firstUserIcon = assignments[0].firstName.slice(0, 1) + assignments[0].lastName.slice(0, 1);
    return /*html*/ `
    <div class="card" id="${element.id}" draggable="true" onclick="showTaskCard(${element.id})" ondragstart="startDragging(${element.id})">
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
                                    <div><img src="../assets/img/priority-${element.priority}.svg"></div>
                                </div>
                            </div>
    `;
}


// template for detail cards when the task card is clicked
function generateHTMLDetailCard(idOfCard) {
    taskToEdit = idOfCard;
    let todoArray = todos[idOfCard];
    let categoryTitel = todoArray.category.title;
    let categoryBg = todoArray.category.color;
    let title = todoArray.title;
    let description = todoArray.description;
    let date_DE = new Date(todoArray.date).toLocaleDateString('de-DE');;
    let priority = todoArray.priority;
    return /*html*/`
        <img src="../assets/img/close.svg" alt="closing-icon" class="icon-settings" onclick="closeDetailView()">
        <img src="../assets/img/left_arrow.svg" alt="left arrow" class="icon-settings d-none">
        <div class="detail-view-category">
        <div class="category-styling ${categoryBg}">
        ${categoryTitel}</div>
        <img src="../assets/img/arrow-left-contacts.svg" alt="back-arrow" class="detail-view-arrow" onclick="closeDetailView()">
</div>
        <div class="detail-view-title">${title}</div>
        <div>${description}</div>
        <div class="flex-center">
            <span class="subheading-styling">Due date: </span>
            <div>${date_DE}</div>
        </div>
        <div class="flex-center">
            <span class="subheading-styling">Priority: </span>
            <img src="../assets/img/${priority}_detailview.svg">
        </div class="flex-center">
            <span class="subheading-styling">Assigned to: </span>
        <div id="assignedContacts">
        </div>
        <img src="../assets/img/pencil-btn-default.svg" alt="icon of a pencil" class="edit-task-btn" onclick="editTask(${idOfCard})">
        <button id="edit-delete-btn" onclick="confirmDelete('deleteTask()')" class="delete-btn delete-btn-board" type="button">
                        <div>
                            <span id="delete-btn-span">Delete</span>
                            <img src="../assets/img/close.svg">
                        </div>
                    </button>
`;
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
        }
        selectingArrayForBoardUpdate();
    }
}


/*----------- EDIT TASK FROM BOARD -----------*/
/**
 * The function loads the edit form for the task that is currently in detail view. The function sets a couple of variables which are given
 * as parameters to the renderEditCard() function. The variables represent the current values of the selected task. It also sets the current
 * priority and loads all contacts that are currently assigend to the task.
 * 
 * @param {number} id - id of current todo
 */
function editTask(id) {
    let title = todos[id].title;
    let description = todos[id].description;
    let date = todos[id].date;
    renderEditCard(id, title, description, date);
    setCurrentPriority(id);
    loadAssignments(id);
}


/**
 * The function sets the priority variable to the priority of the current task. It the runs the correct function to highlight the priority
 * that is currently selected.
 * 
 * @param {number} id - id of current todo
 */
function setCurrentPriority(id) {
    let priority = todos[id].priority;
    if (priority == 'urgent') {
        taskIsUrgent('urgent', 'urgent_big', 'medium', 'low');
    }
    if (priority == 'medium') {
        taskIsMedium('medium', 'medium_big', 'low', 'urgent');
    }
    if (priority == 'low') {
        taskIsLow('low', 'low_big', 'urgent', 'medium');
    }
}


/**
 * The function loads all assignment options and current assignments. It also assigns the currently assigned contacts.
 * 
 * @param {number} id - id of current todo
 */
function loadAssignments(id) {
    pushAssignedContactsToAssignments(id);
    loadAssignmentOptions();
    assignAssignedContacts(id);
}


/**
 * The function loops through the assignments of the current task. If the current contact in the loop is not included at the assignments
 * array, the contact is pushed to the assignments array.
 * 
 * @param {number} id - id of current todo
 */
function pushAssignedContactsToAssignments(id) {
    for (let i = 0; i < todos[id].assignments.length; i++) {
        const option = todos[id].assignments[i];
        if (assignments.every(a => a.firstName !== option.firstName) && assignments.every(a => a.lastName !== option.lastName)) {
            assignments.push(option);
        }
    }
}


/**
 * The function assigns all contacts of the assignments array that match a contact from the assignments of the current task.
 * 
 * @param {number} id - id of current todo
 */
function assignAssignedContacts(id) {
    for (let i = 0; i < assignments.length; i++) {
        const assignment = assignments[i];
        if (todos[id].assignments.some(a => a.firstName == assignment.firstName) && todos[id].assignments.some(a => a.lastName == assignment.lastName)) {
            assignContact(i);
        }
    }
}


/**
 * The function saves all changes to the backend if all inputs are valid
 * 
 * @param {number} id - id of the todo which got edited
 */
function saveChanges(id) {
    checkIfInvalidInput()
    checkIfInputMissingAndPushEditedTask(id);
}


/**
 * The function checks if any input-field is empty or the selected date lies in the past. If any input field is empty it resolves in setting
 * the inputMissing variable to true.
 * 
 */
function checkIfInvalidInput() {
    setInputMissingToFalse();
    checkIfEmpty('title');
    checkIfEmpty('description');
    checkDate();
    checkIfNotAssigned();
    checkIfNoPriority();
}


/**
 * The function checks the inputMissing variable. If the variable is set to false, meaning no input is missing, the changes are saved to the
 * backend database and the edit window is closed.
 * 
 * @param {number} id - id of the todo which got edited
 */
function checkIfInputMissingAndPushEditedTask(id) {
    if (inputMissing == false) {
        pushChanges(id);
    }
}


/**
 * The function gets all the values present in the input-fields at the edit todo card and saves them to the backend database. Also the edit
 * card window is closed and the detail card is shown again.d
 * 
 * @param {number} id - id of the todo which got edited
 */
function pushChanges(id) {
    getNewTitleValue(id);
    getNewDescriptionValue(id);
    getNewDateValue(id);
    getPriority();
    setPriority(id);
    getNewAssignments(id);
    showTaskCard(id);
    saveTasks();
}


/**
 * The function gets the value of the title input-field and sets the newTitle variable. If there is a new title it is set as the title of the
 *  edited todo.
 * 
 * @param {number} id - id of current todo
 */
function getNewTitleValue(id) {
    let newTitle = document.getElementById('title').value;
    if (newTitle) {
        todos[id].title = newTitle;
    }
}


/**
 * The function gets the value of the description input-field and sets the newDescription variable. If there is a new description it is set
 * as the description of the edited todo.
 * 
 * @param {number} id - id of current todo
 */
function getNewDescriptionValue(id) {
    let newDescription = document.getElementById('description').value;
    if (newDescription) {
        todos[id].description = newDescription;
    }
}


/**
 * The function gets the value of the date input-field and sets the newDate variable. If there is a new date it is set as the date of the
 * edited todo.
 * 
 * @param {number} id - id of current todo
 */
function getNewDateValue(id) {
    let newDate = document.getElementById('date').value;
    if (newDate) {
        todos[id].date = newDate;
    }
}


/**
 * The function sets the priority of the edited todo.
 * 
 * @param {number} id - id of current todo
 */
function setPriority(id) {
    todos[id].priority = priority;
}


/**
 * The function empties the assignments array of the current todo. It then loops through the assignedContacts array and pushes the contacts
 * to the assignments array of the current todo. It finishes by emptying the assignedContacts
 * 
 * @param {number} id - id of current todo
 */
function getNewAssignments(id) {
    todos[id].assignments = [];
    for (let i = 0; i < assignedContacts.length; i++) {
        const contact = assignedContacts[i];
        todos[id].assignments.push(contact);
    }
    assignedContacts = [];
}
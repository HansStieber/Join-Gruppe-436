let inputMissing;
let priority;
let id;
let progressStatus = 'todo';


/*----------- FUNCTION CREATE NEW TASK -----------*/

/**
 * Creates a new task
 */
function createNewTask() {
    checkIfEmptyField();
    closeAllDropdowns();
    checkIfInputMissingAndPushNewTask();
    //hideNewTaskCard()
}


/**
 * Checks if required inputs are still missing
 */
function checkIfEmptyField() {
    setInputMissingToFalse();
    checkIfEmpty('title');
    checkIfEmpty('description');
    checkIfEmpty('date');
    checkIfCategoryEmpty();
    checkIfNotAssigned();
    checkIfNoPriority();
}


/**
 * Sets variable inputMissing to false
 */
function setInputMissingToFalse() {
    inputMissing = false;
}


/**
 *Checks if input-field title, date or description value is null
 * 
 * @param {string} id - id of either input-field title, date or description
 */
function checkIfEmpty(id) {
    if (inputFieldIsEmpty(id)) {
        initiateAlert(id);
        setInputMissingToTrue();
    } else {
        removeAlert(id);
    }
}


/**
 * Returns if input-field title, date or description value is null
 * 
 * @param {string} id - id of either input-field title, date or description
 */
function inputFieldIsEmpty(id) {
    return !document.getElementById(id).value;
}


/**
 * Initiates Alert message for either input-field title, date or description that the field is not filled
 * 
 * @param {string} id - id of either input-field title, date or description
 */
function initiateAlert(id) {
    document.getElementById(id + '-required').classList.add('alert-color');
}


/**
 * Sets variable inputMissing to true; stops form from being submitted
 */
function setInputMissingToTrue() {
    inputMissing = true;
}


/**
 * Removes Alert message for either input-field title, date or description that the field is not filled
 * 
 * @param {string} id - id of either input-field title, date or description
 */
function removeAlert(id) {
    document.getElementById(id + '-required').classList.remove('alert-color');
}


/**
 * Checks if no category is selected at category dropdown selcetion menu; adds/removes alerts if needed; if category is empty sets inputMissing to true
 */
function checkIfCategoryEmpty() {
    if (categorySelected == false) {
        initiateAlert('category');
        setInputMissingToTrue();
    } else {
        removeAlert('category');
    }
}


/**
 * Checks if no contact is assigned at assignment dropdown selcetion menu; adds/removes alerts if needed; if no contact is assigned, sets inputMissing to true
 */
function checkIfNotAssigned() {
    if (noContactsAreAssigned()) {
        initiateAlert('assignment');
        setInputMissingToTrue();
    } else {
        removeAlert('assignment');
    }
}


/**
 * Checking length of assignedContacts to see if any contacts are assigned yet
 */
function noContactsAreAssigned() {
    return assignedContacts.length == 0;
}


/**
 * Checks if no priority is set; adds/removes alerts if needed; if priority is not set, sets inputMissing to true
 */
function checkIfNoPriority() {
    if (noPriorityIsSet()) {
        initiateAlert('priority');
        setInputMissingToTrue();
    } else {
        removeAlert('priority');
    }
}


/**
 * Checks variables urgent, medium and low are false; returns if all prioritys are false, meaning unset
 */
function noPriorityIsSet() {
    return urgent == false && medium == false && low == false;
}


/**
 * Checks if any input is missing; if not, initiates pushing new Task into array tasks
 */
function checkIfInputMissingAndPushNewTask() {
    if (inputMissing == false) {
        pushNewTask();
    } console.log(todos);
}

/**
 * Runs functions essential for submitting the form and creating a new task
 */
function pushNewTask() {
    pickSubtasks();
    pushTask();
    clearAllInputFields();
    showConfirmation();
}


/**
 * Picks subtasks which are checked and pushes them into the array subtasksChecked
 */
function pickSubtasks() {
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        if (subtask.checked == true) {
            pushCheckedSubtasksIntoArraySubtasksChecked(subtask);
        }
    }
}


/**
 * Pushes checked subtasks into array subtasksChecked
 * 
 * @param {object{}} subtask - object that gets pushed
 */
function pushCheckedSubtasksIntoArraySubtasksChecked(subtask) {
    subtasksChecked.push(subtask);
}


/**
 * Sets variables of class Task(); sets a variable newTask and pushes it into array tasks; also initiates pushing newly created category
 * 
 * @param {string} title - title for class new Task
 * @param {string} description - description for class new Task
 * @param {string} categoryTitle - title for class new Category
 * @param {string} date - date for class new Task
 * @param {object} newTask - object that includes all information of a new task;
 */
async function pushTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let categoryTitle = document.getElementById('new-category-title').innerHTML;
    let date = document.getElementById('date').value;
    getPriority();
    getId();

    let newTask = new Task(title, description, categoryTitle, assignedContacts, currentColor, date, priority, subtasksChecked, progressStatus, id);

    todos.push(newTask);
    await saveTasks();
    await saveCategories(categoryTitle);
    await saveAssignmentOptions();
}


function getPriority() {
    if (urgent == true) {
        priority = 'urgent';
    }
    if (medium == true) {
        priority = 'medium';
    }
    if (low == true) {
        priority = 'low';
    }
}

function getId() {
    id = todos.length;
}


async function saveTasks() {
    let todosAsText = JSON.stringify(todos);
    await backend.setItem('todo', todosAsText);
}


async function saveCategories(categoryTitle) {
    if (categories.every(t => t.title !== categoryTitle) && categories.every(c => c.color !== currentColor)) {
        categories.push(new Category(categoryTitle, currentColor));
    }
    let categoriesAsText = JSON.stringify(categories);
    //await backend.deleteItem('category')
    await backend.setItem('category', categoriesAsText);
}


async function saveAssignmentOptions() {
    let assignmentsAsText = JSON.stringify(assignments);
    await backend.setItem('assignments', assignmentsAsText);
}


/**
 * Sets values of all input-fields to default
 * 
 * @function 
 */
function clearAllInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    removeSelectedCategory();
    removeAllAssignments();
    unsetPriority();
    removeAllSubtasks();
}


/**
 * Sets variable categorySelected to false, meaning no category is selected currently; clears array newCategories; initiates rendering default category
 * 
 * @type {object} newCategories - array for all categories created by creating the current task 
 */
function removeSelectedCategory() {
    categorySelected = false;
    newCategories = [];
    renderDefaultCategory();
}


/**
 * Removes all assignments by clearing array assignedContacts; loads all assignment options again; closes dropdown menu
 * 
 * @parm 
 */
function removeAllAssignments() {
    assignedContacts = [];
    removeCurrentContact();
    spliceCurrentContact = false;
    loadAllOptions();
    closeDropdownAssignment();
    loadContactIcon();
}

function unsetPriority() {
    urgent = false;
    medium = false;
    low = false;
    unfocusPrio('urgent', 'medium', 'low');
    unfocusPrio('low', 'urgent', 'medium');
    unfocusPrio('medium', 'low', 'urgent');
}

function removeAllSubtasks() {
    subtasks = [];
    subtasksChecked = [];
    document.getElementById('subtasks').innerHTML = '';
}

function closeAllDropdowns() {
    closeDropdownCategory();
    closeDropdownAssignment();
}


function showConfirmation() {
    document.getElementById('task-added-to-board').classList.remove('d-none');
    document.getElementById('task-added-to-board').classList.add('slide-in');
    setTimeout(() => {
        window.location.href = 'board.html';
    }, 2000);
}

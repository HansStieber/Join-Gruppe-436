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
    loadSubtasksAtEdit(id);
    editTaskOpen = true;
    window.removeEventListener('click', eventListenerDetailView);
    setTimeout(() => {
        window.addEventListener('click', eventListenerEditTask);
    }, 10);
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


function loadSubtasksAtEdit(id) {
    pushSubtasksToSubtasks(id);
    loadSubtasks();
}

function pushSubtasksToSubtasks(id) {
    for (let i = 0; i < todos[id].subtasks.length; i++) {
        const option = todos[id].subtasks[i];
        subtasks.push(option);
    }
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
    detailViewOpen = true;
    editTaskOpen = false;
    checkIfInvalidInput()
    checkIfInputMissingAndPushEditedTask(id);
    saveToBackend();
    window.removeEventListener('click', eventListenerEditTask);
    setTimeout(() => {
        window.addEventListener('click', eventListenerDetailView);
    }, 10);
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
        setTimeout(() => {
            unsetPriorityOnly();
        }, 100);
    }
}


function unsetPriorityOnly() {
    urgent = false;
    medium = false;
    low = false;
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
    saveEditedSubtasks(id);
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


/**
 * The function empties the subtasks array of the current todo. It then loops through the subtasks array and pushes the subtasks
 * to the subtasks array of the current todo. It finishes by emptying the subtasks array.
 * 
 * @param {number} id - id of current todo
 */
function saveEditedSubtasks(id) {
    todos[id].subtasks = [];
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        todos[id].subtasks.push(subtask);
    }
    subtasks = [];
}
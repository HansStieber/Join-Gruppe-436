/**
 * The variable is true or false and is checked to see if the subtasks input-field is on focus.
 */
subtaskFocus = false;
/**
 * The variable is set to true or false and is checked to see if any required input is still missing.
 */
let inputMissing;
/**
 * The variable is set as the priority that is selected. It defines the priority of a new task.
 */
let priority;
/**
 * The variable is used to set an id for a task that gets created. The value equals the current length of the todos array.
 */
let id;
/**
 * Sets the progressStatus variable, which means that all tasks that are created are displayed at the todo column at the board.
 */
let progressStatus = 'todo';


/*----------- FUNCTION CREATE NEW TASK -----------*/
/**
 * Adds an event listener that listens on the keydown event of the enter key. If the enter key is pressed and the subtask input-field contains
 * no value, a new Task is created. If the enter key is pressed, the current location is on board.html and there is no subtask input-field
 * available, you are currently at edit contact at board.html and the saveChanges() function runs.
 */
window.addEventListener('keydown', (e) => {
    if (document.getElementById('subtask')) {
        if (e.keyCode == 13 && !document.getElementById('subtask').value) {
            createNewTask();
        }
    }
    if (e.keyCode == 13 && location.href.includes('board') && !document.getElementById('subtask')) {
        saveChanges(taskToEdit);
    }
});


/* doesnt work properly yet
window.addEventListener('click', (e) => {
    if (!document.getElementById('category-options').contains(e.target) && !document.getElementById('option-category').contains(e.target)) {
        closeDropdownCategory();
    }
    
});
*/


/**
 * Adds an event listener that listens on the click event on window. If the the user clicks on the window but not on the content of the assignment
 * dropdown menu, the dropdown closes
 */
window.addEventListener('click', (e) => {
    if (!document.getElementById('contacts-dropdown-container').contains(e.target) && !document.getElementById('option-assignments').contains(e.target)) {
        closeDropdownAssignment();
    }

});


/**
 * The Function iniates a couple of functions to create a new task.
 */
function createNewTask() {
    checkIfEmptyField();
    closeAllDropdowns();
    checkIfInputMissingAndPushNewTask();
}


/**
 * The function checks if required inputs are still missing.
 */
function checkIfEmptyField() {
    setInputMissingToFalse();
    checkIfEmpty('title');
    checkIfEmpty('description');
    checkDate();
    checkIfCategoryEmpty();
    checkIfNotAssigned();
    checkIfNoPriority();
}


/**
 * The function sets the variable inputMissing to false.
 */
function setInputMissingToFalse() {
    inputMissing = false;
}


/**
 * The function cecks if input-field title, date or description input-fields are not filled yet. If not the function initiates an alert message.
 * That is displayed under the input-field.
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
 * The Function checks if the input-field date value is undefined or the date lies in the past. If that is the case, alerts are triggered.
 */
function checkDate() {
    if (inputFieldIsEmpty('date')) {
        setInputMissingToTrue();
        initiateAlert('date');
    } else {
        checkIfDateLiesInPast();
    }
}


/**
 * The function checks if the date that was typed into the date input-field lies in the past or not. If yes, an alert is triggered.
 */
function checkIfDateLiesInPast() {
    let date = document.getElementById('date').value;
    let today = new Date();
    if (new Date(date) <= today) {
        setInputMissingToTrue();
        alertWrongDate();
    } else {
        removeAlertWrongDate();
    }
}


/**
 * The function returns if input-field title, date or description value is undefined, meaning the field has not been filled.
 * 
 * @param {string} id - id of either input-field title, date or description
 */
function inputFieldIsEmpty(id) {
    return !document.getElementById(id).value;
}


/**
 * The function initiates an alert message for either input-field title, date or description that the field is not filled.
 * 
 * @param {string} id - id of either input-field title, date or description
 */
function initiateAlert(id) {
    document.getElementById(id + '-required').classList.add('alert-color');
    document.getElementById(id + '-required').classList.add('alert-height');
    if (document.getElementById('category-required')) {
        document.getElementById('category-required').innerHTML = `Please enter a category name first`;
    }
}


/**
 * The function initiates an alert message for the date input-field that the date must lie in the future.
 */
function alertWrongDate() {
    document.getElementById('date-required').classList.add('alert-color');
    document.getElementById('date-required').classList.add('alert-height');
    document.getElementById('date-required').innerHTML = 'Please don`t choose any past date';
}


/**
 * The function removes the alert message for the date input-field that the date must lie in the future.
 */
function removeAlertWrongDate() {
    document.getElementById('date-required').classList.remove('alert-color');
    document.getElementById('date-required').classList.remove('alert-height');
    document.getElementById('date-required').innerHTML = 'Please select date first';
}


/**
 * Sets variable inputMissing to true and stops the form from being submitted.
 */
function setInputMissingToTrue() {
    inputMissing = true;
}


/**
 * Removes Alert message for either input-field title, date or description that the field is not filled.
 * 
 * @param {string} id - id of either input-field title, date or description
 */
function removeAlert(id) {
    document.getElementById(id + '-required').classList.remove('alert-color');
    document.getElementById(id + '-required').classList.remove('alert-height');
}


/**
 * The function checks if no category is selected at the category dropdown selcetion menu. It also adds/removes alerts if needed. If a category
 * is not selected yet it sets the inputMissing variable to true.
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
 * The function checks if no contact is assigned at assignment dropdown selcetion menu. It also adds/removes alerts if needed. If no contact
 * is assigned, it sets the inputMissing variable to true.
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
 * The function checks the length of the assignedContacts array to see if any contacts are assigned yet.
 */
function noContactsAreAssigned() {
    return assignedContacts.length == 0;
}


/**
 * The function checks if no priority is set. It also adds/removes alerts if needed. If the priority is not set yet, it sets the inputMissing variable
 * to true.
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
 * The function checks if the variables urgent, medium and low are false. It returns if all prioritys are false, which means no priority has
 * been set.
 */
function noPriorityIsSet() {
    return urgent == false && medium == false && low == false;
}


/**
 * The function checks if any input is missing. If no input is missing, it initiates pushing a new Task into the array todos.
 */
function checkIfInputMissingAndPushNewTask() {
    if (inputMissing == false) {
        pushNewTask();
    }
}


/**
 * The function initiates functions essential for submitting the form and creating a new task.
 */
async function pushNewTask() {
    pickSubtasks();
    await pushTask();
    clearAllInputFields();
    showConfirmation();
}


/**
 * The function loops through the subtasks array and picks all subtasks which are checked and pushes them into the array subtasksChecked. 
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
 * The function pushes checked subtasks into array subtasksChecked.
 * 
 * @param {object{}} subtask - object that gets pushed
 */
function pushCheckedSubtasksIntoArraySubtasksChecked(subtask) {
    subtasksChecked.push(subtask.title);
}


/**
 * The function clears all input-fields by setting there value to default, meaning no values are set.
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
 * The function sets the variable categorySelected to false, meaning no category is selected currently. It also clears the array newCategories
 * and initiates rendering the default category.
 */
function removeSelectedCategory() {
    categorySelected = false;
    newCategories = [];
    renderDefaultCategory();
}


/**
 * The function removes all assignments by clearing the array assignedContacts. It also loads all assignment options and closes the assignments
 * dropdown menu.
 */
function removeAllAssignments() {
    assignedContacts = [];
    removeCurrentContact();
    spliceCurrentContact = false;
    loadAllOptions();
    closeDropdownAssignment();
    loadContactIcon();
}


/**
 * The function removes all subtasks from the subtasks and subtasksChecked arrays and also clears the value of the subtasks container.
 */
function removeAllSubtasks() {
    subtasks = [];
    subtasksChecked = [];
    document.getElementById('subtasks').innerHTML = '';
}


/**
 * The function initiates closing all dropdown menus.
 */
function closeAllDropdowns() {
    closeDropdownCategory();
    closeDropdownAssignment();
}


/**
 * The Function slides in the confirmation button and then loads the board.html page.
 */
function showConfirmation() {
    document.getElementById('task-added-to-board').classList.remove('d-none');
    document.getElementById('task-added-to-board').classList.add('slide-in');
    setTimeout(() => {
        window.location.href = 'board.html';
    }, 2000);
}

/**
 * This array contains all subtasks created for the current task.
 */
let subtasks = [];
/**
 * This array contains all subtasks that are checked, meaning assigned to the current task.
 */
let subtasksChecked = [];


/*----------- ADD NEW SUBTASK -----------*/
/**
 * Adds an event listener that listens on the keydown event of the enter key. If the enter key is pressed and the subtask input-field contains
 * any value, a new subtask is created.
 */
window.addEventListener('keydown', (e) => {
    if (document.getElementById('subtask')) {
        if (e.keyCode == 13 && document.getElementById('subtask').value) {
            addNewSubtask();
        }
    }
});


/**
 * The function runs when a new subtask should be created. It adds and removes the d-none class to/from different elements to show the
 * subtasks input-field.
 */
function createNewSubtask() {
    document.getElementById('icon-plus').classList.add('d-none');
    document.getElementById('close-subtask-icon').classList.remove('d-none');
    document.getElementById('border-small').classList.remove('d-none');
    document.getElementById('create-subtask-icon').classList.remove('d-none');
}


/**
 * The fucntion runs when the creation of a new subtask is aborted. It adds and removes the d-none class to/from different elements to hide
 * the subtasks input-field.
 */
function closeNewSubtask() {
    document.getElementById('icon-plus').classList.remove('d-none');
    document.getElementById('close-subtask-icon').classList.add('d-none');
    document.getElementById('border-small').classList.add('d-none');
    document.getElementById('create-subtask-icon').classList.add('d-none');
}


/**
 * The function creates a new subtask. It pushes the subtask into the subtasks array, clears the input-field values, hides the subtask
 * input-field and finally loads all subtasks so they are visible for the user.
 */
function addNewSubtask() {
    if (inputFieldIsEmpty('subtask')) {
        initiateAlert('subtask');
    } else {
        pushNewSubtask();
        removeValues();
        closeNewSubtask();
        loadSubtasks();
        removeAlert('subtask');
    }
}


/**
 * The function sets the title of the subtask and sets the checked variable to false. It then creates a new subtask with the Subtask class
 * and pushes the task into the subtasks array.
 */
function pushNewSubtask() {
    let title = document.getElementById('subtask').value;
    let checked = false
    let newSubtask = new Subtask(title, checked);
    subtasks.push(newSubtask);
}


/**
 * The function clears all input-values at the subtask input-field.
 */
function removeValues() {
    document.getElementById('subtask').value = '';
}


/**
 * The function clears the subtasks Element inner html and then loops through the subtasks array to render all current subtasks.
 */
function loadSubtasks() {
    document.getElementById('subtasks').innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        renderSubtasks(subtask, i);
        if (subtask.checked) {
            selectSubtask(i);
        }
    }
}


/**
 * The function selects a subtask by setting its checked status to true. The subtask is found by setting i as its index at the subtasks array.
 * It also adds a "ticked" icon to the checkbox by removing a d-none class to the belonging element to show that the subtask is selected. It
 * further adds an onclick function for removing the selction of the subtask again if needed. Also i is used to pick the right elements by
 * their unique id´s which identify every subtask
 * 
 * @param {number} i - index of the subtask in the subtasks array
 */
function selectSubtask(i) {
    subtasks[i].checked = true;
    document.getElementById('checkbox-subtask' + i).classList.remove('d-none');
    document.getElementById('checkbox-subtask-unchecked' + i).setAttribute('onclick', `removeSelection('${i}')`);
}


/**
 * The function removes a subtask by setting its checked status to false. The subtask is found by setting i as its index at the subtasks
 * array. It also removes a "ticked" icon from the checkbox by adding a d-none class to the belonging element to show that the subtask is
 * not selected. It further adds an onclick function for selecting the subtask again if needed. Also i is used to pick the right elements
 * by their unique id´s which identify every subtask.
 * 
 * @param {number} i - index of the subtask in the subtasks array
 */
function removeSelection(i) {
    subtasks[i].checked = false;
    document.getElementById('checkbox-subtask' + i).classList.add('d-none');
    document.getElementById('checkbox-subtask-unchecked' + i).setAttribute('onclick', `selectSubtask('${i}')`);
}
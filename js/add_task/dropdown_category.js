let tasks = [];
let colors = ['orange', 'violet', 'cyan', 'gold', 'blue', 'light-blue', 'green', 'red'];
let newCategories = [];
let categories = [
    new Category('Design', 'orange'),
    new Category('Sales', 'violet'),
    new Category('Backoffice', 'cyan'),
    new Category('Media', 'gold'),
    new Category('Marketing', 'blue')
];
let currentColor;
let categoryOpen = false;
let categorySelected = false;
let contactsOpen = false;
let assignedContacts = [];
let urgent = false;
let medium = false;
let low = false;
let subtasks = [];
let subtasksChecked = [];
let inputMissing;


/*----------- INITIALIZING CONTENT OF THE PAGE -----------*/
/**
 * Function load() loads all templates that are included in this page (sidebar, header);
 * Function loadAllOptions loads all options of dropdown menus that are available in add_task.html
 */
async function init() {
    await load();
    loadAllOptions();
}


/*----------- FUNCTION CREATE NEW TASK -----------*/
/**
 * Creates a new task
 */
function createNewTask() {
    checkIfEmptyField();
    closeAllDropdowns();
    checkIfInputMissingAndPushNewTask();
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
    return document.getElementById(id).value == '';
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
 * 
 * @returns - 
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
    } console.log(tasks);
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
 * Sets variables of class Task() and pushes a newTask into array tasks; also initiates pushing newly created category
 */
function pushTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let categoryTitle = document.getElementById('new-category-title').innerHTML;
    let date = document.getElementById('date').value;

    let newTask = new Task(title, description, categoryTitle, assignedContacts, currentColor, date, urgent, medium, low, subtasksChecked);

    tasks.push(newTask);
    
    pushNewCategories(categoryTitle);
}


/**
 * Pushes newly created category into array categories by using class Category()
 * 
 * @param {string} categoryTitle - name of the new category
 * @param {string} currentColor - name of the color of the new category
 */
function pushNewCategories(categoryTitle) {
    categories.push(new Category(categoryTitle, currentColor));
}


/**
 * Sets values of all input-fields to default
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
 * Sets variable categorySelected to false, meaning no category is selecte currently; clears array newCategories; initiates rendering default category
 * 
 * @
 * @param {object[]} - 
 */
function removeSelectedCategory() {
    categorySelected = false;
    newCategories = [];
    renderDefaultCategory();
}


/**
 * Removes all assignments by clearing array assignedContacts; 
 */
function removeAllAssignments() {
    assignedContacts = [];
    loadAllOptions();
    closeDropdownAssignment();
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
    }, 200000);
}


/*----------- HOVER EFFECTS PRIORITY BUTTONS -----------*/
function hover(id, path) {
    document.getElementById('prio-' + id).src = `assets/img/${path}_hover.svg`;
}

function leave(id, path) {
    document.getElementById('prio-' + id).src = `assets/img/${path}.svg`;
}


/*----------- LOADING OPTIONS OF DROPDOWN SELECTION MENUS -----------*/
function loadAllOptions() {

    loadCategoryColors();
    loadCategoryOptions();
    loadAssignmentOptions();
}

function loadCategoryOptions() {
    for (let i = 0; i < categories.length; i++) {
        const option = categories[i];
        if (lastCategoryOption(i)) {
            renderLastCategoryOption(option, i);
        } else {
            renderCategoryOptions(option, i);
        }
    }
}

function loadCategoryColors() {
    document.getElementById('color-selection-container').innerHTML = '';
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        renderCategoryColors(color, i)
    }
}

function lastCategoryOption(i) {
    return i == categories.length - 1;
}


function loadAssignmentOptions() {
    document.getElementById('contacts-dropdown-container').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const option = contacts[i];
        if (option.phone) {
            renderAssignmentOptions(option, i);
        }
    }
}


/*----------- OPEN DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
function openDropdownCategory() {
    loadAllOptions();
    closeDropdownAssignment();
    showCategoryOptions();
    addCloseCategoriesFunction();
    categoryOpen = true;
}

function showCategoryOptions() {
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('c-option' + i).classList.remove('d-none');
    }
    document.getElementById('create-new-category').classList.remove('d-none');
    playOpenDropdownAnimation('options-category');
}

function addCloseCategoriesFunction() {
    document.getElementById('select-category-container').setAttribute('onclick', 'closeDropdownCategory()');
}

function playOpenDropdownAnimation(id) {
    document.getElementById(id).classList.add('scale-up-ver-top');
    document.getElementById(id).classList.remove('scale-down-ver-top');
}


/*----------- CLOSE DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
function closeDropdownCategory() {
    hideCategoryOptions();
    addOpenCategoriesFunction();
    categoryOpen = false;
}

function hideCategoryOptions() {
    for (let i = 0; i < categories.length; i++) {
        if (containerWithTargetedIdsExists('c', i)) {
            document.getElementById('c-option' + i).classList.add('d-none');
        }
    }
    document.getElementById('create-new-category').classList.add('d-none');
    if (categoryOpen == true) {
        playCloseDropdownAnimation('options-category');
    }
}

function containerWithTargetedIdsExists(x, i) {
    return typeof (document.getElementById(x + '-option' + i)) != 'undefined' && document.getElementById(x + '-option' + i) != null
}

function addOpenCategoriesFunction() {
    document.getElementById('select-category-container').setAttribute('onclick', 'openDropdownCategory()');
}

function playCloseDropdownAnimation(id) {
    document.getElementById(id).classList.remove('scale-up-ver-top');
    document.getElementById(id).classList.add('scale-down-ver-top');
}


/*----------- CREATE NEW CATEGORY FOR SELECTION -----------*/
function createNewCategory() {
    showInputField('category');
    showColorSelection();
    hideDefaultInput('category');
    closeDropdownCategory();
}

function showInputField(id) {
    document.getElementById('new-' + id).classList.remove('d-none');
    document.getElementById('new-' + id + '-container').classList.remove('d-none');
}

function showColorSelection() {
    document.getElementById('color-selection-container').classList.remove('d-none');
}

function hideDefaultInput(id) {
    document.getElementById(id + '-options-container').classList.add('d-none');
}

function closeNewCategory() {
    hideInputField('category');
    hideColorSelection();
    showDefaultInput('category');
}

function hideInputField(id) {
    document.getElementById('new-' + id).value = '';
    document.getElementById('new-' + id).classList.add('d-none');
    document.getElementById('new-' + id + '-container').classList.add('d-none');
}

function hideColorSelection() {
    document.getElementById('color-selection-container').classList.add('d-none');
}

function showDefaultInput(id) {
    document.getElementById('options-' + id).classList.remove('scale-down-ver-top');
    document.getElementById(id + '-options-container').classList.remove('d-none');
}

/*----------- ADD NEW CATEGORY -----------*/
function addNewCategory() {
    let title = document.getElementById('new-category').value;

    if (!title == '' && !currentColor == '') {
        categorySelected = true;
        let newCategory = new Category(title, currentColor);
        newCategories.push(newCategory);

        document.getElementById('new-category').value = '';

        showCategories();
        hideInputField('category');
        hideColorSelection();
        renderSelectedCategory(title, currentColor);
    }
    console.log(newCategories);


}

function showCategories() {
    document.getElementById('category-options-container').classList.remove('d-none');
}


/*----------- SETTING CURRENTCOLOR -----------*/
/**
 * Sets the parameter currentColor to the 
 * 
 * @param {string} color - 
 * @param {number} i 
 */
function setCurrentColor(color, i) {
    currentColor = color;

    highlightCurrentColor(i);
}



function highlightCurrentColor(i) {
    document.getElementById('color' + i).classList.add('highlight');
}


/*----------- ADD NEW CATEGORY -----------*/
function selectCategory(title, color) {
    categorySelected = true;
    currentColor = color;
    renderSelectedCategory(title, color);
    closeDropdownCategory();
}


/*----------- OPEN DROPDOWN MENU FOR ASSIGNMENT -----------*/
function openDropdownAssignment() {
    closeDropdownCategory();
    showAssignmentOptions();
    addCloseContactsFunction();
    contactsOpen = true;
}

function showAssignmentOptions() {
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('a-option' + i).classList.remove('d-none');
    }
    document.getElementById('invite-new-contact').classList.remove('d-none');
    playOpenDropdownAnimation('options-contact');
}

function addCloseContactsFunction() {
    document.getElementById('select-contact-container').setAttribute('onclick', 'closeDropdownAssignment()');
}


/*----------- CLOSE DROPDOWN MENU FOR ASSIGNMENT -----------*/
function closeDropdownAssignment() {
    hideAssignmentOptions();
    addOpenContactsFunktion();
    contactsOpen = false;
}


function hideAssignmentOptions() {
    for (let i = 0; i < contacts.length; i++) {
        if (containerWithTargetedIdsExists('a', i)) {
            document.getElementById('a-option' + i).classList.add('d-none');
        }
    }
    document.getElementById('invite-new-contact').classList.add('d-none');
    if (contactsOpen == true) {
        playCloseDropdownAnimation('options-contact');
    }
}

function containerWithTargetedIdsExists(x, i) {
    return typeof (document.getElementById(x + '-option' + i)) != 'undefined' && document.getElementById(x + '-option' + i) != null
}

function addOpenContactsFunktion() {
    document.getElementById('select-contact-container').setAttribute('onclick', 'openDropdownAssignment()');
}

/*----------- ASSIGN CONTACT FOR TASK -----------*/
function assignContact(i) {
    document.getElementById('checkbox' + i).classList.remove('d-none');
    let fN = contacts[i].firstName.toLowerCase();
    let lN = contacts[i].lastName.toLowerCase();
    assignedContacts.push(contacts[i]);
    console.log(assignedContacts);
    document.getElementById('a-option' + i).setAttribute('onclick', `removeAssignment(${i}, '${fN}', '${lN}')`);
}

function removeAssignment(i, fN, lN) {
    document.getElementById('checkbox' + i).classList.add('d-none');
    document.getElementById('a-option' + i).setAttribute('onclick', `assignContact(${i})`);
    for (let i = 0; i < assignedContacts.length; i++) {
        const contact = assignedContacts[i];
        if (contact.firstName.toLowerCase().includes(fN) && contact.lastName.toLowerCase().includes(lN)) {
            assignedContacts.splice(i, 1);
        }
    }
    console.log(assignedContacts);
}

/*----------- ASSIGN CONTACT FOR TASK -----------*/
function inviteNewContact() {
    document.getElementById('new-contact-container').classList.add('margin-bottom-zero');
    closeDropdownAssignment();
    showInputField('contact');
    hideDefaultInput('contact');
}

function closeInviteContact() {
    hideInputField('contact');
    showDefaultInput('contact');
}


/*----------- SET PRIORITY -----------*/
function taskIsUrgent(id, path, id2, id3) {
    urgent = true;
    medium = false;
    low = false;
    setImgSelected(id, path, id2, id3);
}

function setImgSelected(id, path, id2, id3) {
    document.getElementById('prio-' + id).src = `assets/img/${path}_selected.svg`;
    focusPrio(id, id2, id3);
    unfocusPrio(id2, id, id3);
    unfocusPrio(id3, id, id2);
    console.log(urgent, medium, low)
}

function focusPrio(id, id2, id3) {
    document.getElementById('prio-' + id).setAttribute('onmouseover', '');
    document.getElementById('prio-' + id).setAttribute('onmouseout', '');
    document.getElementById('prio-' + id).setAttribute('onclick', `unfocusPriority('${id}', '${id2}', '${id3}')`);
}

function unfocusPrio(id, id2, id3) {
    document.getElementById('prio-' + id).setAttribute('onmouseover', `hover('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).setAttribute('onmouseout', `leave('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).src = `assets/img/${id}_big.svg`;
}

function unfocusPriority(id, id2, id3) {
    urgent = false;
    medium = false;
    low = false;
    let firstLeter = id.charAt(0);
    let fLUppercase = firstLeter.toUpperCase();
    let newId = fLUppercase + id.substring(1);
    document.getElementById('prio-' + id).src = `assets/img/${id}_big.svg`;
    document.getElementById('prio-' + id).setAttribute('onclick', `taskIs${newId}('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).setAttribute('onmouseover', `hover('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).setAttribute('onmouseout', `leave('${id}', '${id}_big', '${id2}', '${id3}')`);
    console.log(urgent, medium, low)
}

function taskIsMedium(id, path, id2, id3) {
    urgent = false;
    medium = true;
    low = false;
    setImgSelected(id, path, id2, id3);
}

function taskIsLow(id, path, id2, id3) {
    urgent = false;
    medium = false;
    low = true;
    setImgSelected(id, path, id2, id3);
}

/*----------- ADD NEW SUBTASK -----------*/
function createNewSubtask() {
    document.getElementById('icon-plus').classList.add('d-none');
    document.getElementById('close-subtask-icon').classList.remove('d-none');
    document.getElementById('border-small').classList.remove('d-none');
    document.getElementById('create-subtask-icon').classList.remove('d-none');
}

function closeNewSubtask() {
    document.getElementById('icon-plus').classList.remove('d-none');
    document.getElementById('close-subtask-icon').classList.add('d-none');
    document.getElementById('border-small').classList.add('d-none');
    document.getElementById('create-subtask-icon').classList.add('d-none');
}

function addNewSubtask() {
    let title = document.getElementById('subtask').value;
    let checked = false
    let newSubtask = new Subtask(title, checked);
    subtasks.push(newSubtask);

    document.getElementById('subtask').value = '';
    
    document.getElementById('subtasks').innerHTML = '';
    closeNewSubtask();
    loadSubtasks();

    console.log(subtasks);
}

function loadSubtasks() {
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        renderSubtasks(subtask, i);
    }
}

function selectSubtask(i) {
    subtasks[i].checked = true;
    document.getElementById('checkbox-subtask' + i).classList.remove('d-none');
    document.getElementById('checkbox-subtask-unchecked' + i).setAttribute('onclick', `removeSelection('${i}')`);
}

function removeSelection(i) {
    subtasks[i].checked = false;
    document.getElementById('checkbox-subtask' + i).classList.add('d-none');
    document.getElementById('checkbox-subtask-unchecked' + i).setAttribute('onclick', `selectSubtask('${i}')`);
}


/*----------- TEMPLATES -----------*/

/*----------- TEMPLATES FOR CATEGORY SELECTION -----------*/
function renderCategoryOptions(option, i) {
    document.getElementById('options-category').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable" onclick="selectCategory('${option.title}', '${option.color}')">
        <span>${option.title}</span><div class="color ${option.color}"></div>
    </div>
`;
}


function renderLastCategoryOption(option, i) {
    document.getElementById('options-category').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable last-option" onclick="selectCategory('${option.title}', '${option.color}')">
        <span>${option.title}</span><div class="color ${option.color}"></div>
    </div>
    `;
}


function renderSelectedCategory(title, color) {
    document.getElementById('category').innerHTML = `
    <span id="new-category-title">${title}</span><div class="color ${color}"></div>
    `;
}

function renderDefaultCategory() {
    document.getElementById('category').innerHTML = `
    <span id="new-category-title">Select task category</span><div class="color"></div>
    `;
}


/*----------- TEMPLATES FOR CATEGORY COLOR SELECTION CONTAINER -----------*/
function renderCategoryColors(color, i) {
    document.getElementById('color-selection-container').innerHTML += `
    <div id="${'color' + i}" class="color ${color}" onclick="setCurrentColor('${color}', '${i}')"></div>
`;
}


/*----------- TEMPLATES FOR ASSIGNING CONTACT -----------*/
function renderAssignmentOptions(option, i) {
    document.getElementById('contacts-dropdown-container').innerHTML += `
    <div id="${'a-option' + i}" class="option d-none selectable checkbox-contacts" onclick="assignContact(${i})">
        <span>${option.firstName + ' ' + option.lastName}</span>
        <div class="checkbox-contacts-unchecked">
            <div id="${'checkbox' + i}" class="checkbox-contacts-checked d-none"></div>
        </div>
    </div>
`;
}


/*----------- TEMPLATES FOR SUBTASKS -----------*/
function renderSubtasks(subtask, i) {
    document.getElementById('subtasks').innerHTML += `
    <div id="${'st-option' + i}" class="subtask selectable checkbox-subtasks">
        <div id="${'checkbox-subtask-unchecked' + i}" class="checkbox-subtasks-unchecked" onclick="selectSubtask('${i}')">
            <img id="${'checkbox-subtask' + i}" class="d-none confirm-subtask" src="assets/img/confirm.svg">
        </div>
        <span>${subtask.title}</span>
    </div>
    `;
}

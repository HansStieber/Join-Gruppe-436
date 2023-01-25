let tasks = [];
let colors = ['orange', 'violet', 'cyan', 'gold', 'blue', 'light-blue'];
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
let inputMissing;



function setCurrentColor(color, i) {
    currentColor = color;

    highlightCurrentColor(i);
}

function highlightCurrentColor(i) {
    document.getElementById('color' + i).classList.add('highlight');
}


/*----------- FUNCTION CREATE NEW TASK -----------*/
function createNewTask() {
    checkIfEmptyField();
    //closeAllDropdowns();
    if (inputMissing == false) {
        pushNewTask();
    } console.log(tasks);


}

function checkIfEmptyField() {
    inputMissing = false;
    checkIfEmpty('title');
    checkIfEmpty('description');
    checkIfEmpty('date');
    checkIfCategoryEmpty();
}

function checkIfEmpty(id) {
    if (document.getElementById(id).value == '') {
        document.getElementById(id + '-required').classList.add('alert-color');
        inputMissing = true;
    } else {
        document.getElementById(id + '-required').classList.remove('alert-color');
    }
}

function checkIfCategoryEmpty() {
    if (categorySelected == false) {
        document.getElementById('category-required').classList.add('alert-color');
        inputMissing = true;
    } else {
        document.getElementById('category-required').classList.remove('alert-color');
    }
}

function pushNewTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let categoryTitle = document.getElementById('new-category-title').innerHTML;
    let date = document.getElementById('date').value;

    let newTask = new Task(title, description, categoryTitle, assignedContacts, currentColor, date);
    tasks.push(newTask);
    clearAllInputFields();
}

function clearAllInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    removeSelectedCategory();
    removeAllAssignments();
}

function removeSelectedCategory() {
    categorySelected = false;
    renderDefaultCategory();
}

function removeAllAssignments() {
    assignedContacts = [];
    loadAllOptions();
}

function closeAllDropdowns() {
    closeDropdownCategory();
    closeDropdownAssignment();
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
    playOpenDropdownAnimation('options');
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
        if (containerWithTargetedIdsExists(i)) {
            document.getElementById('c-option' + i).classList.add('d-none');
        }
    }
    document.getElementById('create-new-category').classList.add('d-none');
    if (categoryOpen == true) {
        playCloseDropdownAnimation('options');
    }
}

function containerWithTargetedIdsExists(i) {
    return typeof (document.getElementById('c-option' + i)) != 'undefined' && document.getElementById('c-option' + i) != null
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
    showInputField();
    showColorSelection();
    hideCategories();
    closeDropdownCategory();
}

function showInputField() {
    document.getElementById('new-category').classList.remove('d-none');
    document.getElementById('new-category-container').classList.remove('d-none');
}

function showColorSelection() {
    document.getElementById('color-selection-container').classList.remove('d-none');
}

function hideCategories() {
    document.getElementById('category-options-container').classList.add('d-none');
}

function closeNewCategory() {
    hideInputField();
    hideColorSelection();
    showCategorySelection();
}

function hideInputField() {
    document.getElementById('new-category').value = '';
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('new-category-container').classList.add('d-none');
}

function hideColorSelection() {
    document.getElementById('color-selection-container').classList.add('d-none');
}

function showCategorySelection() {
    document.getElementById('category-options-container').classList.remove('d-none');
}

/*----------- ADD NEW CATEGORY -----------*/
function addNewCategory() {
    let title = document.getElementById('new-category').value;

    if (!title == '' && !currentColor == '') {
        categorySelected = true;
        let newCategory = new Category(title, currentColor);
        categories.push(newCategory);

        document.getElementById('new-category').value = '';

        showCategories();
        hideInputField();
        hideColorSelection();
        renderSelectedCategory(title, currentColor);
    }
    console.log(categories);


}

function showCategories() {
    document.getElementById('category-options-container').classList.remove('d-none');
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
    loadAllOptions();
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
    playOpenDropdownAnimation('options-contacts');
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
        document.getElementById('a-option' + i).classList.add('d-none');
    }
    document.getElementById('invite-new-contact').classList.add('d-none');
    if (contactsOpen == true) {
        playCloseDropdownAnimation('options-contacts');
    }
}

function addOpenContactsFunktion() {
    document.getElementById('select-contact-container').setAttribute('onclick', 'openDropdownAssignment()');
}

/*----------- ASSIGN CONTACT FOR TASK -----------*/
function assignContact(i) {
    document.getElementById('checkbox' + i).classList.remove('d-none');
    assignedContacts.push(contacts[i]);
    let indexOfPushedContact = assignedContacts.length - 1;
    console.log(assignedContacts);
    document.getElementById('a-option' + i).setAttribute('onclick', `removeAssignment(${i}, ${indexOfPushedContact})`);
}

function removeAssignment(i, index) {
    document.getElementById('checkbox' + i).classList.add('d-none');
    document.getElementById('a-option' + i).setAttribute('onclick', `assignContact(${i})`);
    assignedContacts.splice(index, 1);
    console.log(assignedContacts);
}

/*----------- TEMPLATES -----------*/

/*----------- TEMPLATES FOR CATEGORY SELECTION -----------*/
function renderCategoryOptions(option, i) {
    document.getElementById('options').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable" onclick="selectCategory('${option.title}', '${option.color}')">
        <span>${option.title}</span><div class="color ${option.color}"></div>
    </div>
`;
}


function renderLastCategoryOption(option, i) {
    document.getElementById('options').innerHTML += `
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
    <div id="${'a-option' + i}" class="option d-none selectable checkbox-container" onclick="assignContact(${i})">
        <span>${option.firstName + ' ' + option.lastName}</span>
        <div class="checkbox-unchecked">
            <div id="${'checkbox' + i}" class="checkbox-checked d-none"></div>
        </div>
    </div>
`;
}

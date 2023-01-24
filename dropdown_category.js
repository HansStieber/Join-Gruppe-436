let tasks = [];
let categories = [];


/*----------- FUNCTION CREATE NEW TASK -----------*/
function createNewTask() {
    checkIfEmptyField();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.get

    let date = document.getElementById('date').value;

    if (!title == '' | !description == '' | !date == '') {
let newTask = new Task(title, description, date);
    tasks.push(newTask);
    }

    


    console.log(tasks);
    clearAllInputFields();
}

function checkIfEmptyField() {
    checkIfEmpty('title');
    checkIfEmpty('description');
    checkIfEmpty('category');
    checkIfEmpty('date');
}

function checkIfEmpty(id) {
    if (document.getElementById(id).value == '') {
        document.getElementById(`${id}` + '-required').classList.add('alert-color');
    } else {
        document.getElementById(`${id}` + '-required').classList.remove('alert-color');
    }
}

function clearAllInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
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


function lastCategoryOption(i) {
    return i == categories.length - 1;
}


function loadAssignmentOptions() {
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
}

function showCategoryOptions() {
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('c-option' + i).classList.remove('d-none');
    }
    document.getElementById('create-new-category').classList.remove('d-none');
}

function addCloseCategoriesFunction() {
    document.getElementById('select-category-container').setAttribute('onclick', 'closeDropdownCategory()');
}


/*----------- CLOSE DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
function closeDropdownCategory() {
    hideCategoryOptions();
    addOpenCategoriesFunction();
}

function hideCategoryOptions() {
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('c-option' + i).classList.add('d-none');
    }
    document.getElementById('create-new-category').classList.add('d-none');
}

function addOpenCategoriesFunction() {
    document.getElementById('select-category-container').setAttribute('onclick', 'openDropdownCategory()');
}


/*----------- CREATE NEW CATEGORY FOR SELECTION -----------*/
function createNewCategory() {
    showInputField();
    showColorSelection();
    hideCategories();
    closeDropdownCategory();
}

function showInputField() {
    document.getElementById('category').classList.remove('d-none');
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
    showCategorySelection();
}

function hideInputField() {
    document.getElementById('category').value = '';
    document.getElementById('category').classList.add('d-none');
    document.getElementById('new-category-container').classList.add('d-none');
}

function showCategorySelection() {
    document.getElementById('category-options-container').classList.remove('d-none');
}

/*----------- ADD NEW CATEGORY -----------*/
function addNewCategory() {
    let title = document.getElementById('category').value;

    let newCategory = new Category(title);

    categories.push(newCategory);

    console.log(categories);
}


/*----------- OPEN DROPDOWN MENU FOR ASSIGNMENT -----------*/
function openDropdownAssignment() {
    loadAllOptions();
    closeDropdownCategory();
    showAssignmentOptions();
    addCloseContactsFunction();
}

function showAssignmentOptions() {
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('a-option' + i).classList.remove('d-none');
    }
    document.getElementById('invite-new-contact').classList.remove('d-none');
}

function addCloseContactsFunction() {
    document.getElementById('select-contact-container').setAttribute('onclick', 'closeDropdownAssignment()');
}


/*----------- CLOSE DROPDOWN MENU FOR ASSIGNMENT -----------*/
function closeDropdownAssignment() {
    hideAssignmentOptions();
    addOpenContactsFunktion();
}


function hideAssignmentOptions() {
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('a-option' + i).classList.add('d-none');
    }
    document.getElementById('invite-new-contact').classList.add('d-none');
}

function addOpenContactsFunktion() {
    document.getElementById('select-contact-container').setAttribute('onclick', 'openDropdownAssignment()');
}






/*----------- FUNCTIONS TO ADD TASK -----------*/
function addToTasks() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');

    let task = {
        'title': title.value,
        'description': description.value
    };

    tasks.push(task);
    console.log(tasks);
}



/*----------- TEMPLATES -----------*/

/*----------- TEMPLATES FOR CATEGORY SELECTION -----------*/
function renderCategoryOptions(option, i) {
    document.getElementById('options').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable">
        <span>${option['title']}</span>
    </div>
`;
}


function renderLastCategoryOption(option, i) {
    document.getElementById('options').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable last-option">
        <span>${option['title']}</span>
    </div>
    `;
}


/*----------- TEMPLATES FOR ASSIGNING CONTACT -----------*/
function renderAssignmentOptions(option, i) {
    document.getElementById('contacts-dropdown-container').innerHTML += `
    <div id="${'a-option' + i}" class="option d-none selectable">
        <span>${option.firstName + ' ' + option.lastName}</span>
    </div>
`;
}
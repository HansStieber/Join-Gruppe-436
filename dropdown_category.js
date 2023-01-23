let categoryOptions = [
    {
        'name': 'General Topic'
    },
    {
        'name': 'example'
    },
    {
        'name': 'example'
    }
];

let tasks = [];


/*----------- BUTTON HOVER EFFECTS -----------*/
function turnIconLightblue() {
    let icon = document.getElementById('cancel-icon');
    icon.setAttribute("style", "background-image: url('assets/img/close_new_task_button_lightblue.svg');");
}

function turnIconDarkblue() {
    let icon = document.getElementById('cancel-icon');
    icon.setAttribute("style", "background-image: url('assets/img/close_new_task_button.svg');");
}


/*----------- LOADING OPTIONS OF DROPDOWN SELECTION MENUS -----------*/
function loadAllOptions() {
    loadCategoryOptions();
    loadAssignmentOptions();
}

function loadCategoryOptions() {
    for (let i = 0; i < categoryOptions.length; i++) {
        const option = categoryOptions[i];
        if (lastCategoryOption(i)) {
            renderLastCategoryOption(option, i);
        } else {
            renderCategoryOptions(option, i);
        }
    }
}


function lastCategoryOption(i) {
    return i == categoryOptions.length - 1;
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
    for (let i = 0; i < categoryOptions.length; i++) {
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
    for (let i = 0; i < categoryOptions.length; i++) {
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
    hideCategories();
    closeDropdownCategory();
}

function showInputField() {
    document.getElementById('new-category').classList.remove('d-none');
    document.getElementById('new-category-container').classList.remove('d-none');
}

function hideCategories() {
    document.getElementById('category-options-container').classList.add('d-none');
}

function closeNewCategory() {
    hideInputField();
    showCategorySelection();
}

function hideInputField() {
    document.getElementById('new-category').classList.add('d-none');
    document.getElementById('new-category-container').classList.add('d-none');
}

function showCategorySelection() {
    document.getElementById('category-options-container').classList.remove('d-none');
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
        <span>${option['name']}</span>
    </div>
`;
}


function renderLastCategoryOption(option, i) {
    document.getElementById('options').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable last-option">
        <span>${option['name']}</span>
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
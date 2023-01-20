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


let contacts = [
    {
        'name': 'Hans'
    },
    {
        'name': 'Sasha'
    }
]


/*----------- LOADING OPTIONS OF DROPDOWN SELECTION MENUS -----------*/
function render() {
    loadCategoryOptions();
    loadAssignmentOptions();
}


function loadCategoryOptions() {
    for (let i = 0; i < categoryOptions.length; i++) {
        const option = categoryOptions[i];
        if (i == categoryOptions.length - 1) {
            renderLastCategoryOption(option, i);
        } else {
            renderCategoryOptions(option, i);
        }
    }
}


function loadAssignmentOptions() {
    for (let i = 0; i < contacts.length; i++) {
        const option = contacts[i];
        renderAssignmentOptions(option, i);
    }
}


/*----------- OPEN DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
function openDropdownCategory() {
    for (let i = 0; i < categoryOptions.length; i++) {
        document.getElementById('c-option' + i).classList.remove('d-none');
    }

    let createNewCategory = document.getElementById('create-new-category');
    createNewCategory.classList.remove('d-none');

    let selectCategoryContainer = document.getElementById('select-category-container');
    selectCategoryContainer.setAttribute('onclick', 'closeDropdownCategory()');
}


/*----------- CLOSE DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
function closeDropdownCategory() {
    for (let i = 0; i < categoryOptions.length; i++) {
        document.getElementById('c-option' + i).classList.add('d-none');
    }

    let createNewCategory = document.getElementById('create-new-category');
    createNewCategory.classList.add('d-none');

    let selectCategoryContainer = document.getElementById('select-category-container');
    selectCategoryContainer.setAttribute('onclick', 'openDropdownCategory()');
}


/*----------- CREATE NEW CATEGORY FOR SELECTION -----------*/
function createNewCategory() {
    openInputField();
    closeDropdownCategory();
}


function openInputField() {
    let newCategoryInput = document.getElementById('new-category');
    newCategoryInput.classList.remove('d-none');

    let newCategoryContainer = document.getElementById('new-category-container');
    newCategoryContainer.classList.remove('d-none');

    let categoryOptionsContainer = document.getElementById('category-options-container');
    categoryOptionsContainer.classList.add('d-none');
}


/*----------- OPEN DROPDOWN MENU FOR ASSIGNMENT -----------*/
function openDropdownAssignment() {
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('a-option' + i).classList.remove('d-none');
    }

    let inviteNewContact = document.getElementById('invite-new-contact');
    inviteNewContact.classList.remove('d-none');

    let selectContactContainer = document.getElementById('select-contact-container');
    selectContactContainer.setAttribute('onclick', 'closeDropdownAssignment()');
}


/*----------- CLOSE DROPDOWN MENU FOR ASSIGNMENT -----------*/
function closeDropdownAssignment() {
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('a-option' + i).classList.add('d-none');
    }

    let inviteNewContact = document.getElementById('invite-new-contact');
    inviteNewContact.classList.add('d-none');

    let selectContactContainer = document.getElementById('select-contact-container');
    selectContactContainer.setAttribute('onclick', 'openDropdownAssignment()');
}




/*----------- TEMPLATES -----------*/

/*----------- TEMPLATES FOR CATEGORY SELECTION -----------*/
function renderCategoryOptions(option, i) {
    let categoriesContainer = document.getElementById('category-options-container');
    categoriesContainer.innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable">
        <span>${option['name']}</span>
    </div>
`;
}


function renderLastCategoryOption(option, i) {
    let categoriesContainer = document.getElementById('category-options-container');
    categoriesContainer.innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable last-option">
        <span>${option['name']}</span>
    </div>
    `;
}


/*----------- TEMPLATES FOR ASSIGNING CONTACT -----------*/
function renderAssignmentOptions(option, i) {
    let contactsContainer = document.getElementById('contacts-dropdown-container');
    contactsContainer.innerHTML += `
    <div id="${'a-option' + i}" class="option d-none selectable">
        <span>${option['name']}</span>
    </div>
`;
}
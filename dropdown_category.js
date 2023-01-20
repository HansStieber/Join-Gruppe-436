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
        const option = categoryOptions[i];
        document.getElementById('c-option' + i).classList.remove('d-none');
    }
    let createNewCategory = document.getElementById('create-new-category');
    createNewCategory.classList.remove('d-none');
    let selectContainer = document.getElementById('select-container');
    selectContainer.setAttribute('onclick', 'closeDropdownCategory()');
}


/*----------- CLOSE DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
function closeDropdownCategory() {
    for (let i = 0; i < categoryOptions.length; i++) {
        const option = categoryOptions[i];
        document.getElementById('c-option' + i).classList.add('d-none');
    }
    let createNewCategory = document.getElementById('create-new-category');
    createNewCategory.classList.add('d-none');
    let selectContainer = document.getElementById('select-container');
    selectContainer.setAttribute('onclick', 'openDropdownCategory()');
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

    let optionsContainer = document.getElementById('options-container');
    optionsContainer.classList.add('d-none');
}


/*----------- OPEN DROPDOWN MENU FOR CATEGORY SELECTION -----------*/





/*----------- TEMPLATES -----------*/

/*----------- TEMPLATES FOR CATEGORY SELECTION -----------*/
function renderCategoryOptions(option, i) {
    let optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable">
        <span>${option['name']}</span>
    </div>
`;
}


function renderLastCategoryOption(option, i) {
    let optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable last-option">
        <span>${option['name']}</span>
    </div>
    `;
}


/*----------- TEMPLATES FOR ASSIGNING CONTACT -----------*/
function renderAssignmentOptions(option, i) {
    let optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable">
        <span>${option['name']}</span>
    </div>
`;
}
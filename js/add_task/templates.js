/*----------- TEMPLATES -----------*/

/*----------- TEMPLATES FOR CATEGORY SELECTION -----------*/
/**
 * Renders html for option at position i at the categories array into container with id options-category
 * 
 * @param {object} option - category at position i at the categories array
 * @param {number} i - position of the category; i is used to create unique id
 */
function renderCategoryOptions(option, i) {
    document.getElementById('options-category').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable" onclick="selectCategory('${option.title}', '${option.color}')">
        <span>${option.title}</span><div class="color ${option.color}"></div>
    </div>
`;
} 


/**
 * Renders html for last option at the categories array in element with id options-category
 * 
 * @param {object} option - category at position i at the categories array
 * @param {number} i - position of the category; i is used to create unique id
 */
function renderLastCategoryOption(option, i) {
    document.getElementById('options-category').innerHTML += `
    <div id="${'c-option' + i}" class="option d-none selectable last-option" onclick="selectCategory('${option.title}', '${option.color}')">
        <span>${option.title}</span><div class="color ${option.color}"></div>
    </div>
    `;
}


/**
 * Renders html for selected category in element with id category; appears as selected categry in the form
 * 
 * @param {string} title - title of the selected category
 * @param {string} color - color of the selected category
 */
function renderSelectedCategory(title, color) {
    document.getElementById('category').innerHTML = `
    <span id="new-category-title">${title}</span><div class="color ${color}"></div>
    `;
}


/**
 * Renders the html of the default style of the category selection dropdown; no category is selected yet
 */
function renderDefaultCategory() {
    document.getElementById('category').innerHTML = `
    <span id="new-category-title">Select task category</span><div class="color"></div>
    `;
}


/*----------- TEMPLATES FOR CATEGORY COLOR SELECTION CONTAINER -----------*/
/**
 * Renders html of color at position i at the colors array in element with id color-selection-container
 * 
 * @param {string} color - color at position i
 * @param {number} i - position i for creating a unique id for every color container and to later define color with onclick function
 */
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


function renderContactIcon(firstLetterFirstName, firstLetterLasttName, color) {
    document.getElementById('assignments-icons-container').innerHTML += `
    <div style="background-color: ${color}" class="contact-icon">
        <span>${firstLetterFirstName}</span>
        <span>${firstLetterLasttName}</span>
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
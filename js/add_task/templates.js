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
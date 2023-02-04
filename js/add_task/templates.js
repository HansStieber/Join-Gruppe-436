/*----------- TEMPLATES -----------*/

/*----------- TEMPLATES FOR THE CATEGORY SELECTION DROPDOWN MENU -----------*/
/**
 * The function renders the html for option at position i at the categories array into container with id options-category. The object
 * option is used to render title and color and define a function onclick to select the category. Also i is used to define unique id´s for
 * different elements.
 * 
 * @param {object} option - category at position i at the categories array
 * @param {number} i - index of the category at categories array
 */
function renderCategoryOptions(option, i) {
    document.getElementById('category-options').innerHTML += `
    <div id="option-${i}-container" class="space-between selectable">
    <div id="${'c-option' + i}" class="option d-none option-left-part" onclick="selectCategory('${option.title}', '${option.color}')">
        <div class="option-container">
            <span>${option.title}</span>
            <div class="color ${option.color}"></div>
        </div>
    </div>
    <div id="${'c-delete-option' + i}" class="option d-none selectable option-right-part">
        <span class="delete-category-text" onclick=deleteCategory(${i})>delete</span>
    </div>
    </div>
`;
} 
 

/**
 * The function renders the html for selected category into element with id category. It appears as selected category in the form at the
 * add_task.html. The color is set by setting a class name as the color parameter.
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
 * The function renders the html of the default style of the category selection dropdown menu. No category is selected yet.
 */
function renderDefaultCategory() {
    document.getElementById('category').innerHTML = `
    <span id="new-category-title">Select task category</span><div class="color"></div>
    `;
}


/*----------- TEMPLATES FOR CATEGORY COLOR SELECTION CONTAINER -----------*/
/**
 * The function renders the html of color at position i at the colors array into the element with the id color-selection-container. Also
 * i is used to create an unique id for the element. Also a function onclick is defined with both parameters.
 * 
 * @param {string} color - color at position i
 * @param {number} i - index of the color at the colors array
 */
function renderCategoryColors(color, i) {
    document.getElementById('color-selection-container').innerHTML += `
    <div id="${'color' + i}" class="color ${color}" onclick="setCurrentColor('${color}', '${i}')"></div>
`;
}


/*----------- TEMPLATES FOR ASSIGNING CONTACTs AT THE ASSIGNMENTS DROPDOWN MENU -----------*/
/**
 * The function renders html for option at position i at the contacts array into container with id contacts-dropdown-container. The object
 * option is used to render its firstName and lastName. Also i is used to define unique id´s for different elements.
 * 
 * @param {object} option - contact option at position i at the contacts array
 * @param {number} i - index of the option at the contacts array
 */
function renderAssignmentOptions(option, i, edit) {
    document.getElementById('contacts-dropdown-container' + edit).innerHTML += `
    <div id="${'a-option' + edit + i}" class="option d-none selectable checkbox-contacts" onclick="assignContact(${i}, '${edit}')">
        <span>${option.firstName + ' ' + option.lastName}</span>
        <div class="checkbox-contacts-unchecked">
            <div id="${'checkbox' + i + edit}" class="checkbox-contacts-checked d-none"></div>
        </div>
    </div> 
    `;
}


/**
 * The function renders the html of a contact icon positioned under the Assignments dropdown menu. It is rendered when a contact is
 * assigned for a task. It uses the parameters firstLetterFirstName and firstLetterLastName to show the names Initials of a certain contact.
 * The color parameter defines the color of the icon by using it as a class.
 * 
 * @param {string} firstLetterFirstName - first letter of the first name
 * @param {string} firstLetterLasttName - first letter of the last name
 * @param {string} color - the color of the contact which defines the background color of the icon
 */
function renderContactIcon(firstLetterFirstName, firstLetterLasttName, color) {
    document.getElementById('assignments-icons-container').innerHTML += `
    <div style="background-color: ${color}" class="contact-icon">
        <span>${firstLetterFirstName}</span>
        <span>${firstLetterLasttName}</span>
    </div>
    `;
}


/**
 * The function renders the title of the subtask at index i from the subtasks array into an element with the id subtasks. Also i is used to
 * generat unique id´s for different elements.
 * 
 * @param {object} subtask - subtask at index i at the subtasks array
 * @param {number} i - index of subtask at the subtasks array
 */
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
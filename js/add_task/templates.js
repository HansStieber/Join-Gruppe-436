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


/*----------- TEMPLATES FOR SUBTASKS -----------*/
/**
 * The function renders the title of the subtask at index i from the subtasks array into an element with the id subtasks. Also i is used to
 * generat unique id´s for different elements.
 * 
 * @param {object} subtask - subtask at index i at the subtasks array
 * @param {number} i - index of subtask at the subtasks array
 */
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


/*----------- TEMPLATES FOR EDIT TASK -----------*/
/**
 * The function renders the edit task card into the detailView container at the board.html. 
 * 
 * @param {string} title - current title that might be edited
 * @param {string} description - current description that might be edited
 * @param {string} y1 - first date year number
 * @param {string} y2 - second date year number
 * @param {string} y3 - third date year number
 * @param {string} y4 - fourth date year number
 * @param {string} m1 - first date month number
 * @param {string} m2 - second date month number
 * @param {string} d1 - first date day number
 * @param {string} d2 - second date day number
 */
function renderEditCard(id, title, description, y1, y2, y3, y4, m1, m2, d1, d2) {
    document.getElementById('detailView').innerHTML = `
        <div class="field-container margin-bottom-zero">
            <label class="label" for="title">Title</label>
            <input type="text" id="title" name="title" onclick="editTitle()" onfocusout="showOldTitle()" required>
            <span id="title-to-edit" class="title-to-edit" onclick="editTitle()">${title}</span>
        </div>

        <div class="field-container margin-bottom-minus">
            <label class="label" for="description">Description</label>
            <textarea type="text" id="description" name="description" onclick="editDescription()" onfocusout="showOldDescription()"
                required></textarea>
            <span id="description-to-edit" class="description-to-edit" onclick="editDescription()">${description}</span>
        </div>

        <div class="field-container margin-bottom-minus">
            <span class="label">Due date</span>
            <input class="color-transparent" id="date" type="date" onclick="editDate()" onfocusout="showOldDate()">
            <span id="date-to-edit" class="date-to-edit" onclick="editDate()">${d1}${d2}/${m1}${m2}/${y1}${y2}${y3}${y4}</span>
        </div>

        <div class="field-container margin-bottom-minus">
            <span class="label">Prio</span>
            <div class="prio-box">
                <img id="prio-urgent" class="prio-urgent" src="assets/img/urgent_big.svg"
                    onclick="taskIsUrgent('urgent', 'urgent_big', 'medium', 'low')"
                    onmouseover="hover('urgent', 'urgent_big')" onmouseout="leave('urgent', 'urgent_big')">
                <img id="prio-medium" class="prio-medium" src="assets/img/medium_big.svg"
                    onclick="taskIsMedium('medium', 'medium_big', 'low', 'urgent')"
                    onmouseover="hover('medium', 'medium_big')" onmouseout="leave('medium', 'medium_big')">
                <img id="prio-low" class="prio-low" src="assets/img/low_big.svg"
                    onclick="taskIsLow('low', 'low_big', 'urgent', 'medium')" onmouseover="hover('low', 'low_big')"
                    onmouseout="leave('low', 'low_big')">
            </div>
        </div>

        <div class="field-container margin-bottom-minus">
            <span class="label">Assign to</span>
            <div id="new-contact-container" class="field-container d-none">
                <input type="text" id="new-contact" name="new-contact" class="d-none" placeholder="Contact email">
                <img class="new-category-icon left-pos" src="assets/img/close_new_task_button.svg"
                    onclick="closeInviteContact()">
                <div class="border-small mid-pos"></div>
                <img id="invite-contact-icon" class="new-category-icon right-pos" src="assets/img/confirm.svg"
                    onclick="inviteContact()">
            </div>
            <div id="contact-options-container" class="options-container">
                <div class="option">
                    <div id="select-contact-container" class="select-container" onclick="openDropdownAssignment()">
                        <span>Select contacts to assign</span><img class="dropdown-arrow"
                            src="assets/img/arrow_select_dropdown.svg">
                    </div>
                </div>
                <div id="options-contact" class="options">
                    <div id="contacts-dropdown-container">
                    </div>
                    <div id="invite-new-contact"
                        class="option d-none selectable checkbox-container space-between last-option"
                        onclick="inviteNewContact()">
                        <span>Invite new contact</span><img src="assets/img/invite_contact.svg">
                    </div>
                </div>
            </div>
            <div id="assignments-icons-container" class="assignments-icons-container">
            </div>
        </div>
        
        <div class="edit-todo-button" onclick="saveChanges(${id})">
            </div>
`;
}
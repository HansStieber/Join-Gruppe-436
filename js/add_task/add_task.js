/**
 * The variable defines if the category options dropdown menu is open.
 */
let categoryOpen = false;
/**
 * The variable defines if the assignment options dropdown menu is open.
 */
let contactsOpen = false;
/**
 * The array includes all contacts that are options to assign for the task.
 */
let assignments = [];


/*----------- INITIALIZING CONTENT OF THE PAGE -----------*/
/**
 * The Function initiates the add_task.html page. The data from the backend is loaded, all templates are included, all dropdown options are
 * loaded and buttons are placed. Also the current page gets highlighted at the sidebar.
 */
async function initAddTask() {
    await loadBackend();
    await load();
    loadAllOptions();
    showClearButton();
    showCreateButtonMobile();
    checkURLandHighlight('add_task');
}


/**
 * The event listener triggers when the size of the window changes and runs the showCreateButtonMobile() function.
 */
window.addEventListener('resize', function () {
    if (location.href.includes('add_task.html')) {
        showCreateButtonMobile();
    }
});


/**
 * The function shows the clear button for clearing the form and also sets the regarded function as an onclick attribute.
 */
function showClearButton() {
    let btn = document.getElementById('clear-form');
    btn.style = 'background-image: url("../assets/img/clear_new_task.svg")';
    btn.setAttribute('onclick', 'clearAllInputFields()');
}


/**
 * The function hides or shows the createTaskButton and iconsHeader depening if the user is in mobile view or not.
 */
function showCreateButtonMobile() {
    let iconsHeader = document.getElementById('icons-header');
    let createTaskButton = document.getElementById('create-task');
    if (window.innerWidth <= 992) {
        if (iconsHeader) {
            iconsHeader.classList.add('d-none');
            createTaskButton.classList.remove('d-none');
        }
    } else {
        iconsHeader.classList.remove('d-none');
        createTaskButton.classList.add('d-none');
    }
}


/*----------- HOVER EFFECTS PRIORITY BUTTONS -----------*/
/**
 * The function changes the path of the image that is hovered on to create a hover effect.
 * 
 * @param {string} id - the id defines image that is hovered on
 * @param {string} path - the path defines a part of the image path to set the correct hover image
 */
function hover(id, path) {
    document.getElementById('prio-' + id).src = `assets/img/${path}_hover.svg`;
}


/**
 * The function changes the path of the image that is not hovered anymore to remove the hover effect.
 * 
 * @param {string} id - the id defines image that was hovered on
 * @param {string} path - the path defines a part of the image path to set the correct default image
 */
function leave(id, path) {
    document.getElementById('prio-' + id).src = `assets/img/${path}.svg`;
}


/*----------- LOADING OPTIONS OF DROPDOWN SELECTION MENUS -----------*/
/**
 * The function loads a variety of options for the form.
 */
function loadAllOptions() {
    loadCategoryColors();
    loadCategoryOptions();
    loadAssignmentOptions();
    loadAssignedContacts();
}


/**
 * The function loads all collor options into the colorSelectionContainer. This is achieved by looping through the colors array and rendering
 * every single color.
 */
function loadCategoryColors() {
    let colorSelectionContainer = document.getElementById('color-selection-container');
    if (colorSelectionContainer) {
        colorSelectionContainer.innerHTML = '';
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            renderCategoryColors(color, i)
        }
    }
}


/**
 * The function loads all category options into the categoryOptions container. This is achieved by looping through the categoryOptions array
 * and rendering every category. The function also checks if the last category of the array is reached, which gets rendered differently.
 */
function loadCategoryOptions() {
    let categoryOptions = document.getElementById('category-options');
    if (categoryOptions) {
        categoryOptions.innerHTML = '';
        for (let i = 0; i < categories.length; i++) {
            const option = categories[i];
            renderCategoryOptions(option, i);
            if (lastCategoryOption(i)) {
                addLastOptionClass(i);
            }
        }
    }
}


/**
 * The function adds the last-option class to the the category option that comes last in the dropdown menu.
 * 
 * @param {number} i - defines the index at the categories array of the last category
 */
function addLastOptionClass(i) {
    document.getElementById('option-' + i + '-container').classList.add('last-option');
}


/**
 * The function checks if the i variable is equal to the index of the last option of the categories array.
 * 
 * @param {number} i - defines the index at the categories array of the last category 
 * @returns if i equals last option index
 */
function lastCategoryOption(i) {
    return i == categories.length - 1;
}


/**
 * The function loads all assignment options by looping through the assignments array and rendering every single option.
 */
function loadAssignmentOptions() {
    document.getElementById('contacts-dropdown-container').innerHTML = '';
    for (let i = 0; i < assignments.length; i++) {
        const option = assignments[i];
        renderAssignmentOptions(option, i);
    }
}


/**
 * The function loads all assigned contacts by looping through the assignments array and checking if any assignment option is included by the
 * assignedContacts array. If the option is included, the checkbox is ticked and an remove assignment onclick function is set.
 */
function loadAssignedContacts() {
    for (let i = 0; i < assignments.length; i++) {
        const option = assignments[i];
        if (assignedContacts.includes(option)) {
            tickCheckboxOfContact(i);
            setRemoveAssignmentOnclickFunction(i);
        }
    }
}


/*----------- OPEN DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
/**
 * The function initiates the openig of the category dropdown menu. It also sets the categoryOpen variable to true.
 */
function openDropdownCategory() {
    loadAllOptions();
    closeDropdownAssignment();
    showCategoryOptions();
    addCloseCategoriesFunction();
    categoryOpen = true;
}


/**
 * The function shows all category options by looping through the categories array and removing the d-none class of every option. It also shows
 * the create-new-category container and plays the open dropdown animation.
 */
function showCategoryOptions() {
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('c-option' + i).classList.remove('d-none');
        //document.getElementById('c-delete-option' + i).classList.remove('d-none');
    }
    document.getElementById('create-new-category').classList.remove('d-none');
    playOpenDropdownAnimation('options-category');
}


/**
 * The function adds an onclick attribute with the closeDropdownCategory() function to the select-category-container to enable closing the dropdown.
 */
function addCloseCategoriesFunction() {
    document.getElementById('select-category-container').setAttribute('onclick', 'closeDropdownCategory()');
}


/**
 * The function plays the dropdown opening animation.
 * 
 * @param {string} id - id of the container which gets the animation classes
 */
function playOpenDropdownAnimation(id) {
    document.getElementById(id).classList.add('scale-up-ver-top');
    document.getElementById(id).classList.remove('scale-down-ver-top');
}


/*----------- CLOSE DROPDOWN MENU FOR CATEGORY SELECTION -----------*/
/**
 * The function closes the category dropdown menu and sets the categoryOpen variable to false.
 */
function closeDropdownCategory() {
    hideCategoryOptions();
    addOpenCategoriesFunction();
    categoryOpen = false;
}


/**
 * The functino loops through the categories array and hides every option at the dropdown menu. It also checks if the container exists beforehand
 * to not trigger any error. It also hides the create-new-category container and plays the close dropdown animation if the category dropdown
 * was open.
 */
function hideCategoryOptions() {
    for (let i = 0; i < categories.length; i++) {
        if (containerWithTargetedIdsExists('c', i)) {
            document.getElementById('c-option' + i).classList.add('d-none');
            //document.getElementById('c-delete-option' + i).classList.add('d-none');
        }
    }
    document.getElementById('create-new-category').classList.add('d-none');
    if (categoryOpen == true) {
        playCloseDropdownAnimation('options-category');
    }
}


/**
 * The funciton checks if the container with a certain id exists.
 * 
 * @param {string} x - defines if container to be checked is at category or assignments dropdown menu
 * @param {number} i - defines the position of the option at the array (categories or assignments)
 * @returns 
 */
function containerWithTargetedIdsExists(x, i) {
    return typeof (document.getElementById(x + '-option' + i)) != 'undefined' && document.getElementById(x + '-option' + i) != null
}


/**
 * The function adds an onclick attribute to the select-category-container with the openDropdownCategory() function to enable opening the
 * dropdown after it has been closed.
 */
function addOpenCategoriesFunction() {
    document.getElementById('select-category-container').setAttribute('onclick', 'openDropdownCategory()');
}


/**
 * The function plays the close dropdown animation for the targeted dropdown.
 * 
 * @param  {string} id - id of the container which gets the animation classes
 */
function playCloseDropdownAnimation(id) {
    document.getElementById(id).classList.remove('scale-up-ver-top');
    document.getElementById(id).classList.add('scale-down-ver-top');
}


/*----------- OPEN DROPDOWN MENU FOR ASSIGNMENT -----------*/
/**
 * The function opens the assginments dropdown menu and closes the category dropdown menu. It also sets the contactsOpen variable to true.
 */
function openDropdownAssignment() {
    if (categoryOpen == true) {
        closeDropdownCategory();
    }
    showAssignmentOptions();
    addCloseContactsFunction();
    contactsOpen = true;
}


/**
 * The function shows all assignment options by looping through the assignments array and removing the d-none class of every option. It also shows
 * the invite-new-contact container and plays the open dropdown animation.
 */
function showAssignmentOptions() {
    for (let i = 0; i < assignments.length; i++) {
        document.getElementById('a-option' + i).classList.remove('d-none');
    }
    document.getElementById('invite-new-contact').classList.remove('d-none');
    playOpenDropdownAnimation('options-contact');
}


/**
 * The function adds an onclick attribute to the select-contact-container with the closeDropdownAssignment() function to enable closing the
 * dropdown menu.
 */
function addCloseContactsFunction() {
    document.getElementById('select-contact-container').setAttribute('onclick', 'closeDropdownAssignment()');
}


/*----------- CLOSE DROPDOWN MENU FOR ASSIGNMENT -----------*/
/**
 * The function closes the assignments dropdown menu. It also adds a open dropdown function. It also sets the contactsOpen variable to false.
 */
function closeDropdownAssignment() {
    hideAssignmentOptions();
    addOpenContactsFunktion();
    contactsOpen = false;
}


/**
 * The functino loops through the assignments array and hides every option at the dropdown menu. It also checks if the container exists beforehand
 * to not trigger any error. It also hides the invite-new-contact container and plays the close dropdown animation if the assignments dropdown
 * was open. 
 */
function hideAssignmentOptions() {
    for (let i = 0; i < assignments.length; i++) {
        if (containerWithTargetedIdsExists('a', i)) {
            document.getElementById('a-option' + i).classList.add('d-none');
        }
    }
    document.getElementById('invite-new-contact').classList.add('d-none');
    if (contactsOpen == true) {
        playCloseDropdownAnimation('options-contact');
    }
}


/**
 * The function sets an onclick attribute to the select-contact-container with the openDropdownAssignment() function to enable opening the
 * assignments dropdwon menu again.
 */
function addOpenContactsFunktion() {
    document.getElementById('select-contact-container').setAttribute('onclick', 'openDropdownAssignment()');
}
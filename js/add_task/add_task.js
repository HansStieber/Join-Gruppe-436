let categoryOpen = false;
let contactsOpen = false;
let assignments = [];


/*----------- INITIALIZING CONTENT OF THE PAGE -----------*/
/**
 * Function load() loads all templates that are included in this page (sidebar, header);
 * Function loadAllOptions loads all options of dropdown menus that are available in add_task.html
 */
async function initAddTask() {
    await loadBackend();
    await load();
    loadAllOptions();
    showClearButton();
}

function showClearButton() {
    let btn = document.getElementById('clear-form');
    btn.style = 'background-image: url("../assets/img/clear_new_task.svg")';
    btn.setAttribute('onclick', 'clearAllInputFields()');
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
    loadAssignmentOptions('');
    loadAssignedContacts();
}

function loadCategoryColors() {
    document.getElementById('color-selection-container').innerHTML = '';
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        renderCategoryColors(color, i)
    }
}

function loadCategoryOptions() {
    document.getElementById('category-options').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const option = categories[i];
        renderCategoryOptions(option, i);
        if (lastCategoryOption(i)) {
            addLastOptionClass(i);
        }
    }
}

function addLastOptionClass(i) {
    document.getElementById('option-' + i + '-container').classList.add('last-option');
}

function lastCategoryOption(i) {
    return i == categories.length - 1;
}


function loadAssignmentOptions(edit) {
    document.getElementById('contacts-dropdown-container' + edit).innerHTML = '';
    for (let i = 0; i < assignments.length; i++) {
        const option = assignments[i];
        renderAssignmentOptions(option, i, edit);
    }
}

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
        document.getElementById('c-delete-option' + i).classList.remove('d-none');
    }
    document.getElementById('create-new-category').classList.remove('d-none');
    playOpenDropdownAnimation('options-category');
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
        if (containerWithTargetedIdsExists('c', i)) {
            document.getElementById('c-option' + i).classList.add('d-none');
            document.getElementById('c-delete-option' + i).classList.add('d-none');
        }
    }
    document.getElementById('create-new-category').classList.add('d-none');
    if (categoryOpen == true) {
        playCloseDropdownAnimation('options-category');
    }
}

function containerWithTargetedIdsExists(x, i, edit) {
    return typeof (document.getElementById(x + '-option' + edit + i)) != 'undefined' && document.getElementById(x + '-option' + edit + i) != null
}

function addOpenCategoriesFunction() {
    document.getElementById('select-category-container').setAttribute('onclick', 'openDropdownCategory()');
}

function playCloseDropdownAnimation(id) {
    document.getElementById(id).classList.remove('scale-up-ver-top');
    document.getElementById(id).classList.add('scale-down-ver-top');
}



/*----------- OPEN DROPDOWN MENU FOR ASSIGNMENT -----------*/
function openDropdownAssignment(edit) {
    closeDropdownCategory();
    showAssignmentOptions(edit);
    addCloseContactsFunction(edit);
    contactsOpen = true;
}

function showAssignmentOptions(edit) {
    for (let i = 0; i < assignments.length; i++) {
        document.getElementById('a-option' + edit + i).classList.remove('d-none');
    }
    document.getElementById('invite-new-contact' + edit).classList.remove('d-none');
    playOpenDropdownAnimation('options-contact' + edit);
}

function addCloseContactsFunction(edit) {
    document.getElementById('select-contact-container' + edit).setAttribute('onclick', `closeDropdownAssignment('${edit}')`);
}


/*----------- CLOSE DROPDOWN MENU FOR ASSIGNMENT -----------*/
function closeDropdownAssignment(edit) {
    hideAssignmentOptions(edit);
    addOpenContactsFunktion(edit);
    contactsOpen = false;
}


function hideAssignmentOptions(edit) {
    for (let i = 0; i < assignments.length; i++) {
        if (containerWithTargetedIdsExists('a', i, edit)) {
            document.getElementById('a-option' + edit + i).classList.add('d-none');
        }
    }
    document.getElementById('invite-new-contact' + edit).classList.add('d-none');
    if (contactsOpen == true) {
        playCloseDropdownAnimation('options-contact' + edit);
    }
}

function addOpenContactsFunktion(edit) {
    document.getElementById('select-contact-container' + edit).setAttribute('onclick', `openDropdownAssignment('${edit}')`);
}
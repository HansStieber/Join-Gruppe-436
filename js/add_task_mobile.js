/**
 * This function initiates functions to show the mobile add_task template. The functions depend on the current location on the website.
 */
async function showMobileTemplate() {
    if (location.href.includes('board.html')) {
        renderTemplateAtBoard();
    }
    if (location.href.includes('contacts.html')) {
        renderTemplateAtContacts();
    }
    await load();
    if (location.href.includes('board.html')) {
        adjustLayoutAtBoard();
    }
    if (location.href.includes('contact')) {
        adjustLayoutAtContacts();
    }
    showNewTaskCloseBtn();
    showTemplate();
    changeHeaderIcons();
    adjustLayout();
    checkWhichIsCurrentPage();
    setDateMinToCalender();
}


/**
 * The function renders the the template container into the board-add-task container and hides the board-outer-div container which contains
 * the previous content of the site.
 */
function renderTemplateAtBoard() {
    document.getElementById('board-outer-div').classList.add('d-none');
    document.getElementById('board-add-task').innerHTML = '<div id="template-container" class="d-none"><div w3-include-html="./templates/new_task.html"></div></div>';
}


/**
 * The function renders the the template container into the contacts-add-task container and hides the contacts-outer-div container which contains
 * the previous content of the site.
 */
function renderTemplateAtContacts() {
    document.getElementById('contacts-outer-div').classList.add('d-none');
    document.getElementById('contacts-add-task').innerHTML = '<div id="template-container" class="d-none"><div w3-include-html="./templates/new_task.html"></div></div>';
}


/**
 * The function adjusts the layout of the board.html page to fit the mobile template.
 */
function adjustLayoutAtBoard() {
    document.getElementById('main').classList.add('main-add-task');
    document.getElementById('main').classList.add('padding-top');
}


/**
 * The function adjusts the layout of the contacts.html page to fit the mobile template.
 */
function adjustLayoutAtContacts() {
    document.getElementById('content-new-task').classList.add('margin-auto');
}


/**
 * The function shows the add_task template-container by removing the d-none class. This happens after the template was loaded.
 */
function showTemplate() {
    document.getElementById('template-container').classList.remove('d-none');
}


/**
 * The changes the headers icons on the right side. It hides the previous icons and shows a create task button.
 */
function changeHeaderIcons() {
    document.getElementById('mobile-d-none').classList.add('d-none');
    document.getElementById('icons-header').classList.add('d-none');
    document.getElementById('create-task').classList.remove('d-none');
}


/**
 * The function adjusts the layout of the page to fit the mobile template.
 */
function adjustLayout() {
    document.getElementById('content-new-task').style.height = "calc(100vh - 89px)";
    document.getElementById('content-new-task').classList.remove('new-task-card');
    document.getElementById('content-new-task').classList.add('padding-bottom');
}


/**
 * The function loads the add_task template on normal screen sizes. 
 */
async function showNormalTemplate() {
    await loadTemplateNewTask();
    hideMobileDescription();
    showClearButton();
    showShadowScreen('new-task-shadow-screen');
    slideInCard('new-task-overlay');
    showNewTaskCloseBtn();
    checkWhichIsCurrentPage();
    setDateMinToCalender();
}


/**
 * The function renders the div where the new task template is located. It also runs the load() function again that runs the includeHTML()
 * function which renders all templates.
 */
async function loadTemplateNewTask() {
    document.getElementById('new-task-overlay').innerHTML = `
    <div w3-include-html="./templates/new_task.html"></div>
    `;
    await load();
}


/**
 * The function hides the mobile Description.
 */
function hideMobileDescription() {
    document.getElementById('mobile-description').classList.add('d-none');
}


/**
 * The function checks on which page the new task card is opened. If there is a new task to create at the contacts.html, the current contact
 * needs to be selected to already assign it to the task.
 */
function checkWhichIsCurrentPage() {
    if (document.URL.includes('contacts.html')) {
        selectCurrentContact(contactToEditId);
    } else {
        loadAllOptions();
    }
}


/**
 * The function checks if the the current contact is already part of the assignments array. If he is, the assignment options are loaded and
 * the contact is assigned. If he is not, the contact is pushed to the assignments array before the assignment options are loaded and the
 * contact is assigned.
 * 
 * @param {number} i - id of the selected contact at the contacts array
 */
function selectCurrentContact(i) {
    if (currentContactisAlreadyAtAssignments(i)) {
        loadAssignmentOptionsAndAssignContact(i);
    } else {
        pushContactAndLoadAssignmentsOptionsAndAssignContact(i);
    }
}


/**
 * The function checks if some contact at the assignments array has the same email as the current contact.
 *
 * @param {number} i - id of the current contact at the contacts array
 */
function currentContactisAlreadyAtAssignments(i) {
    return assignments.some(a => a.email === contacts[i].email)
}


/**
 * The function loads all assignment options and assigns the current contact. It also sets the spliceCurrentContact variable to false.
 * 
 * @param {number} i - id of the current contact at the contacts array 
 */
function loadAssignmentOptionsAndAssignContact(i) {
    loadAssignmentOptions();
    setOptionOneIndex(i);
    assignContact(index);
    spliceCurrentContact = false;
}


/**
 * The function sets the index of the current contact at the assignments array. This is achieved by looping through the assignments array and
 * checking if the firstName and lastName of current contact matches to current assignments conctact. If it matches the index is set. The index
 * is used to run the assignContact() function with the index of the current contact at the assignments array.
 * 
 * @param {number} i - id of the current contact at the contacts array 
 */
function setOptionOneIndex(i) {
    for (let k = 0; k < assignments.length; k++) {
        const assignment = assignments[k];
        if (assignment.firstName === contacts[i].firstName && assignment.lastName === contacts[i].lastName) {
            index = k;
        }
    }
}


/**
 * The function pushes the current contact to the assignments array. Then it loads all assignment options and assigns the current contact.
 * It also sets the spliceCurrentContact variable to true.
 * 
 * @param {number} i - id of the current contact at the contacts array
 */
function pushContactAndLoadAssignmentsOptionsAndAssignContact(i) {
    assignments.push(contacts[i]);
    loadAssignmentOptions();
    setOptionTwoIndex(i);
    assignContact(index);
    spliceCurrentContact = true;
}


/**
 * The function sets the index of the current contact at the assignments array. This is achieved by substracting - 1 from the assignments.length
 * because the current contact was pushed at the last position of the assignments array. It also checks if the indexOfCurrentContact
 * variable is not set yet and some contacts email at the assignments array matches the email of the current contact. If both applies, the
 * indexOfCurrentContact variable is set to index of the current contact at the assignments array.
 * 
 * @param {number} i - id of the current contact at the contacts array 
 */
function setOptionTwoIndex(i) {
    if (indexOfCurrentContact == -1 && assignments.some(a => a.email == contacts[i].email)) {
        indexOfCurrentContact = assignments.indexOf(contacts[i]);
    }
    index = assignments.length - 1;
}


/**
 * The function hides the new task template. The function checks the screen width and also which template is opened currently to decide which
 * template to close. This is important for mobile devices where you can rotate your device.
 */
function hideNewTaskCard() {
    newTaskOpen = false;
    clearSubtaskArray();
    changeHeaderIconsBack();
    if (window.innerWidth <= 992 && normalTemplateOpen == false) {
        hideMobileTemplate();
    }
    if (window.innerWidth <= 992 && normalTemplateOpen == true) {
        hideNormalTemplate();
    }
    if (window.innerWidth > 992 && mobileTemplateOpen == false) {
        hideNormalTemplate();
    }
    if (window.innerWidth > 992 && mobileTemplateOpen == true) {
        hideMobileTemplate();
    }
}


/**
 * The function sets the header icons to default status. The create task button is hidden, and the help button and icon are shown again.
 */
function changeHeaderIconsBack() {
    document.getElementById('mobile-d-none').classList.remove('d-none');
    document.getElementById('icons-header').classList.remove('d-none');
    document.getElementById('create-task').classList.add('d-none');
}


/**
 * This function initiates functions to hide the mobile add_task template. The functions depend on the current location on the website.
 */
function hideMobileTemplate() {
    removeLayoutAdjustment();
    if (location.href.includes('board')) {
        removeLayoutAdjustmentsAtBoard()
        removeTemplateNewTaskMobile('board');
        checkURLandHighlight('board');
    }
    if (location.href.includes('contacts')) {
        removeLayoutAdjustmentsAtContacts();
        removeTemplateNewTaskMobile('contacts');
        checkURLandHighlight('contacts');
    }
    removeCurrentContact();
    mobileTemplateOpen = false;
}


/**
 * This function removes general layout adjustments that were implemented when the new_task template card gets opened.
 */
function removeLayoutAdjustment() {
    document.getElementById('content-new-task').style.height = "calc(100vh - 169px)";
}


/**
 * The function removes layout adjustments that were made when the new_task template card got opened at the board.
 */
function removeLayoutAdjustmentsAtBoard() {
    document.getElementById('main').classList.remove('main-add-task');
    document.getElementById('main').classList.remove('padding-top');
}


/**
 * The function removes layout adjustments that were made when the new_task template card got opened at contacts.
 */
function removeLayoutAdjustmentsAtContacts() {
    document.getElementById('content-new-task').classList.remove('margin-top');
}


/**
 * The function initiates functions to hide the add_task template on screens > 992px.
 */
function hideNormalTemplate() {
    slideOutCard('new-task-overlay');
    hideShadowScreen('new-task-shadow-screen');
    hideNewTaskCloseBtn('new-task-overlay');
    removeCurrentContact();
    closeAllDropdowns();
    setTimeout(function () {
        hideNewTaskCloseBtn();
        showMobileDescription();
    }, 450);
    setTimeout(removeTemplateNewTask, 450);
    highligthURL();
    normalTemplateOpen = false;
}


/**
 * The function shows the mobile description.
 */
function showMobileDescription() {
    document.getElementById('mobile-description').classList.remove('d-none');
}


/**
 * The function removes the last 10 contacts from the assignments array if the spliceCurrentContact variable is true which means the contacts
 * that were added were not included at the assignments array yet. It also empties the assignedContacts array and sets the indexOfCurrentContact
 * variable back to -1.
 */
function removeCurrentContact() {
    if (spliceCurrentContact == true) {
        assignments.splice(indexOfCurrentContact, 10);
    }
    assignedContacts = [];
    indexOfCurrentContact = -1;
}


/**
 * The function checks on which page the user is located and highlights the sidebar accordingly.
 */
function highligthURL() {
    if (location.href.includes('contacts')) {
        checkURLandHighlight('contacts');
    }
    if (location.href.includes('board')) {
        checkURLandHighlight('board');
    }
}


/**
 * The function removes the new task template by emptying its container.
 */
function removeTemplateNewTask() {
    document.getElementById('new-task-overlay').innerHTML = '';
}


/**
 * The function removes the new task template at mobiles by emptying its container.
 */
function removeTemplateNewTaskMobile(id) {
    document.getElementById(id + '-add-task').innerHTML = '';
    document.getElementById(id + '-outer-div').classList.remove('d-none');
}
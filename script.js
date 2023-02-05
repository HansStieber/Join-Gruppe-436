let spliceCurrentContact;
let indexOfCurrentContact = -1;
let headerMenu;


/*----------- GENERAL FUNCTIONS TO INITIALIZE PAGE -----------*/
/**
 * The function plays the loadBackend() and includeHTML() functions.
 */
async function load() {
    await loadBackend();
    await includeHTML();
}


/**
 * The function loads all Data that is currently saved at the backend database.
 */
async function loadBackend() {
    await downloadFromServer();
    todos = JSON.parse(backend.getItem('todo')) || [];
    categories = JSON.parse(backend.getItem('category')) || [];
    contacts = JSON.parse(backend.getItem('contact')) || [];
    assignments = JSON.parse(backend.getItem('assignments')) || [];
    existingUser = backend.getItem('currentUser') || [];
}


function deleteItemFromBackend(array, deleteId) {
    let newArray = array.splice(deleteId, 1);
    backend.deleteItem(array);
    saveArrayToBackend(newArray);
}


function saveArrayToBackend(key, array) {
    let arrayAsText = JSON.stringify(array);
    backend.setItem(key, arrayAsText);
}


/**
 * function for sending an Email for reset
 */

function sendMail() {
    let confirmSentMail = document.getElementById("resetPWackknowledge");
    confirmSentMail.classList.add("flighUp");
    setTimeout(function () {
        window.location.href = "../templates/reset_password.html"
    }, 2000)
}


/**
 * function for enterin summary.html as guest
 */
function guestLogin() {
    currentNavPoint = window.location.href = './summary.html';
}


function forgotPassword() {
    let forgotContainer = document.getElementById("forgotPw");
    let loginContainer = document.getElementById("login-container");
    forgotContainer.removeAttribute("style");
    loginContainer.style.display = "none";
}


/*----------- GENERAL SHOW AND HIDE FUNCTIONS -----------*/
/**
 * the function shows the new Task Template.
 */
async function showNewTaskCard() {
    await loadTemplateNewTask();
    let newTaskCloseBtn = document.getElementById('content-new-task');
    newTaskCloseBtn.classList.remove('d-none');
    showClearButton();
    showShadowScreen('new-task-shadow-screen');
    slideInCard('new-task-overlay');
    showNewTaskCloseBtn();
    checkWhichIsCurrentPage();
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
 * The function checks if some contact at the assignments array has the same firstName and lastName as the current contact.
 *
 * @param {number} i - id of the current contact at the contacts array
 */
function currentContactisAlreadyAtAssignments(i) {
    assignments.some(a => a.firstName === contacts[i].firstName) && assignments.some(a => a.lastName === contacts[i].lastName)
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
 * The function hides the new task template.
 */
function hideNewTaskCard() {
    let newTaskCloseBtn = document.getElementById('content-new-task');
    slideOutCard('new-task-overlay');
    hideShadowScreen('new-task-shadow-screen');
    hideNewTaskCloseBtn('new-task-overlay');
    removeCurrentContact();
    closeAllDropdowns();
    setTimeout(function () { newTaskCloseBtn.classList.add('d-none'); }, 450);
    setTimeout(removeTemplateNewTask, 450);
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
 * The function removes the new task template by emptying its container.
 */
function removeTemplateNewTask() {
    document.getElementById('new-task-overlay').innerHTML = '';
}


/**
 * function to show shadowscreen, per Id 
 */
function showShadowScreen(shadowDivId) {
    let shadowScreen = document.getElementById(`${shadowDivId}`);
    shadowScreen.classList.remove('d-none');
    shadowScreen.classList.remove('smooth-opacity-out');
    shadowScreen.classList.add('smooth-opacity-in');
}


/**
 * function to slide a card in, per Id
 */
function slideInCard(slideDivId) {
    let newCard = document.getElementById(`${slideDivId}`);
    newCard.classList.remove('slide-right');
    newCard.classList.add('slide-left');
}


/**
 * function to slide a card out, per Id
 */

function slideOutCard(slideDivId) {
    let newCard = document.getElementById(`${slideDivId}`);
    newCard.classList.remove('slide-left');
    newCard.classList.add('slide-right');
}


/**
 * function to hide shadowscreen, per Id
 */
function hideShadowScreen(shadowDivId) {
    let shadowScreen = document.getElementById(`${shadowDivId}`);
    shadowScreen.classList.remove('smooth-opacity-in');
    shadowScreen.classList.add('smooth-opacity-out');
    setTimeout(function () { shadowScreen.classList.add('d-none'); }, 450);
}


/**
 * function to show the close Button on NewTask template
 */
function showNewTaskCloseBtn() {
    let closeBtn = document.getElementById('new-task-close-btn');
    closeBtn.classList.remove('d-none');
}


/**
 * function to hide the close Button on NewTask template
 */
function hideNewTaskCloseBtn() {
    let closeBtn = document.getElementById('new-task-close-btn');
    closeBtn.classList.add('d-none');
}


function toggleMobileMenu() {
    checkWindowSize();
    headerMenu.classList.contains('hide') ? showMobileMenu(headerMenu) : hideMobileMenu(headerMenu);
}


function checkWindowSize() {
    return window.innerWidth <= 992 ? headerMenu = document.getElementById('mobileMenu') : headerMenu = document.getElementById('logoutBtn')
}


function showMobileMenu(headerMenu) {
    headerMenu.classList.remove('hide');
    headerMenu.classList.add('show');
}


function hideMobileMenu(headerMenu) {
    headerMenu.classList.remove('show');
    headerMenu.classList.add('hide');
}


/**
 * function to manipulate the Delete Button on Contacts and Board,.html.
 */
function confirmDelete(functionName) {
    changeDeleteBtnOnclick(`${functionName}`);
    changeDeleteBtnSpan('Confirm');
}


function showDeleteBtn() {
    changeDeleteBtnOnclick('confirmDelete()')
    changeDeleteBtnSpan('Delete');
}


function changeDeleteBtnOnclick(functionName) {
    let deleteBtn = document.getElementById('edit-delete-btn');
    deleteBtn.setAttribute('onclick', `${functionName}`);
}


function changeDeleteBtnSpan(html) {
    let deleteBtnSpan = document.getElementById('delete-btn-span');
    deleteBtnSpan.innerHTML = html;
}
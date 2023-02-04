let spliceCurrentContact;
let indexOfCurrentContact = -1;
let headerMenu;

async function load() {
    await loadBackend();
    await includeHTML();
}


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
 * function to show New Task template
 */
function showNewTaskCard(edit) {
    let newTaskCloseBtn = document.getElementById('content-new-task');
    newTaskCloseBtn.classList.remove('d-none');
    showClearButton();
    showShadowScreen('new-task-shadow-screen');
    slideInCard('new-task-overlay');
    showNewTaskCloseBtn();
    if (document.URL.includes('contacts.html')) {
        selectCurrentContact(contactToEditId, edit);
    } else {
        loadAllOptions();
    }
}

//Von Hans
function selectCurrentContact(i, edit) {
    if (assignments.some(a => a.firstName === contacts[i].firstName) && assignments.some(a => a.lastName === contacts[i].lastName)) {
        loadAssignmentOptions(edit);
        for (let k = 0; k < assignments.length; k++) {
            const assignment = assignments[k];
            if (assignment.firstName === contacts[i].firstName) {
                index = k;
            }
        }
        assignContact(index, edit);
        spliceCurrentContact = false;
    } else {
        assignments.push(contacts[i]);
        loadAssignmentOptions(edit);
        if (indexOfCurrentContact == -1 && assignments.some(a => a.email == contacts[i].email)) {
            indexOfCurrentContact = assignments.indexOf(contacts[i]);
        }
        let index = assignments.length - 1;
        assignContact(index, edit);
        spliceCurrentContact = true;
    }
}


function removeCurrentContact() {
    if (spliceCurrentContact == true) {
        assignments.splice(indexOfCurrentContact, 10);
    }
    assignedContacts = [];
    indexOfCurrentContact = -1;
}

/**
 * function to hide New Task template
 */
function hideNewTaskCard(edit) {
    let newTaskCloseBtn = document.getElementById('content-new-task');
    slideOutCard('new-task-overlay');
    hideShadowScreen('new-task-shadow-screen');
    hideNewTaskCloseBtn('new-task-overlay');
    removeCurrentContact();
    closeAllDropdowns(edit);
    setTimeout(function () { newTaskCloseBtn.classList.add('d-none'); }, 450);
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
async function loadBackend() {
    await downloadFromServer();
    todos = JSON.parse(backend.getItem('todo')) || [];
    categories = JSON.parse(backend.getItem('category')) || [];
    contacts = JSON.parse(backend.getItem('contact')) || [];
}


async function load() {
    await loadBackend();
    await includeHTML();
}


function saveContacts() {
    let contactAsText = JSON.stringify(contacts);
    backend.setItem('contact', contactAsText);
}


/**
 * function for sending an Email for reset
 */
function sendMail() {
    alert("test")
}


/**
 * function for enterin summary.html as guest
 */

function guestLogin() {
    window.location.href = './summary.html'
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
function showNewTaskCard() {
    let newTaskCloseBtn = document.getElementById('content-new-task');
    newTaskCloseBtn.classList.remove('d-none');
    showClearButton();
    showShadowScreen('new-task-shadow-screen');
    slideInCard('new-task-overlay');
    showNewTaskCloseBtn();
}

/**
 * function to hide New Task template
 */
function hideNewTaskCard() {
    let newTaskCloseBtn = document.getElementById('content-new-task');
    slideOutCard('new-task-overlay');
    hideShadowScreen('new-task-shadow-screen');
    hideNewTaskCloseBtn('new-task-overlay');
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
let spliceCurrentContact;
let indexOfCurrentContact = -1;
let headerMenu;
let email;
let existingUserName;
/**
 * The variable is set to true or false, depending if the new_task template card is open or not.
 */
let newTaskOpen;

/*----------- GENERAL FUNCTIONS TO INITIALIZE PAGE -----------*/
/**
 * The function plays the loadBackend() and includeHTML() functions.
 */
async function load() {
    await loadBackend();
    await includeHTML();
    checkURLandHighlight();
    setFaviconColorTheme();
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
    //existingUser = backend.getItem('currentUser') || [];
    users = JSON.parse(backend.getItem("users")) || [];
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
 * This function highlightes the active navigation point on the sidebar. At first the function checks if the current page is 'Legal notice' or 
 * if it's an other page.
 * 
 * @param {string} navPoint - id of the current (active) navigation point
 */
function checkURLandHighlight(navPoint) {
    if (document.URL.includes('legal_notice')) {
        document.getElementById('legal_notice').classList.add('nav-highlight');
    } else if (document.getElementById(`${navPoint}`)) {
        document.getElementById(`${navPoint}`).classList.add('nav-highlight');
    }
}


/**
 * function for sending an Email for reset
 */
function sendMail() {
    let email_input = document.getElementById("resetEmailInput").value;
    let confirmSentMail = document.getElementById("resetPWackknowledge");
    confirmSentMail.classList.add("flighUp");
    email = email_input;
    setTimeout(function () {
        confirmSentMail.classList.remove("flighUp");
        document.getElementById("forgotPassword").style.display = "none";
        document.getElementById("mainContainer-reset").style.display = "";
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


function resetPassword() {
    let current_email = email;
    let new_password = document.getElementById("resetPWInput").value;
    let new_passwordCONF = document.getElementById("resetPWInputConf").value;
    users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(user => user.email === current_email);
    let resetPW = document.getElementById("resetPW");

    if (new_password === new_passwordCONF) {
        if (existingUser) {
            existingUser.password = new_password;
            localStorage.setItem("users", JSON.stringify(users));
            resetPW.classList.add("flighUp");
            setTimeout(function () {
                window.location.href = "./index.html";
            }, 2000);
        } else {
            console.log("Email not found. Password reset failed.");
            setTimeout(function () {
                window.location.href = "../templates/log_in.html";
            }, 2000);
        }
    }

}


/*----------- GENERAL SHOW AND HIDE FUNCTIONS -----------*/
/**
 * The function shows the new Task Template depending on the window width. It also sets the newTaskOpen variable to true.
 */
async function showNewTaskCard() {
    newTaskOpen = true;
    if (window.innerWidth <= 992) {
        await showMobileTemplate();
    } else {
        await showNormalTemplate();
    }
}


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
 * The function hides the new task template.
 */
function hideNewTaskCard() {
    newTaskOpen = false;
    changeHeaderIconsBack();
    if (window.innerWidth <= 992) {
        hideMobileTemplate();
    }
    else {
        hideNormalTemplate();
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

function removeTemplateNewTaskMobile(id) {
    document.getElementById(id + '-add-task').innerHTML = '';
    document.getElementById(id + '-outer-div').classList.remove('d-none');
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
    if (closeBtn) {
        closeBtn.classList.add('d-none');
    }
}


/**
 * In the first place this function checks the width of the window. Either the mobile-menu or the logout-button shows or hide per click of
 * the avatar-button.
 */
function toggleMobileMenu() {
    checkWindowSize();
    headerMenu.classList.contains('hide') ? showMobileMenu(headerMenu) : hideMobileMenu(headerMenu);
}


/**
 * In the first place this function checks the width of the window. Depending on the width the user sees a mobile menu oder a logout-button.
 */
function checkWindowSize() {
    return window.innerWidth <= 992 ? headerMenu = document.getElementById('mobileMenu') : headerMenu = document.getElementById('logoutBtn')
}


/**
 * Function to show mobile-menu or logout-button
 */
function showMobileMenu(headerMenu) {
    headerMenu.classList.remove('hide');
    headerMenu.classList.add('show');
}


/**
 * Function to hide mobile-menu or logout-button
 */
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
    changeDeleteBtnOnclick('confirmDelete(`deleteContact()`)')
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

/**
 * This function, runs if the user changes the color theme of his Browser to Dark.
 */
function setFaviconIfColorThemeChanged() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setFaviconColorTheme();
    });
}

/**
 * This function, changes all hrefs from the favicons, to show right Favicon on Color theme Dark and Light.
 */
function setFaviconColorTheme() {
    let appleFav = document.getElementById('apple-fav');
    let bigFav = document.getElementById('32-fav');
    let smallFav = document.getElementById('16-fav');
    let manifest = document.getElementById('manifest');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        appleFav.href = 'assets/favicon/favicon_light/apple-touch-icon.png';
        bigFav.href = 'assets/favicon/favicon_light/favicon-32x32.png';
        smallFav.href = 'assets/favicon/favicon_light/favicon-16x16.png';
        manifest.href = 'assets/favicon/favicon_light/site.webmanifest';
    } else {
        appleFav.href = 'assets/favicon/favicon_dark/apple-touch-icon.png';
        bigFav.href = 'assets/favicon/favicon_dark/favicon-32x32.png';
        smallFav.href = 'assets/favicon/favicon_dark/favicon-16x16.png';
        manifest.href = 'assets/favicon/favicon_dark/site.webmanifest';
    }
    setFaviconIfColorThemeChanged();
}
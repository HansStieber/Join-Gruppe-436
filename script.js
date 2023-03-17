let spliceCurrentContact;
let indexOfCurrentContact = -1;
let headerMenu;
let email;
let existingUserName;
let users = [];

let alreadyGreetMobile = false;
/**
 * The variable is set to true or false, depending if the new_task template card is open or not.
 */
let newTaskOpen;
let mobileTemplateOpen = false;
let normalTemplateOpen = false;

/*----------- GENERAL FUNCTIONS TO INITIALIZE PAGE -----------*/
/**
 * The function plays the loadBackend() and includeHTML() functions.
 */
async function load() {
    await loadBackend();
    await includeHTML();
    checkURLandHighlight();
    setFaviconColorTheme();
    if (window.location.pathname == '/index.html') {
        loadUserCredentials();
    }
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
    users = JSON.parse(backend.getItem("users")) || [];
}


/**
 * This function deletes Item from Array and Saves manipulated Array to Backend. 
 * 
 * @param {array} array -array to splice an save.
 * @param {number} deleteId -Id of the Item to delete.
 */
function deleteItemFromBackend(array, deleteId) {
    let newArray = array.splice(deleteId, 1);
    backend.deleteItem(array);
    saveArrayToBackend(newArray);
}


/**
 * This function saves given Array with given Key to Backend.
 * 
 * @param {string} key -key to find saved Array.
 * @param {array} array -array to get saved.
 */
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
        //document.getElementById("forgotPassword").style.display = "none";
        //document.getElementById("mainContainer-reset").style.display = "";
    }, 2000)
}


/**
 * function for enterin summary.html as guest
 */
function guestLogin() {
    currentNavPoint = window.location.href = './summary.html';
    localStorage.clear();
    areadyGreetMobile = true;
    localStorage.setItem('alreadyGreetMobile', alreadyGreetMobile);

}


/**
 * This function manipulate HTML Elements to show Login.
 */
function openLogin() {
    let loginContainer = document.getElementById("login-container");
    let signUpContainer = document.getElementById("signUp");
    let signUpButton = document.getElementById("signup_button");
    loginContainer.classList.remove("fade-in-login");
    loginContainer.style.display = "flex";
    signUpContainer.style.display = "none";
    signUpButton.style.display = "";
}


/**
 * This function manipulate HTML Elements to show SignUp.
 */
function signUp() {
    let loginContainer = document.getElementById("login-container");
    let signUpContainer = document.getElementById("signUp");
    let forgotPasswordContainer = document.getElementById('forgotPw');
    let signUpButton = document.getElementById("signup_button");
    forgotPasswordContainer.style.display = "none";
    loginContainer.style.display = "none";
    signUpContainer.style.display = "flex";
    signUpButton.style.display = "none";
}


/**
 * This function manipulate HTML Elements to show forgotPassword.
 */
function forgotPassword() {
    let forgotContainer = document.getElementById("forgotPw");
    let loginContainer = document.getElementById("login-container");
    let signUpButton = document.getElementById("signup_button");
    signUpButton.style.display = "none";
    loginContainer.style.display = "none";
    forgotContainer.style.display = "flex";
}


/**
 * This function manipulate HTML Elements to show Login when came from
 * forgot Password.
 */
function openLoginFromForgotPasswort() {
    let forgotContainer = document.getElementById("forgotPw");
    let loginContainer = document.getElementById("login-container");
    let signUpButton = document.getElementById("signup_button");
    signUpButton.style.display = "";
    loginContainer.classList.remove("fade-in-login");
    forgotContainer.style.display = "none";
    loginContainer.style.display = "flex";
}


/*----------- GENERAL SHOW AND HIDE FUNCTIONS -----------*/
/**
 * The function shows the new Task Template depending on the window width. It also sets the newTaskOpen variable to true.
 */
async function showNewTaskCard() {
    newTaskOpen = true;
    if (window.innerWidth <= 992) {
        await showMobileTemplate();
        mobileTemplateOpen = true;
    } else {
        await showNormalTemplate();
        normalTemplateOpen = true;
    }
}


/**
 * The eventlistener listens for clicks on the window. If the user clicks the window but not the new task card, a new task card is open and
 * the width of the window is bigger than 992px, the task gets hidden. That means if you habe a new Task card opened and you click outside the
 * card, the card closes.
 */
window.addEventListener('click', (e) => {
    if (newTaskOpen && window.innerWidth > 992) {
        if (document.getElementById('content-new-task') && !document.getElementById('content-new-task').contains(e.target)) {
            hideNewTaskCard();
        }
    }
});


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
 * This Function to show mobile-menu or logout-button
 */
function showMobileMenu(headerMenu) {
    headerMenu.classList.remove('hide');
    headerMenu.classList.add('show');
}


/**
 * This Function to hide mobile-menu or logout-button
 */
function hideMobileMenu(headerMenu) {
    headerMenu.classList.remove('show');
    headerMenu.classList.add('hide');
}


/**
 * This Function to manipulate the Delete Button on Contacts and Board,.html.
 */
function confirmDelete(functionName) {
    changeDeleteBtnOnclick(`${functionName}`);
    changeDeleteBtnSpan('Confirm');
}


/**
 * This Function calls functions to manipulate the Delete Button.
 */
function showDeleteBtn() {
    changeDeleteBtnOnclick('confirmDelete(`deleteContact()`)')
    changeDeleteBtnSpan('Delete');
}


/**
 * This Function changes onclick of the Delete Button.
 */
function changeDeleteBtnOnclick(functionName) {
    let deleteBtn = document.getElementById('edit-delete-btn');
    deleteBtn.setAttribute('onclick', `${functionName}`);
}


/**
 * This Function changes the Text of the Delete Button.
 */
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
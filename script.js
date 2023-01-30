async function loadBackend() {
    await downloadFromServer();
    todos = JSON.parse(backend.getItem('todo')) || [];
    categories = JSON.parse(backend.getItem('category')) || [];
}


async function load() {
    await loadBackend();
    await includeHTML();
}


/**
 * function for sending an Email for reset
 */
function sendMail(){
    alert("test")
}


/**
 * function for enterin summary.html as guest
 */

function guestLogin() {
    window.location.href = './summary.html'
}


function forgotPassword(){
    let forgotContainer = document.getElementById("forgotPw");
    let loginContainer = document.getElementById("login-container");
    forgotContainer.removeAttribute("style");
    loginContainer.style.display = "none";
}



/*----------- GENERAL SHOW AND HIDE FUNCTIONS -----------*/


/**
 * function for show shadowscreen 
 */

function showShadowScreen(){
    let shadowScreen = document.querySelector('.shadow-screen');
    shadowScreen.classList.remove('d-none');
    shadowScreen.classList.remove('smooth-opacity-out');
    shadowScreen.classList.add('smooth-opacity-in');
}

/**
 * function to slide the a card in 
 */

function slideInCard(){
    let newCard = document.querySelector('.general-overlay');
    newCard.classList.remove('slide-right');
    newCard.classList.add('slide-left');
}

/**
 * function to slide the car out
 */

function slideOutCard() {
    let newCard = document.querySelector('.general-overlay');
    newCard.classList.remove('slide-left');
    newCard.classList.add('slide-right');
}

/**
 * function to hide the shadowscreen
 */
function hideShadowScreen(){
    let shadowScreen = document.querySelector('.shadow-screen');
    shadowScreen.classList.remove('smooth-opacity-in');
    shadowScreen.classList.add('smooth-opacity-out');
    setTimeout(function () { shadowScreen.classList.add('d-none'); }, 450);
}



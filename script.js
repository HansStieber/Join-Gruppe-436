

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

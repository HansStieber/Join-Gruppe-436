let rememberMe = false;

/**
 * This function
 */
function login() {
  let email = document.getElementById("login-email");
  let password = document.getElementById("login-password");
  rememberMe = document.getElementById("remember-me").checked;
  let existingUser = users.find(user => user.email === email.value && user.password === password.value);
  localStorage.setItem('alreadyGreetMobile', alreadyGreetMobile);

  if (existingUser) {
    if (rememberMe) {
      saveUserToLocalStorage(email, password, rememberMe);
    } else {
      localStorage.setItem("rememberLogin", rememberMe);
      localStorage.clear();
    }
    goToSummaryAfterTimeout();
    localStorage.setItem('currentUser', existingUser.name);
  } else {
    showEmailAlreadyInUse(email, password);
  }
}


/**
 * This function saves User data to Local Storage.
 * 
 * @param {element} email -input field.
 * @param {element} password -input field.
 * @param {boolean} rememberMe -this is true of false.
 */
function saveUserToLocalStorage(email, password, rememberMe) {
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
  localStorage.setItem("rememberLogin", rememberMe)
}


/**
 * This function moves the User to Summary.html,
 * after Timout.
 */
function goToSummaryAfterTimeout() {
  setTimeout(function () {
    window.location.href = "./summary.html";
  }, 1000);
}


/**
 * This function shows Email already in Use Message,
 * and clears input after Timout.
 */
function showEmailAlreadyInUse() {
  email.value = 'Email oder Passwort inkorrekt';
  setTimeout(() => {
    email.value = '';
    password.value = '';
  }, 2000);
}


/**
 * This function loads existing User from Local Storage,
 * to autoFill the Input of Login.
 */
function loadUserCredentials() {
  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");
  rememberMe = localStorage.getItem("rememberLogin");
  if (rememberMe == 'true') {
    document.getElementById("login-email").value = storedEmail;
    document.getElementById("login-password").value = storedPassword;
    document.getElementById("remember-me").checked = rememberMe;
  }
}



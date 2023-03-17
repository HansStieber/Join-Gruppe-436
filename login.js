let rememberMe = false;

function login() {
  let email = document.getElementById("login-email");
  let password = document.getElementById("login-password");
  rememberMe = document.getElementById("remember-me").checked;
  let existingUser = users.find(user => user.email === email.value && user.password === password.value);

  if (existingUser) {
    if (rememberMe) {
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem("rememberLogin", rememberMe)
    } else {
      localStorage.setItem("rememberLogin", rememberMe);
      localStorage.clear();
    }
    setTimeout(function () {
      window.location.href = "./summary.html";
    }, 1000);
    localStorage.setItem('currentUser', existingUser.name);
  } else {
    email.value ='Email oder Passwort inkorrekt';
    setTimeout(() => {
      email.value = '';
      password.value = '';
    }, 2000);
  }
}

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



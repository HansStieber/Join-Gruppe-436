function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let rememberMe = document.getElementById("remember-me").checked;
  let existingUser = users.find(user => user.email === email && user.password === password);

  if (existingUser) {
    console.log("Login successful.");
    if (rememberMe) {
      backend.setItem("email", email);
      backend.setItem("password", password);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
    setTimeout(function () {
      window.location.href = "./summary.html";
    }, 2000);
    backend.setItem('currentUser', existingUser.name);
  } else {
    console.log("Invalid email or password. Login failed.");
    alert("failed")
  }
  
}

function loadUserCredentials(){
  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");
  if (storedEmail && storedPassword) {
    document.getElementById("email").value = storedEmail;
    document.getElementById("password").value = storedPassword;
    document.getElementById("remember-me").checked = true;
  }
}



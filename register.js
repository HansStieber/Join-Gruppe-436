function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  users = JSON.parse(localStorage.getItem("users")) || [];
  let existingUser = users.find(user => user.email === email);

  if (!existingUser) {
    users.push({
      name: name,
      email: email,
      password: password
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully.");
    setTimeout(function() {
      window.location.href = "../templates/log_in.html";
    }, 2000);
  } else {
    alert("Email already in use. Registration failed.");
    setTimeout(function() {
      window.location.href = "../templates/log_in.html";
    }, 2000);
  }

}




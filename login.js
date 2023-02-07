function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let existingUser = users.find(user => user.email === email && user.password === password);

  if (existingUser) {
    console.log("Login successful.");
    setTimeout(function () {
      window.location.href = "./summary.html";
    }, 2000);
    //document.getElementById("user-greeting").innerHTML = `${existingUser["name"]}`;
    //von Pierre, um von Summary.js aus, auf den aktuellen Benutzer zuzugreifen//
    //backend.setItem('currentUser', existingUser.name);
    localStorage.setItem('currentUser', existingUser.name);
  } else {
    console.log("Invalid email or password. Login failed.");
    alert("failed")
  }
}
async function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email");
  let password = document.getElementById("password").value;
  let existingUser = users.find(user => user.email === email.value);

  if (!existingUser) {
    users.push({
      name: name,
      email: email.value,
      password: password
    });
    await backend.setItem("users", JSON.stringify(users));
    document.getElementById("signUpSingle").classList.add("flighUp");
    setTimeout(() => { window.location.href = "./index.html"; }, 900);

  } else {
    email.value = 'Email already in use!';
  }
}




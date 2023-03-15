function resetPassword() {
    let extractedEmail = window.location.href.substr(window.location.href.indexOf('(') + 1).slice(0, -1);
    let newPassword = document.getElementById("resetPWInput");
    let newPasswordCONF = document.getElementById("resetPWInputConf");
    let existingUser = users.find(user => user.email == extractedEmail);

    if (!(newPassword.value === newPasswordCONF.value)) {
        setResetPasswordInputType('text');
        newPassword.value = 'Passwords do not match!';
        newPasswordCONF.value = 'Passwords do not match!';
        resetPasswordTypeTimeout('password');
        return;
    }
    if (!existingUser) {
        setResetPasswordInputType('text');
        newPassword.value = 'Could not find User!';
        resetPasswordTypeTimeout('password');
        return;
    }

    existingUser.password = newPassword.value;
    backend.setItem("users", JSON.stringify(users));
    resetPW.classList.add("flighUp");
    setTimeout(function () {
        window.location.href = "./index.html";
    }, 900);
}


function setResetPasswordInputType(type) {
    let newPassword = document.getElementById("resetPWInput");
    let newPasswordCONF = document.getElementById("resetPWInputConf");
    newPassword.type = type;
    newPasswordCONF.type = type;
}


function resetPasswordTypeTimeout(type) {
    let newPassword = document.getElementById("resetPWInput");
    let newPasswordCONF = document.getElementById("resetPWInputConf");
    setTimeout(() => {
        setResetPasswordInputType(type);
        newPassword.value = '';
        newPasswordCONF.value = '';
    }, 2000);
}
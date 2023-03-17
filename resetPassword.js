
/**
 * This function Reset the Password of a User.
 * 
 * @returns If requirements not true.
 */
function resetPassword() {
    let extractedEmail = window.location.href.substr(window.location.href.indexOf('(') + 1).slice(0, -1);
    let newPassword = document.getElementById("resetPWInput");
    let newPasswordCONF = document.getElementById("resetPWInputConf");
    let existingUser = users.find(user => user.email == extractedEmail);

    if (!(newPassword.value === newPasswordCONF.value)) {
        showPasswordsNotEqualMsg(newPassword, newPasswordCONF);
        return;
    }
    if (!existingUser) {
        showUserNotFindMsg(newPassword, newPasswordCONF);
        return;
    }

    existingUser.password = newPassword.value;
    backend.setItem("users", JSON.stringify(users));
    resetPW.classList.add("flighUp");
    setTimeout(function () {
        window.location.href = "./index.html";
    }, 900);
}


/**
 * This function changes the value of given input Field to show
 * the User Validation.
 * 
 * @param {element} newPassword -input Element.
 * @param {element} newPasswordCONF -input Element.
 */
function showPasswordsNotEqualMsg(newPassword, newPasswordCONF) {
    setResetPasswordInputType('text');
    newPassword.value = 'Passwords do not match!';
    newPasswordCONF.value = 'Passwords do not match!';
    resetPasswordTypeTimeout('password');
}


/**
 * This function changes the value of given input Field to show
 * the User Validation.
 * 
 * @param {element} newPassword -input Element.
 * @param {element} newPasswordCONF -input Element.
 */
function showUserNotFindMsg(newPassword, newPasswordCONF) {
    setResetPasswordInputType('text');
    newPassword.value = 'Could not find User!';
    newPasswordCONF.value = 'Could not find User!';
    resetPasswordTypeTimeout('password');
}


/**
 * This function changes the Type of input fields. Wich Type to set
 * is defined in Var type.
 * 
 * @param {string} type -text with name of Type.
 */
function setResetPasswordInputType(type) {
    let newPassword = document.getElementById("resetPWInput");
    let newPasswordCONF = document.getElementById("resetPWInputConf");
    newPassword.type = type;
    newPasswordCONF.type = type;
}


/**
 * This function changes after Timout the type and value of input field.
 * 
 * @param {string} type -text with name of Type.
 */
function resetPasswordTypeTimeout(type) {
    let newPassword = document.getElementById("resetPWInput");
    let newPasswordCONF = document.getElementById("resetPWInputConf");
    setTimeout(() => {
        setResetPasswordInputType(type);
        newPassword.value = '';
        newPasswordCONF.value = '';
    }, 2000);
}
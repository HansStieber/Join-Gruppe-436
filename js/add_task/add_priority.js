/**
 * The variables define if the task has any priority. Only one can be true at a time.
 */
let urgent = false;
let medium = false;
let low = false;


/**
 * The function sets the urgent variable to true. It also runs the setImgSelected() function.
 * 
 * @param {string} id - value: 'urgent' - is passed as parameter
 * @param {string} path - value: 'urgent_big' - is passed as parameter 
 * @param {string} id2 - value: 'medium' - is passed as parameter 
 * @param {string} id3 - value: 'low' - is passed as parameter 
 */
function taskIsUrgent(id, path, id2, id3) {
    urgent = true;
    medium = false;
    low = false;
    setImgSelected(id, path, id2, id3);
}


/**
 * The function selects the correct img src to highlight the current priority. It also runs the functions focusPrio() and unfocusPriority().
 * 
 * @param {string} id - is used to target unique id  to set new img path - passed on as parameter
 * @param {string} id2 - passed on as parameter
 * @param {string} id3 - passed on as parameter
 * @param {string} path - is used to define path of the img
 */
function setImgSelected(id, path, id2, id3) {
    document.getElementById('prio-' + id).src = `assets/img/${path}_selected.svg`;
    focusPrio(id, id2, id3);
    unfocusPriority(id2, id, id3);
    unfocusPriority(id3, id, id2);
}


/**
 * The function removes onmouseover and onmouseout functions of the focused priority img. It also sets an onclick function unfocusPriority().
 * 
 * @param {string} id - is used to target unique id of the img that is highlighted - also is used to set new parameter values at the unfocusPriority() function that is newly set
 * @param {string} id2 - is used to set new parameter values at the unfocusPriority() function that is newly set
 * @param {string} id3 - is used to set new parameter values at the unfocusPriority() function that is newly set 
 */
function focusPrio(id, id2, id3) {
    document.getElementById('prio-' + id).setAttribute('onmouseover', '');
    document.getElementById('prio-' + id).setAttribute('onmouseout', '');
    document.getElementById('prio-' + id).setAttribute('onclick', `unfocusPriority('${id}', '${id2}', '${id3}')`);
}


/**
 * The function runs the function setNewPriority() and sets a variable newId from the parameter id by changing the first letter of id to
 * uppercase. The newId variable is used as a parameter at a newly set onclick function taskIs[newId](). It also runs the function unfocusPrio().
 * 
 * @param {string} id - is used to target unique id to set attribute onclick - passed as a parameter to unfocusPrio() function - used to create newId variable - is used to set new parameter values at the taskIs[newId]() function that is newly set
 * @param {string} id2 - passed as a parameter to unfocusPrio() functionj - is used to set new parameter value at the taskIs[newId]() function that is newly set
 * @param {string} id3 - passed as a parameter to unfocusPrio() function - is used to set new parameter value at the taskIs[newId]() function that is newly set
 */
function unfocusPriority(id, id2, id3) {
    setNewPriority(id);
    let firstLeter = id.charAt(0);
    let fLUppercase = firstLeter.toUpperCase();
    let newId = fLUppercase + id.substring(1);
    document.getElementById('prio-' + id).setAttribute('onclick', `taskIs${newId}('${id}', '${id}_big', '${id2}', '${id3}')`);
    unfocusPrio(id, id2, id3);
}


/**
 * The function sets the priority variables urgent, medium and low to false depending on the given id.
 * 
 * @param {string} id - defines the current priority that is to be unselected/set to false
 */
function setNewPriority(id) {
    if (id == 'urgent') {
        urgent = false;
    }
    if (id == 'medium') {
        medium = false;
    }
    if (id == 'low') {
        low = false; 
    }
}


/**
 * The function sets onmouseover and onmouseout functions of the unfocused/ not highlighted priority imgs. It also selects the correct img src
 * to unhighlight the imgs which priorities are not selected currently.
 * 
 * @param {string} id - is used to target unique id of the img with no highlight - also is used to set new parameter values at the hover() and leave() functions that are newly set
 * @param {string} id2 - is used to set new parameter values at the hover() and leave() functions that are newly set
 * @param {string} id3 - is used to set new parameter values at the hover() and leave() functions that are newly set
 */
function unfocusPrio(id, id2, id3) {
    document.getElementById('prio-' + id).setAttribute('onmouseover', `hover('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).setAttribute('onmouseout', `leave('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).src = `assets/img/${id}_big.svg`;
}


/**
 * The function sets the medium variable to true. It also runs the setImgSelected() function.
 * 
 * @param {string} id - value: 'medium' - is passed as parameter
 * @param {string} path - value: 'medium_big' - is passed as parameter 
 * @param {string} id2 - value: 'low' - is passed as parameter 
 * @param {string} id3 - value: 'urgent' - is passed as parameter 
 */
function taskIsMedium(id, path, id2, id3) {
    urgent = false;
    medium = true;
    low = false;
    setImgSelected(id, path, id2, id3);
}


/**
 * The function sets the low variable to true. It also runs the setImgSelected() function.
 * 
 * @param {string} id - value: 'low' - is passed as parameter
 * @param {string} path - value: 'low_big' - is passed as parameter 
 * @param {string} id2 - value: 'urgent' - is passed as parameter 
 * @param {string} id3 - value: 'medium - is passed as parameter 
 */
function taskIsLow(id, path, id2, id3) {
    urgent = false;
    medium = false;
    low = true;
    setImgSelected(id, path, id2, id3);
}


/**
 * The function unsets all priorities and sets the default status.
 */
function unsetPriority() {
    urgent = false;
    medium = false;
    low = false;
    unfocusPrio('urgent', 'medium', 'low', '');
    unfocusPrio('low', 'urgent', 'medium', '');
    unfocusPrio('medium', 'low', 'urgent', '');
}
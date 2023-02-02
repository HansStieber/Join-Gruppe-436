let assignedContacts = [];

/*----------- ASSIGN CONTACT FOR TASK -----------*/
/**
 * The Function assigns a certain contact for a certain task.
 * 
 * @param {number} i - index at assignments of the contact that is assigned
 */
function assignContact(i) {
    tickCheckboxOfContact(i);
    setRemoveAssignmentOnclickFunction(i);
    setIndexOfCurrentContactVariable(i);
    assignedContacts.push(assignments[i]);
    loadContactIcon();
}


/**
 * The Function shows the "tick" at the checkbox in the assignments dropdown menu of the contact that is assigned.
 * 
 * @param {number} i - index at assignments of the contact that is assigned 
 */
function tickCheckboxOfContact(i) {
    document.getElementById('checkbox' + i).classList.remove('d-none');
}


/**
 * The function sets an onclick function to remove the Assignment of the contact. firstName and lastName of the Contact are set to
 * later remove the correct character from the assignedContacts array.
 * 
 * @param {number} i - index at assignments of the contact that is assigned
 */
function setRemoveAssignmentOnclickFunction(i) {
    let fN = assignments[i].firstName.toLowerCase();
    let lN = assignments[i].lastName.toLowerCase();
    document.getElementById('a-option' + i).setAttribute('onclick', `removeAssignment(${i}, '${fN}', '${lN}')`);
}


/**
 * The function sets the variable indexOfCurrentContact to the index of the current Contact at the assignments array. This only happens
 * if the value is -1, which is the default value and means the variable has not been set yet.
 * 
 * @param {number} i - index at assignments of the contact that is assigned
 */
function setIndexOfCurrentContactVariable(i) {
    if (indexOfCurrentContact == -1) {
        indexOfCurrentContact = assignments.indexOf(contacts[i]);
    }
}


/**
 * Function that renders the icons of all contacts that are currently assigned to the task. This is achieved by looping through the array
 * assignedContacts. The first letter of first and last name is and the color ist taken from each contact and used as a parameter at the
 * renderContactIcon() function which finally renders the html of every icon.
 */
function loadContactIcon() {
    document.getElementById('assignments-icons-container').innerHTML = '';
    for (let i = 0; i < assignedContacts.length; i++) {
        const contact = assignedContacts[i];
        let firstLetterFirstName = contact.firstName.slice(0, 1);
        let firstLetterLasttName = contact.lastName.slice(0, 1);
        let bgColor = contact.color;
        renderContactIcon(firstLetterFirstName, firstLetterLasttName, bgColor);
    }
}


/*--------- REMOVE ASSIGNMENT OF CONTACT FOR TASK -----------*/
/**
 * The function removes the assignment of a certain contact for the current task. This is achieved by looping through the assignedContacts 
 * array and checking if the given parameters fN and lN match with the first and last name of a contact in the array. If they match, the
 * contact is removed from the array, meaning the contact is no longer assigned to the task.
 * 
 * @param {number} i - index at assignedContacts of the contact that is removed 
 * @param {string} fN - first name of the contact that is removed
 * @param {string} lN - last name of the contact that is removed
 */
function removeAssignment(i, fN, lN) {
    untickCheckboxOfContact(i);
    for (let i = 0; i < assignedContacts.length; i++) {
        const contact = assignedContacts[i];
        if (firstAndLastNameMatchParameters(contact, fN, lN)) {
            assignedContacts.splice(i, 1);
            loadContactIcon();
        }
    }
}


/**
 * The Function removes the "tick" at the checkbox in the assignments dropdown menu of the contact that is assigned. It also sets an onclick
 * function assignContact() so the contact can be assigned again later.
 * 
 * @param {number} i - index at assignedContacts of the contact that is removed 
 */
function untickCheckboxOfContact(i) {
    document.getElementById('checkbox' + i).classList.add('d-none');
    document.getElementById('a-option' + i).setAttribute('onclick', `assignContact(${i})`);
}


/**
 * Funktion that checks if parameters fN and lN match with the first and last name of a given contact.
 * 
 * @param {object} contact - contact that is given for name comparison
 * @param {string} fN - first name that needs to match
 * @param {string} lN - last name that needs to match
 * @returns 
 */
function firstAndLastNameMatchParameters(contact, fN, lN) {
    return contact.firstName.toLowerCase().includes(fN) && contact.lastName.toLowerCase().includes(lN)
}


/*----------- INVITE CONTACT FOR TASK -----------*/
/**
 * 
 */
function inviteNewContact() {
    document.getElementById('new-contact-container').classList.add('margin-bottom-zero');
    closeDropdownAssignment();
    showInputField('contact');
    hideDefaultInput('contact');
}

function closeInviteContact() {
    hideInputField('contact');
    showDefaultInput('contact');
}

function inviteContact() {
    let search = document.getElementById('new-contact').value;
    setSpliceCurrentContactVariable(search);
    for (let i = 0; i < contacts.length; i++) {
        const email = contacts[i].email;
        if (email.toLowerCase().includes(search) && assignments.every(a => a.email !== email)) {
            assignments.push(contacts[i]);
            loadAllOptions();
            assignContact(assignments.length - 1);
        } else {
            if (email.toLowerCase().includes(search) && assignments.some(a => a.email == email) && assignedContacts.every(c => c.email !== email)) {
                for (let k = 0; k < assignments.length; k++) {
                    const assignment = assignments[k];
                    if (assignment.email === email) {
                        index = k;
                    }
                }
                loadAllOptions();
                assignContact(index);
            }
        }
    }
    closeInviteContact();
    loadContactIcon();
}




/**
 * The function sets the variable spliceCurrentContact to true if some contact of the assignments array matches the current contact. This
 * is achieved by comparing the value of eaches email.
 * 
 * @param {number} i - index at assignments of the contact that is assigned
 */
function setSpliceCurrentContactVariable(search) {
    if (assignments.some(a => a.email == search)) {
        spliceCurrentContact = false;
    } else {
        spliceCurrentContact = true;
    }
}
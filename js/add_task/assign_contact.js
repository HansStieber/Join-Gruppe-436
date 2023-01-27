let assignedContacts = [];

/*----------- ASSIGN CONTACT FOR TASK -----------*/
function assignContact(i) {
    document.getElementById('checkbox' + i).classList.remove('d-none');
    let fN = contacts[i].firstName.toLowerCase();
    let lN = contacts[i].lastName.toLowerCase();
    assignedContacts.push(contacts[i]);
    console.log(assignedContacts);
    document.getElementById('a-option' + i).setAttribute('onclick', `removeAssignment(${i}, '${fN}', '${lN}')`);
}

function removeAssignment(i, fN, lN) {
    document.getElementById('checkbox' + i).classList.add('d-none');
    document.getElementById('a-option' + i).setAttribute('onclick', `assignContact(${i})`);
    for (let i = 0; i < assignedContacts.length; i++) {
        const contact = assignedContacts[i];
        if (contact.firstName.toLowerCase().includes(fN) && contact.lastName.toLowerCase().includes(lN)) {
            assignedContacts.splice(i, 1);
        }
    }
    console.log(assignedContacts);
}

/*----------- INVITE CONTACT FOR TASK -----------*/
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
let assignedContacts = [];

/*----------- ASSIGN CONTACT FOR TASK -----------*/
function assignContact(i) {
    document.getElementById('checkbox' + i).classList.remove('d-none');
    let fN = assignments[i].firstName.toLowerCase();
    let lN = assignments[i].lastName.toLowerCase();
    assignedContacts.push(assignments[i]);
    document.getElementById('a-option' + i).setAttribute('onclick', `removeAssignment(${i}, '${fN}', '${lN}')`);
    loadContactIcon();
}

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

function removeAssignment(i, fN, lN) {
    document.getElementById('checkbox' + i).classList.add('d-none');
    document.getElementById('a-option' + i).setAttribute('onclick', `assignContact(${i})`);
    for (let i = 0; i < assignedContacts.length; i++) {
        const contact = assignedContacts[i];
        if (contact.firstName.toLowerCase().includes(fN) && contact.lastName.toLowerCase().includes(lN)) {
            assignedContacts.splice(i, 1);
            loadContactIcon();
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

function inviteContact() {
    let search = document.getElementById('new-contact').value;
    for (let i = 0; i < contacts.length; i++) {
        const email = contacts[i].email;
        if (email.toLowerCase().includes(search)) {
            assignments.push(contacts[i]);
        }
    }
    loadAssignmentOptions();
    closeInviteContact();
    openDropdownAssignment();
}
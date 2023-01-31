let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z'];


async function initContacts() {
    await load();
    loadAllOptions();
    renderContacts();
}


function renderContacts() {
    clearCards();
    addCardsDivMainDNone();
    setTimeout(function () {
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            if (contact) {
                const { cardsMainLetter, cardsDivLetter } = getContactInfo(contact);
                cardsMainLetter.classList.remove('d-none');
                cardsDivLetter.innerHTML += getCardInnerHTML(contact, i);
            }
        }
    }, 500)
}


function getContactInfo(contact) {
    ini1 = contact.firstName.slice(0, 1);
    ini2 = contact.lastName.slice(0, 1);
    return {
        email: contact.email,
        phone: contact.phone,
        initials1: ini1,
        initials2: ini2,
        bgColor: contact.color,
        firstName: contact.firstName,
        lastName: contact.lastName,
        cardsMainLetter: document.getElementById(`cards-main-${ini1}`),
        cardsDivLetter: document.getElementById(`cards-div-${ini1}`)
    }
}


function renderBigCard(indexNum) {
    let contact = contacts[indexNum];

    showMobileBigCard();
    setBigCardInnerHTML(contact);

    addOnclickEvent('edit-contact', 'openEditOverlay', indexNum);
    addOnclickEvent('mobile-edit-contact', 'openEditOverlay', indexNum);
}


function setBigCardInnerHTML(contact) {
    const { initials1, initials2, bgColor, email,
        phone, firstName, lastName } = getContactInfo(contact);

    const { initialsSpan, firstNameSpan, lastNameSpan,
        emailLink, phoneSpan, bigCardDiv, initialsDiv } = getBigCardElements();

    initialsSpan.innerHTML = initials1 + initials2;
    firstNameSpan.innerHTML = firstName;
    lastNameSpan.innerHTML = lastName;
    emailLink.innerHTML = email;
    phoneSpan.innerHTML = phone;
    initialsDiv.style = `background-color:${bgColor}`;
    bigCardDiv.classList.remove('d-none');
}


function getBigCardElements() {
    return {
        initialsSpan: document.getElementById('big-card-initials'),
        firstNameSpan: document.getElementById('big-card-firstname'),
        lastNameSpan: document.getElementById('big-card-lastname'),
        emailLink: document.getElementById('big-card-email'),
        phoneSpan: document.getElementById('big-card-phone'),
        bigCardDiv: document.getElementById('big-card'),
        initialsDiv: document.getElementById('big-card-initials-bg')
    }
}


function getCardInnerHTML(contact, i) {
    const { initials1, initials2, bgColor, firstName, lastName } = getContactInfo(contact);
    return /*html*/`
    <div onclick="renderBigCard(${i})" class="contact-card">
        <div class="contact-initials-small" style="background-color:${bgColor}">
            <span>${initials1}</span>
            <span>${initials2}</span>
        </div>
        <div class="contact-card-info">
            <div>
                <span>${firstName}</span>
                <span>${lastName}</span>
            </div>
            <a href="#" style="text-decoration-line:none;">${contact.email}</a>
        </div>
    </div>
`;
}


function addContact() {
    const inputName = document.getElementById('add-name-input');
    const inputEmail = document.getElementById('add-eMail-input');
    const inputPhone = document.getElementById('add-phonenumber-input');
    let nameArray = inputName.value.split(" ");
    if (nameArray.length == 2) {
        contacts.push(new Contact(nameArray[0], nameArray[1], inputPhone.value, inputEmail.value));
        saveContacts();
        closeAddOverlay();
        renderContacts();
        showContactAddedMessage();
    } else {
        alert('Bitte Vorname und Nachname eingeben.');
    }
}


function saveContactChanges(indexNum) {
    const contact = contacts[indexNum]
    const newName = document.getElementById('edit-name-input');
    const newEmail = document.getElementById('edit-eMail-input');
    const newPhone = document.getElementById('edit-phonenumber-input');
    if (newName.value == '' && newEmail.value == '' && newPhone.value == '')
        return;

    const names = newName.value.split(" ");
    changeContactDataIfInput(contact, names, newEmail, newPhone);

    closeEditOverlay();
    renderContacts();
    renderBigCard(indexNum);
}


function changeContactDataIfInput(contact, names, newEmail, newPhone) {
    if (newEmail.value) {
        contact.email = newEmail.value;
    }

    if (newPhone.value) {
        contact.phone = newPhone.value;
    }

    if (nameArray[0] && nameArray[1]) {
        contact.firstName = names[0];
        contact.lastName = names[1];
    } else {
        alert('Bitte Vorname und Nachname eingeben.');
    }
}


function setEditContactInitials(indexNum) {
    let initialsDiv = document.getElementById('edit-initials-div');
    let initialsSpan = document.getElementById('edit-initials-span');
    let contact = contacts[indexNum];
    const { initials1, initials2, bgColor } = getContactInfo(contact);
    initialsDiv.style = `background-color:${bgColor}`;
    initialsSpan.innerHTML = initials1 + initials2;
}


function showContactAddedMessage() {
    popInContactAddedMessage();
    setTimeout(popOutContactAddedMessage, 1500);
}


function popInContactAddedMessage() {
    let message = document.getElementById('contact-created-message');
    message.classList.remove('d-none');
    message.classList.remove('slide-down');
    message.classList.add('slide-up');
}


function popOutContactAddedMessage() {
    let message = document.getElementById('contact-created-message');
    message.classList.remove('slide-up')
    message.classList.add('slide-down')
    setTimeout(() => {
        message.classList.add('d-none');
    }, 500);
}


function showMobileBigCard() {
    let outerDiv = document.getElementById('contacts-outer-div');
    let rightDiv = document.getElementById('contacts-right-div');
    outerDiv.classList.add('overflow-hidden');
    rightDiv.classList.remove('right-div-mobile');
}


function closeMobileBigCard() {
    let outerDiv = document.getElementById('contacts-outer-div');
    let rightDiv = document.getElementById('contacts-right-div');
    outerDiv.classList.remove('overflow-hidden');
    rightDiv.classList.add('right-div-mobile');
}


function clearCards() {
    for (let i = 0; i < abc.length; i++) {
        const letter = abc[i];
        const cardsDiv = document.getElementById(`cards-div-${letter}`);
        cardsDiv.innerHTML = '';
    }
}


function addCardsDivMainDNone() {
    for (let i = 0; i < abc.length; i++) {
        const letter = abc[i];
        const cardsDivMain = document.getElementById(`cards-main-${letter}`);
        cardsDivMain.classList.add('d-none');
    }
}


function checkIfFirstname(firstName) {
    if (firstName) {
        let newFirstName = upperCaseFirstLetter(firstName);
        return newFirstName;
    }
}


function addOnclickEvent(htmlElement, functionName, indexNum) {
    let editContactBtn = document.getElementById(`${htmlElement}`);
    editContactBtn.setAttribute("onclick", `${functionName}(${indexNum})`);
}


function upperCaseFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function generateRandomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
}

/*----------- SHOW/CLOSE OVERLAY -----------*/

function openEditOverlay(indexNum) {
    document.getElementById('editContactOverlay').classList.remove('d-none');
    setEditContactInitials(indexNum);
    addOnclickEvent('edit-save-btn', 'saveContactChanges', indexNum);
    showShadowScreen('edit-contact-shadow-screen');
    slideInCard('edit-contact-overlay');
}


function closeEditOverlay() {
    slideOutCard('edit-contact-overlay');
    hideShadowScreen('edit-contact-shadow-screen');
    setTimeout(function () { document.getElementById('editContactOverlay').classList.add('d-none'); }, 450);
}


function openAddOverlay() {
    document.getElementById('addContactOverlay').classList.remove('d-none');
    showShadowScreen('add-contact-shadow-screen');
    slideInCard('add-contact-overlay');
    showNewTaskCloseBtn();
}


function closeAddOverlay() {
    slideOutCard('add-contact-overlay');
    hideShadowScreen('add-contact-shadow-screen');
    hideNewTaskCloseBtn();
    setTimeout(function () { document.getElementById('addContactOverlay').classList.add('d-none'); }, 450);
}

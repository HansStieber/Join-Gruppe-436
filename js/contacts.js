let contacts = [];
let contactToEditId;
let actualCard;
let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z'];


async function initContacts() {
    await load();
    renderContacts();
    checkURLandHighlight('contacts')
}


/**
 * This function first clear all Card divs. 
 * Then added 'd-none' class to all Card-main divs.
 * Then loop thru contacts Array.
 * For each Contact we:
 * get the cardsDivLetter Element,
 * remove 'd-none' from the Card-main div,
 * and render the current Contact into the
 * current cardsDivLetter Element.
 */
function renderContacts() {
    clearCards();
    addDnoneCardsDivMain();
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact) {
            const { cardsDivLetter } = getCardElements(contact);
            removeDnoneCardsDivMain(contact);
            cardsDivLetter.innerHTML += getCardInnerHTML(contact, i);
        }
    }

}


/**
 * 
 * @param {object} contact - the actual Contact object.
 * @returns two HTML Elements with the Id's from actual Contact's,
 * firstname-firstletter.
 * @example:
 * contact firstname = 'Andreas', initials1 = 'A',
 * the return = 
 *      cardsMainLetter: document.getElementById(`cards-main-A`),
 *      cardsDivLetter: document.getElementById(`cards-div-A`)
 */
function getCardElements(contact) {
    const { initials1 } = getContactInfo(contact);
    return {
        cardsMainLetter: document.getElementById(`cards-main-${initials1}`),
        cardsDivLetter: document.getElementById(`cards-div-${initials1}`)
    }
}


/**
 * This function returns all Info from given Contact,
 * and cur the firsletter from firsname and lastname,
 * to get the Initials.
 * 
 * @param {object} contact - the actual Contact object.
 * @returns all info from actual Contact.
 * @example:
 *  return{ 
 *      email: contact@mail.com,
 *      phone: 015145546531,
 *      initials1: 'A',
 *      initials2: 'H',
 *      bgColor: 'blue',
 *      firstName: 'Andreas',
 *      lastName: 'Huber'}
 */
function getContactInfo(contact) {
    contact.firstName.slice(0, 1)
    return {
        email: contact.email,
        phone: contact.phone,
        initials1: contact.firstName.slice(0, 1),
        initials2: contact.lastName.slice(0, 1),
        bgColor: contact.color,
        firstName: contact.firstName,
        lastName: contact.lastName,
    }
}


function renderBigCard(indexNum) {
    let contact = contacts[indexNum];
    contactToEditId = indexNum;
    showBigCard();
    showMobileBigCard();
    setBigCardInnerHTML(contact);
}


function setBigCardInnerHTML(contact) {
    const { initials1, initials2, bgColor, email,
        phone, firstName, lastName } = getContactInfo(contact);

    const { initialsSpan, firstNameSpan, lastNameSpan,
        emailLink, phoneSpan, initialsDiv } = getBigCardElements();

    initialsSpan.innerHTML = initials1 + initials2;
    firstNameSpan.innerHTML = firstName;
    lastNameSpan.innerHTML = lastName;
    emailLink.innerHTML = email;
    phoneSpan.innerHTML = phone;

    initialsDiv.style = `background-color:${bgColor}`;

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
    <div onclick="renderBigCard(${i}),addHighlightContactCard(${i + 1})" id="contact-card-${i + 1}" class="contact-card">
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
    let names = inputName.value.split(" ");
    let lastName = names[names.length - 1];
    contacts.push(new Contact(names[0], lastName, inputPhone.value, inputEmail.value));

    saveArrayToBackend('contact', contacts);
    closeAddOverlay();
    renderContacts();
    showContactAddedMessage();
}


function deleteContact() {
    showDeleteBtn();
    contacts.splice(contactToEditId, 1);
    saveArrayToBackend('contact', contacts);
    hideBigCard();
    closeEditOverlay();
    renderContacts();
}


function saveContactChanges() {
    const contact = contacts[contactToEditId]
    const { nameInput, emailInput, phoneInput } = getEditInputs();
    let contactName = contact.firstName + ' ' + contact.lastName;
    if (nameInput.value == '' && emailInput.value == '' && phoneInput.value == '')
        return;
    if (nameInput.value == contactName && emailInput.value == contact.email && phoneInput.value == contact.phone)
        return;
    const names = nameInput.value.split(" ");

    changeContactDataIfInput(contact, names, emailInput, phoneInput);
    saveArrayToBackend('contact', contacts);
    renderContacts();
    closeEditOverlay();
    renderBigCard(contactToEditId);
}


function getEditInputs() {
    return {
        nameInput: document.getElementById('edit-name-input'),
        emailInput: document.getElementById('edit-eMail-input'),
        phoneInput: document.getElementById('edit-phonenumber-input')
    }
}


function changeContactDataIfInput(contact, names, emailInput, phoneInput) {
    if (emailInput.value) {
        contact.email = emailInput.value;
    }

    if (phoneInput.value) {
        contact.phone = phoneInput.value;
    }

    if (names[0] && names[1]) {
        contact.firstName = names[0];
        contact.lastName = names[1];
    }
}


function setEditContactInitials() {
    let initialsDiv = document.getElementById('edit-initials-div');
    let initialsSpan = document.getElementById('edit-initials-span');
    let contact = contacts[contactToEditId];
    const { initials1, initials2, bgColor } = getContactInfo(contact);
    initialsDiv.style = `background-color:${bgColor}`;
    initialsSpan.innerHTML = initials1 + initials2;
}


function setEditContactValues() {
    let contact = contacts[contactToEditId];
    const { nameInput, emailInput, phoneInput } = getEditInputs();
    contactName = (contact.firstName + ' ' + contact.lastName);

    nameInput.value = contactName;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;
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


function showBigCard() {
    const { bigCardDiv } = getBigCardElements();
    bigCardDiv.classList.remove('d-none');
}


function hideBigCard() {
    const { bigCardDiv } = getBigCardElements();
    bigCardDiv.classList.add('d-none');
}


function showMobileBigCard() {
    let outerDiv = document.getElementById('contacts-outer-div');
    let rightDiv = document.getElementById('contacts-right-div');
    outerDiv.classList.add('overflow-hidden');
    rightDiv.classList.remove('right-div-mobile');
}


function hideMobileBigCard() {
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


/**
 * This function iterates thru the abc[] array, to add all Cards-main-${letter} divs the class 'd-none'.
 * 
 * @param {string} letter - This is the actual letter (one from A-Z), in the for-loop, we work with.
 * @param {element} cardsDivMain - This is the actual Element, who gets the 'd-none' class.
 */
function addDnoneCardsDivMain() {
    for (let i = 0; i < abc.length; i++) {
        const letter = abc[i];
        const cardsDivMain = document.getElementById(`cards-main-${letter}`);
        cardsDivMain.classList.add('d-none');
    }
}


/**
 * This function removes the 'd-none' class from Cards-Letter div, with a Id similar to
 * to first Letter from current renderd Contacts firstname.
 * 
 * @param {object} contact - This is the current to rendered Contact Object.
 * @param {element} cardsMainLetter - This the Element we remove the class 'd-none'.
 */
function removeDnoneCardsDivMain(contact) {
    const { cardsMainLetter } = getCardElements(contact);
    cardsMainLetter.classList.remove('d-none');
}


function addHighlightContactCard(i) {
    if (actualCard) {
        removeHighlightContactCard();
    }
    let card = document.getElementById(`contact-card-${i}`);
    card.classList.add('contact-card-target');
    actualCard = i;
}


function removeHighlightContactCard() {
    let card = document.getElementById(`contact-card-${actualCard}`);
    card.classList.remove('contact-card-target');
}


function checkIfFirstname(firstName) {
    if (firstName) {
        let newFirstName = upperCaseFirstLetter(firstName);
        return newFirstName;
    }
}


function upperCaseFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function generateRandomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
}


/*----------- SHOW/CLOSE OVERLAY -----------*/
function openEditOverlay() {
    document.getElementById('editContactOverlay').classList.remove('d-none');
    setEditContactInitials();
    setEditContactValues();
    showShadowScreen('edit-contact-shadow-screen');
    slideInCard('edit-contact-overlay');
}


function closeEditOverlay() {
    showDeleteBtn();
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

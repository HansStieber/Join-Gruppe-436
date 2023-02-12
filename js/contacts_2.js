/**
 * This function returns elements found via Id.
 * 
 * @returns {elements}
 */
function getEditInputs() {
    return {
        nameInput: document.getElementById('edit-name-input'),
        emailInput: document.getElementById('edit-eMail-input'),
        phoneInput: document.getElementById('edit-phonenumber-input')
    }
}


/**
 * This function changes contact Data, If the input is valid.
 * 
 * @param {object} contact - current Contact DAta
 * @param {array} names - array filled with the Names from User input, on editContact.
 * @param {element} emailInput
 * @param {element} phoneInput
 */
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


/**
 * This function sets the Contact initials at edit Contact HTMl-Element.
 * 
 */
function setEditContactInitials() {
    let initialsDiv = document.getElementById('edit-initials-div');
    let initialsSpan = document.getElementById('edit-initials-span');
    let contact = contacts[contactToEditId];

    const { initials1, initials2, bgColor } = getContactInfo(contact);
    initialsDiv.style = `background-color:${bgColor}`;
    initialsSpan.innerHTML = initials1 + initials2;
}


/**
 * This function fill the input values on edit Contact HTMl-Element,
 * with current Contact information.
 */
function setEditContactValues() {
    let contact = contacts[contactToEditId];
    const { nameInput, emailInput, phoneInput } = getEditInputs();
    contactName = (contact.firstName + ' ' + contact.lastName);

    nameInput.value = contactName;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;
}


/**
 * This function shows the Contact added Animation.
 */
function showUserFeedbackMessage(text) {
    popInUserFeedbackMessage(text);
    setTimeout(popOutUserFeedbackMessage, 1500);
}


/**
 * This function manipulate the contact added message classes, to show the css Animation. 
 */
function popInUserFeedbackMessage(text) {
    let message = document.getElementById('contact-created-message');
    message.innerHTML = text;
    message.classList.remove('d-none');
    message.classList.remove('slide-down');
    message.classList.add('slide-up');
}


/**
 * This function manipulate the contact added message classes, to show the css Animation. 
 */
function popOutUserFeedbackMessage() {
    let message = document.getElementById('contact-created-message');
    message.classList.remove('slide-up')
    message.classList.add('slide-down')
    setTimeout(() => {
        message.classList.add('d-none');
    }, 500);
}

function showBigCard() {
    const { bigCardDiv } = getBigCardElements();
    bigCardDiv.classList.add('d-none');
    setTimeout(function () {
        bigCardDiv.classList.remove('d-none')
        slideInCard('big-card-0')
    }, 125);
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


/**
 * This function iterates thru the abc Array, and search for all cardsDiv elements,
 * with given letter like `cards-div-A` till `cards-div-Z`.
 * and  clear their innerHTMl. 
 */
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


/**
 * This function first checks if the param actualCard is filled, call a function if true.
 * Then Highlight a Contact Card, thru the ID, given to the function.
 * Then filled the param actualCard with the ID of the Highlighted Contact.
 * 
 * @param {number} i -ID of the contact to Highlighte.
 * @param {number} actualCard -Globar var, filled with the ID of the current Higlited Contact.
 */
function addHighlightContactCard(i) {
    if (!actualCard == 0) {
        removeHighlightContactCard();
    }
    let card = document.getElementById(`contact-card-${i}`);
    card.classList.add('contact-card-target');
    actualCard = i;
}


function removeHighlightContactCard() {
    let card = document.getElementById(`contact-card-${actualCard}`);
    card.classList.remove('contact-card-target');
    actualCard = 0;
}


/*----------- SHOW/CLOSE OVERLAY -----------*/
function openEditOverlay() {
    document.getElementById('editContactOverlay').classList.remove('d-none');
    setEditContactInitials();
    setEditContactValues();
    checkIfMobileOpening('edit-contact-shadow-screen', 'edit-contact-overlay');
}


function openAddOverlay() {
    document.getElementById('addContactOverlay').classList.remove('d-none');
    checkIfMobileOpening('add-contact-shadow-screen', 'add-contact-overlay');
}


function checkIfMobileOpening(shadowscreen, overlay) {
    if (window.innerWidth > 992) {
        showShadowScreen(`${shadowscreen}`)
        slideInCard(`${overlay}`)
    } else {
        showShadowScreen(`${shadowscreen}`)
    }
}


function closeEditOverlay() {
    showDeleteBtn();
    checkWindowSizeforClosing('edit-contact-shadow-screen', 'edit-contact-overlay')
    setTimeout(() => { document.getElementById('editContactOverlay').classList.add('d-none'); }, 450);
}


function closeAddOverlay() {
    checkWindowSizeforClosing('add-contact-shadow-screen', 'add-contact-overlay')
    setTimeout(() => { document.getElementById('addContactOverlay').classList.add('d-none'); }, 450);
}


function checkWindowSizeforClosing(shadowscreen, overlay) {
    if (window.innerWidth > 992) {
        slideOutCard(`${overlay}`);
        hideShadowScreen(`${shadowscreen}`)
    } else {
        hideShadowScreen(`${shadowscreen}`);
    }
}
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
 * and slices the firsletter from firsname and lastname,
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


/**
 * This function shows the BigCard wich is a Detail view form a Contact, out of the contacts Array.
 * 
 * @param {number} indexNum - given Number wich has each Contact in contacts Array to get the right Contac to render in BigCard.
 * @param {number} contactToEditId -var needed to find the right Contact in contacts Array, when the User want to Edit,
 * the Contact wich is current shown in BigCard.
 * 
 * First getting the right contact from contacts Array, with indexNum.
 * Then calls showBigCard() wich removes display: 'none', from BigCard Element.
 * Then showMobileBigCard(), if the User is on Low screenSize, the BigCard renders above the contacts List.
 * Last all HTML Elements from the BigCard get filled with the information, from contact found in the Array with given indexNum.
 */
function renderBigCard(indexNum) {
    let contact = contacts[indexNum];
    contactToEditId = indexNum;
    showBigCard();
    showMobileBigCard();
    setBigCardInnerHTML(contact);
}


/**
 * 
 * @param {object} contact --Object with all information needed to show detail View of choosen Contact
 * First define const{all Information from given contact}, thru calling the function getContactInfo(contact).
 * Then define const{all Elements from BigCard}, thru calling the function getBigCardElements().
 * Then innerHTML all given contacts Information into HTML-Elements.
 */
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


/**
 * This function return HTML Elements found thru IDs and returns them in an Array
 * @example
 * return{
 *      initialsSpan: HTML-Element,
        firstNameSpan: HTML-Element,
        lastNameSpan: HTML-Element,
        emailLink: HTML-Element,
        phoneSpan: HTML-Element,
        bigCardDiv: HTML-Element,
        initialsDiv: HTML-Element
 */
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


/**
 * This function defines vars and calls getContactInfo(with given contac Object), to fill the definend vars with found contact info,
 * then generate and return Html-template with filled vars.
 * 
 * @param {object} contact -Object filled with all information needed to show detail View from given Contact. 
 * @param {number} i -index Number: is the number that the current Contact, become to find and manipulate the Contac later.  
 * @returns 
 */
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


/**
 * This function adds an Contact to the contacs Array.
 * First defince const's and fill them, with the values from the user input.
 * Then split the name Value on all empty Spaces, and give the created array into names var.
 * Then let the lastName, be the last string in created names Array.
 * Then create new Contact with created vars, and push existing contacts Array with the new Contact.
 * Then save manipulated Array to Backend, thru the function saveArrayToBackend().
 * Then calls the closeAddOverlay() function, to close Add Overlay.
 * Then renderContacts(), to show all contacts, from manipulated contacts Array.
 * Last it shows the User the contact sucessfully added message.
 */
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


/**
 * This functio delete a Contacs from the contacts Array.
 * 
 * @param {number} contactToEditId - global Id to get the right Contact to Edit out of the contacts Array,
 * (filled in renderBigCard() function).
 * 
 * First is shows the delete Button.
 * Then delete the current in BigCard shown Contact, from contacts Array.
 * Then save manipulated Array to Backend.
 * Then call hideBigCard(), wich gives the BigCard Element Display: 'none'.
 * Then close Edit-overlay.
 * Then render Contacts, to update the Site.
 */
function deleteContact() {
    showDeleteBtn();
    contacts.splice(contactToEditId, 1);
    saveArrayToBackend('contact', contacts);
    hideBigCard();
    closeEditOverlay();
    renderContacts();
}


/**
 * This function saves the edited Contact information, if there are inputs.
 * 
 * @param {string} contacName - filled with the current Contact First-Lastname, and one Space between.
 * @param {array} names - filled with all strings out of nameInput,splitet on Spaces.
 * 
 * @returns {nothing} -if conditons not fullfilled.
 */
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
function showContactAddedMessage() {
    popInContactAddedMessage();
    setTimeout(popOutContactAddedMessage, 1500);
}


/**
 * This function manipulate the contact added message classes, to show the css Animation. 
 */
function popInContactAddedMessage() {
    let message = document.getElementById('contact-created-message');
    message.classList.remove('d-none');
    message.classList.remove('slide-down');
    message.classList.add('slide-up');
}


/**
 * This function manipulate the contact added message classes, to show the css Animation. 
 */
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
    setTimeout(function () { document.getElementById('editContactOverlay').classList.add('d-none'); }, 450);
}


function closeAddOverlay() {
    checkWindowSizeforClosing('add-contact-shadow-screen', 'add-contact-overlay')
    setTimeout(function () { document.getElementById('addContactOverlay').classList.add('d-none'); }, 450);
}


function checkWindowSizeforClosing(shadowscreen, overlay) {
    if (window.innerWidth > 992) {
        slideOutCard(`${overlay}`);
        hideShadowScreen(`${shadowscreen}`)
    } else {
        hideShadowScreen(`${shadowscreen}`);
    }
}

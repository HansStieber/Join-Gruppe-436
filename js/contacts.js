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
    setBigCardInnerHTML(contact, indexNum);
}


/**
 * 
 * @param {object} contact --Object with all information needed to show detail View of choosen Contact
 * First define const{all Information from given contact}, thru calling the function getContactInfo(contact).
 * Then define const{all Elements from BigCard}, thru calling the function getBigCardElements().
 * Then innerHTML all given contacts Information into HTML-Elements.
 */
function setBigCardInnerHTML(contact, indexNum) {
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
 * This function return HTML Elements found thru IDs and returns them in a JSON
 * @example
 * 
 */
function getBigCardElements() {
    return {
        initialsSpan: document.getElementById('big-card-initials'),
        firstNameSpan: document.getElementById('big-card-firstname'),
        lastNameSpan: document.getElementById('big-card-lastname'),
        emailLink: document.getElementById('big-card-email'),
        phoneSpan: document.getElementById('big-card-phone'),
        bigCardDiv: document.getElementById('big-card-0'),
        initialsDiv: document.getElementById('big-card-initials-bg')
    }
}


/**
 * This function defines vars and calls getContactInfo(with given contact Object), to fill the definend vars with found contact info,
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
            <a href="#">${contact.email}</a>
        </div>
    </div>
`;
}


/**
 * This function adds an Contact to the contacs Array.
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
    showUserFeedbackMessage('Contact succesfully Created');
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
    removeHighlightContactCard();
    hideBigCard();
    closeEditOverlay();
    showUserFeedbackMessage('Contact succesfully Deleted');
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
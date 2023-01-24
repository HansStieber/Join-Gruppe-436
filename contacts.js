class Person {
    firstName;
    lastName;
    email;
    color;
    password;
    constructor(firstName, lastName, email, password, color) {
        this.firstName = upperCaseFirstLetter(firstName);
        this.lastName = upperCaseFirstLetter(lastName);
        this.email = email;
        if (color) {
            this.color = color;
        } else {
            this.color = generateRandomColor();
        }
        this.password = password;
    }


}


class Contact extends Person {
    phone;

    constructor(firstName, lastName, phone, email, password, color) {
        super(firstName, lastName, email, password, color);
        this.phone = phone;
    }

    call() {
        window.location.href = 'tel:' + this.phone;
    }
}


let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let contacts = [
    new Contact('Hans', 'Stieber', '01518547387', 'stieber@mail.de', 'P4SsW0rTeins2drei', 'blue'),
    new Contact('Daniela', 'Scholz', '01518543875', 'scholz@mail.de', 'P4SsW0rTeins2drei', 'purple'),
    new Contact('Sasha', 'Seslija', '01518543875', 'seslija@mail.de', 'P4SsW0rTeins2drei', 'green'),
    new Contact('Pierre', 'Lettner', '0151854715', 'lettner@mail.de', 'P4SsW0rTeins2drei,', 'red'),
    new Contact('Fans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei', 'cyan'),
    new Contact('Jans', 'Petersson', '01518543875', 'petersson@mail.de', 'P4SsW0rTeins2drei', 'grey'),
    new Contact('Kans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Qans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Xans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Sans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Aans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Yans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Bans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Uans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei')
];


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

    const { initials1, initials2, bgColor, email,
        phone, firstName, lastName } = getContactInfo(contact);

    const { initialsSpan, firstNameSpan, lastNameSpan,
        emailLink, phoneSpan, bigCardDiv, initialsDiv } = getBigCardElements();

    initialsSpan.innerHTML = initials1 + initials2;;
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
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('eMail');
    const inputPhone = document.getElementById('phonenumber');
    let nameArray = inputName.value.split(" ");
    if (nameArray.length == 2) {
        contacts.push(new Contact(nameArray[0], nameArray[1], inputPhone.value, inputEmail.value));
        closeAddOverlay();
        renderContacts();
    } else {
        console.log('Bitte Vorname und Nachname eingeben,(es wird nur ein Vorname aktzeptiert).')
    }

}


function upperCaseFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function generateRandomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
}


function openEditOverlay() {
    document.getElementById('editContactOverlay').classList.remove('d-none');
}


function closeEditOverlay() {
    document.getElementById('editContactOverlay').classList.add('d-none');
}


function openAddOverlay() {
    document.getElementById('addContactOverlay').classList.remove('d-none');
}


function closeAddOverlay() {
    document.getElementById('addContactOverlay').classList.add('d-none');
}

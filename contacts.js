class Person {
    firstName;
    lastName;
    email;
    constructor(firstName, lastName, email) {
        this.firstName = upperCaseFirstLetter(firstName);
        this.lastName = upperCaseFirstLetter(lastName);
        this.email = email;
    }
}

class Contact extends Person {
    password;
    phone;

    constructor(firstName, lastName, phone, email, password) {
        super(firstName, lastName, email);
        this.phone = phone;
        this.password = password;
    }

    call() {
        window.location.href = 'tel:' + this.phone;
    }
}

let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let contacts = [
    new Contact('Hans', 'Stieber', '0151854715', 'stieber@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Daniela', 'Scholz', '0151854715', 'scholz@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Sasha', 'Seslija', '0151854715', 'seslija@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('zans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Fans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Jans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Kans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Qans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Xans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Sans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Aans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Yans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Bans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei'),
    new Contact('Uans', 'Petersson', '0151854715', 'petersson@mail.de', 'P4SsW0rTeins2drei')
];

function upperCaseFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
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

function renderContacts() {
    clearCards();
    addCardsDivMainDNone();
    setTimeout(function () {
        for (let i = 0; i < contacts.length; i++) {

            const contact = contacts[i];
            const firstNameFirstLetter = contact.firstName.slice(0, 1);
            const lastNameFirstLetter = contact.lastName.slice(0, 1);
            if (contact) {
                const cardsMainLetter = document.getElementById(`cards-main-${firstNameFirstLetter}`);
                cardsMainLetter.classList.remove('d-none');
                const cardsDivLetter = document.getElementById(`cards-div-${firstNameFirstLetter}`);
                cardsDivLetter.innerHTML +=/*html*/`
            <div class="contact-card">
                <div class="contact-initials-small">
                    <span>${firstNameFirstLetter}</span>
                    <span>${lastNameFirstLetter}</span>
                </div>
                <div class="contact-card-info">
                    <div>
                        <span>${contact.firstName}</span>
                        <span>${contact.lastName}</span>
                    </div>
                    <a href="#" style="text-decoration-line:none;">${contact.email}</a>
                </div>
            </div>
        `;
            }
        }
    }, 200)
}

function openEditOverlay(){
    document.getElementById('editContactOverlay').classList.remove('d-none');
}

function closeEditOverlay(){
    document.getElementById('editContactOverlay').classList.add('d-none');
}

function openAddOverlay(){
    document.getElementById('addContactOverlay').classList.remove('d-none');
}

function closeAddOverlay(){
    document.getElementById('addContactOverlay').classList.add('d-none');
}

class Contact {
    phone;
    firstName;
    lastName;
    email;
    color;
    password;

    constructor(firstName, lastName, phone, email, password, color) {
        this.phone = phone;

        this.firstName = checkIfFirstname(firstName);
        this.lastName = upperCaseFirstLetter(lastName);
        this.email = email;
        if (color) {
            this.color = color;
        } else {
            this.color = generateRandomColor();
        }
        this.password = password;
    }

    call() {
        window.location.href = 'tel:' + this.phone;
    }
}
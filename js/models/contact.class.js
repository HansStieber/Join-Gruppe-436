class Contact {
    phone;
    firstName;
    lastName;
    email;
    color;
    password;

    constructor(firstName, lastName, phone, email, password, color) {
        this.phone = phone;

        this.firstName = this.checkIfFirstname(firstName);
        this.lastName = this.upperCaseFirstLetter(lastName);
        this.email = email;
        if (color) {
            this.color = color;
        } else {
            this.color = this.generateRandomColor();
        }
        this.password = password;
    }

    checkIfFirstname(firstName) {
        if (firstName) {
            let newFirstName = this.upperCaseFirstLetter(firstName);
            return newFirstName;
        }
    }

    upperCaseFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    generateRandomColor() {
        return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    }

    call() {
        window.location.href = 'tel:' + this.phone;
    }
}
class Task {
    title;
    description;
    category;
    assignments;
    date;
    priority;
    subtasks;

    constructor(title, description, categoryTitle, assignedContacts, color, date) {
        this.title = title;
        this.description = description;
        this.category = new Category(categoryTitle, color);
        this.assignments = assignedContacts;
        this.date = date;
    }
}
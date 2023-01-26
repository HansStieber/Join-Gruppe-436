class Task {
    title;
    description;
    category;
    assignments;
    date;
    priority;
    subtasks;

    constructor(title, description, categoryTitle, assignedContacts, color, date, urgent, medium, low) {
        this.title = title;
        this.description = description;
        this.category = new Category(categoryTitle, color);
        this.assignments = assignedContacts;
        this.date = date;
        this.priority = new Priority(urgent, medium, low);
    }
}
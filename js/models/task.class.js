class Task {
    title;
    description;
    category;
    assignments;
    date;
    priority;
    subtasks;
    positionBoard;
    constructor(title, description, categoryTitle, assignedContacts, color, date, urgent, medium, low, subtasks) {
        this.title = title;
        this.description = description;
        this.category = new Category(categoryTitle, color);
        this.assignments = assignedContacts;
        this.date = date;
        this.priority = new Priority(urgent, medium, low);
        this.subtasks = subtasks;
    }
}
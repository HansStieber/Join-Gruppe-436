class Task {
    title;
    description;
    category;
    assignments;
    date;
    priority;
    subtasks;
    status;
    id;
    constructor(title, description, categoryTitle, assignedContacts, color, date, priority, subtasks, status, id) {
        this.title = title;
        this.description = description;
        this.category = new Category(categoryTitle, color);
        this.assignments = assignedContacts;
        this.date = date;
        this.priority = priority;
        this.subtasks = subtasks;
        this.status = status;
        this.id = id;
    }
}
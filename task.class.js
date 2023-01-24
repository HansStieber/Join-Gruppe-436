class Task {
    title;
    description;
    category;
    assignments;
    date;
    priority;
    subtasks;

    constructor(title, description, date) {
        this.title = title;
        this.description = description;

        this.date = date;
    }
}
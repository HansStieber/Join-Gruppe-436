class Task {
    title;
    description;
    category;
    assignments;
    date;
    priority;
    subtasks;

    constructor(title, description, category, date) {
        this.title = title;
        this.description = description;
        this.category = category;

        this.date = date;
    }
}
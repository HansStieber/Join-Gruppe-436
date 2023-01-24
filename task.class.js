class Task {
    title;
    description;
    category;
    assignments;
    date;
    priority;
    subtasks;

    constructor(title, description, categoryTitle, color, date) {
        this.title = title;
        this.description = description;
        this.category = new Category(categoryTitle, color);

        this.date = date;
    }
}
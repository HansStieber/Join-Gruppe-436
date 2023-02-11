/*----------- FUNCTIONS FOR PUSHING AND SAVING A NEW TASK -----------*/
/**
 * The function pushes a new task to the todos array. It therefore first sets all values that are not yet set as a global variable and pushes
 * them together as a new task. The structure of a new Task is defined by the Task class. It also saves the new task, categories and assignmentoptions
 * to the backend database.
 * 
 * @param {string} title - title for class new Task
 * @param {string} description - description for class new Task
 * @param {string} categoryTitle - title for class new Category
 * @param {string} date - date for class new Task
 * @param {object} newTask - object that includes all information of a new task
 */
async function pushTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let categoryTitle = document.getElementById('new-category-title').innerHTML;
    let date = document.getElementById('date').value;
    getPriority();
    getId();
    let newTask = new Task(title, description, categoryTitle, assignedContacts, currentColor, date, priority, subtasksChecked, progressStatus, id);
    todos.push(newTask);
    await saveToBackend(categoryTitle);
}


/**
 * The function defines the variable id as the todos array length.
 */
function getId() {
    id = todos.length;
}


/**
 * The function saves the new Task, newly created categories and the assignment options to the backend database.
 */
async function saveToBackend(categoryTitle) {
    await saveTasks();
    await saveCategories(categoryTitle);
    await saveAssignmentOptions();
}


/**
 * The function saves the todos array at the backend database.
 */
async function saveTasks() {
    let todosAsText = JSON.stringify(todos);
    await backend.setItem('todo', todosAsText);
}


/**
 * The function saves the categories array at the backend database.
 */
async function saveCategories() {
    let categoriesAsText = JSON.stringify(categories);
    await backend.setItem('category', categoriesAsText);
}


/**
 * The function saves the assignments array at the backend database.
 */
async function saveAssignmentOptions() {
    let assignmentsAsText = JSON.stringify(assignments);
    await backend.setItem('assignments', assignmentsAsText);
}



/**
 * Define JSON
 * @typedef {string} JSON
 */

/**
 * This function generates the html of the task cards at the board.
 * 
 * @param {JSON} element - Task of which html is generated
 * @param {Array} assignments - Assignments of the selected task
 * @returns 
 */
function generateHTMLTaskCard(element) {

    return /*html*/ `
    <div class="card" id="${element.id}" draggable="true" onclick="showTaskCard(${element.id})"
    ondragstart="startDragging(${element.id})" ondragend="hideDropableSpace()">
    <div class="card-name ${element.category.color}">${element.category.title}</div>
    <div class="card-text">
        <span class="card-headline">${element.title}</span>
        <span class="card-info">${element.description}</span>
        <div id="progress-bar-${element.id}" class="progress-div d-none">
            <div class="progress-bar">
                <div class="inner-progress-bar" style="width:${calculateProgressBar(element)}%"></div>
            </div>
            <span>${checkedSubtasks}</span>
            <span>/</span>
            <span>${element.subtasks.length}</span>
            <span style="margin-left: 5px">Done</span>
        </div>
    </div>
    <div id="card-bottom-${element.id}" class="card-bottom">
        
        <div class="priority-div"><img src="assets/img/priority-${element.priority}.svg"></div>
    </div>
    </div>
    `;
}

function generateHTMLTaskCardAssignments(assignments, element, firstUserIcon) {
    return /*html*/`
<div id="user-icons-${element.id}" class="user-icons">
            <div id="first-user-icon-${element.id}" class="user-icon" style="background:${assignments[0].color}">
                <span>${firstUserIcon}</span></div>
        </div>
        `;
}

/**
 * This function generates the html for the detail card when a task card is clicked at the board.
 * 
 * @param {number} idOfCard - Id of the selected card
 * @returns - html of the detail card
 */
function generateHTMLDetailCard(idOfCard) {
    taskToEdit = idOfCard;
    let todoArray = todos[idOfCard];
    let categoryTitel = todoArray.category.title;
    let categoryBg = todoArray.category.color;
    let title = todoArray.title;
    let description = todoArray.description;
    let date_DE = new Date(todoArray.date).toLocaleDateString('de-DE');
    let priority = todoArray.priority;
    return /*html*/`
        
        <img src="assets/img/close.svg" alt="closing-icon" class="icon-settings" onclick="closeDetailView()">
        <img src="assets/img/left_arrow.svg" alt="left arrow" class="icon-settings d-none">
        <div class="detail-view-category">
        <div class="category-styling ${categoryBg}">
        ${categoryTitel}</div>
        <img src="assets/img/arrow-left-contacts.svg" alt="back-arrow" class="detail-view-arrow" onclick="closeDetailView()">
        </div>
        <div class="detail-view-title">${title}</div>
        <div>${description}</div>
        <div class="flex-center">
            <span class="subheading-styling">Due date: </span>
            <div>${date_DE}</div>
        </div>
        <div class="flex-center">
            <span class="subheading-styling">Priority: </span>
            <img class="priority-detail-view" src="assets/img/${priority}_detailview.svg">
        </div class="flex-center">
            <span class="subheading-styling">Assigned to: </span>
        <div id="assignedContacts"></div>

        <div class="detail-view-bottom">
            <div class="detail-view-btn-div"> 
                <button id="moveBtn" onclick="openMoveMenu()" class="btn-dark move-btn" > Move</button>
                <div id="mobileMove" class="mobile-move d-none">
                    <div onclick="mobileMoveTo(${idOfCard},'todo')">To do</div>
                    <div onclick="mobileMoveTo(${idOfCard},'progress')">In progress</div>
                    <div onclick="mobileMoveTo(${idOfCard},'feedback')">Feedback</div>
                    <div onclick="mobileMoveTo(${idOfCard},'done')">Done</div>
                </div>
                <button id="edit-delete-btn" onclick="confirmDelete('deleteTask()')" class="delete-btn delete-btn-board" type="button">
                        <div>
                            <span id="delete-btn-span">Delete</span>
                            <img src="assets/img/close.svg">
                        </div>
                </button>
                    <img id="edit-icon" src="assets/img/pencil-btn-default.svg" alt="icon of a pencil" class="edit-task-btn detail-view-edit-btn" onclick="editTask(${idOfCard})">
            </div>               
        </div>

`;
}
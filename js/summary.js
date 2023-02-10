async function initSummary() {
    await load();
    updateSummary();
    daytimeGreeting();
    greetingUser();
    checkURLandHighlight('summary');
}


/**
 * This function, gets all lengths of each todos Array, and innerHTML the numbers in the right Divs. 
 * 
 * @returns - if todos Array empty.
 */
function updateSummary() {
    if (!todos.length > 1)
        return;
    const { tasksInBoardDiv, tasksInProgressDiv, tasksInFeedbackDiv,
        urgentDiv, urgentDateDiv, tasksTodoDiv, tasksDoneDiv } = getSummaryElements();

    const { tasksInBoard, tasksInProgress, tasksInFeedback,
        tasksUrgent, urgentTaskDate, tasksTodo, tasksDone } = getSummaryInfo();

    tasksInBoardDiv.innerHTML = tasksInBoard.length;
    tasksInProgressDiv.innerHTML = tasksInProgress.length;
    tasksInFeedbackDiv.innerHTML = tasksInFeedback.length;
    urgentDiv.innerHTML = tasksUrgent.length;
    urgentDateDiv.innerHTML = urgentTaskDate;
    tasksTodoDiv.innerHTML = tasksTodo.length;
    tasksDoneDiv.innerHTML = tasksDone.length;

}

/**
 * This function gets all HTML-Elements, needed to render todos lengths in Summary.
 * 
 * @returns Elements
 */
function getSummaryElements() {
    return {
        tasksInBoardDiv: document.getElementById('tasks-in-board'),
        tasksInProgressDiv: document.getElementById('tasks-in-progress'),
        tasksInFeedbackDiv: document.getElementById('tasks-in-feedback'),
        urgentDiv: document.getElementById('tasks-urgent'),
        urgentDateDiv: document.getElementById('tasks-urgent-date'),
        tasksTodoDiv: document.getElementById('tasks-to-do'),
        tasksDoneDiv: document.getElementById('tasks-done')
    }
}

/**
 * This function filters the todos Array, to get all info needed.
 * 
 * @returns Arrays
 */
function getSummaryInfo() {
    let tasksUrgent = todos.filter(t => t.priority == 'urgent');
    return {
        tasksInBoard: todos,
        tasksInProgress: todos.filter(t => t.status == 'progress'),
        tasksInFeedback: todos.filter(t => t.status == 'feedback'),
        tasksUrgent: tasksUrgent,
        urgentTaskDate: getLatestUrgentTask(tasksUrgent),
        tasksTodo: todos.filter(t => t.status == 'todo'),
        tasksDone: todos.filter(t => t.status == 'done')
    }
}

/**
 * This function loops thru the tasksUrgent Array, to find the Tasks wich time runs out next.
 * 
 * @param {array} tasksUrgent 
 * @returns {date} latestUrgentTask
 */
function getLatestUrgentTask(tasksUrgent) {
    if (!tasksUrgent.length > 0)
        return 'No urgent tasks';
    let latestUrgentTask
    let latestDay = 31;
    let latestmonth = 12;
    for (let i = 0; i < tasksUrgent.length; i++) {
        let date = tasksUrgent[i].date;
        let dateLong = new Date(date);
        let day = dateLong.getUTCDate();
        let month = (dateLong.getMonth() + 1);

        if (month < latestmonth || month <= latestmonth && day < latestDay) {
            latestDay = day;
            latestmonth = month
            latestUrgentTask = formatDate(tasksUrgent[i]);
        }
    }
    return latestUrgentTask;
}

/**
 * This function generates Dateformat defined in var='country' and var='options'.
 * 
 * @param {numbers} dateToFormat 
 * @returns {date} formatedDate
 */
function formatDate(dateToFormat) {
    var country = "en-US";
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = dateToFormat.date;
    let dateLong = new Date(date);
    let formatedDate = dateLong.toLocaleDateString(country, options);
    return formatedDate;
}


function greetingUser() {
    let nameDiv = document.getElementById('user-greeting');
    let existingUser = backend.getItem('currentUser');
    if (!existingUser) {
        nameDiv.innerHTML = 'guest';
    } else {
        nameDiv.innerHTML = existingUser;
    }
}


function daytimeGreeting() {
    let date = new Date();
    let currentHour = date.getHours();
    let greetingDiv = document.getElementById('daytime-greeting');

    if (currentHour >= 5 && currentHour < 12) {
        greetingDiv.innerHTML = 'morning';
    }
    if (currentHour >= 12 && currentHour < 18) {
        greetingDiv.innerHTML = 'afternoon';
    }
    if (currentHour >= 18 || currentHour < 5) {
        greetingDiv.innerHTML = 'evening';
    }
}
async function initSummary() {
    await load();
    updateSummary();
    daytimeGreeting();
    greetingUser();
}


function updateSummary() {
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


function getSummaryInfo() {
    let tasksUrgent = todos.filter(t => t.priority == 'urgent');
    return {
        tasksInBoard: todos,
        tasksInProgress: todos.filter(t => t.status == 'progress'),
        tasksInFeedback: todos.filter(t => t.status == 'feedback'),
        tasksUrgent: tasksUrgent,
        urgentTaskDate: formatDate(tasksUrgent),
        tasksTodo: todos.filter(t => t.status == 'todo'),
        tasksDone: todos.filter(t => t.status == 'done')
    }
}


function formatDate(tasksUrgent) {
    var country = "en-US";
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    let date = tasksUrgent[0].date;
    let dateLong = new Date(date);
    let formatedDate = dateLong.toLocaleDateString(country, options);
    return formatedDate;
}

function greetingUser() {
    let nameDiv = document.getElementById('user-greeting');
    let existingUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    if (existingUser.length == 0) {
        nameDiv.innerHTML = 'guest';
    } else {
        nameDiv.innerHTML = existingUser;

    }
}

function daytimeGreeting() {
    let date = new Date();
    let currentHour = date.getHours();
    let greetingDiv = document.getElementById('daytime-greeting');

    if (currentHour > 5 && currentHour < 12) {
        greetingDiv.innerHTML = 'morning';
    }
    if (currentHour > 12 && currentHour < 18) {
        greetingDiv.innerHTML = 'afternoon';
    }
    if (currentHour > 18 && currentHour < 5) {
        greetingDiv.innerHTML = 'evening';
    }
}
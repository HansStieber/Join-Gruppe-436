/**
 * The function initiates the summary.html page.
 */
async function initSummary() {
    await load();
    checkIfAlreadyGreetMobile()
    updateSummary();
    daytimeGreeting();
    checkURLandHighlight('summary');
    greetingUser();

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


/**
 *This function greets the User by his Name, if he is Logged in.
 */
function greetingUser() {
    let nameDiv = document.getElementById('user-greeting');
    let nameDivMobile = document.getElementById('user-greeting-mobile');
    let existingUser = localStorage.getItem('currentUser');
    let existingUser_local = localStorage.getItem("currentUser")

    if (!existingUser) {
        nameDiv.innerHTML = 'guest';
        nameDivMobile.innerHTML = 'guest';
    } else {
        nameDiv.innerHTML = existingUser_local;
        nameDivMobile.innerHTML = existingUser_local;
    }
}


/**
 * This function greets the User, with the right greeting for actual Daytime.
 */
function daytimeGreeting() {
    let date = new Date();
    let currentHour = date.getHours();
    let greetingDiv = document.getElementById('daytime-greeting');
    let greetingDivMobile = document.getElementById('daytime-greeting-mobile');

    if (currentHour >= 5 && currentHour < 12) {
        greetingDiv.innerHTML = 'morning';
        greetingDivMobile.innerHTML = 'morning';
    }
    if (currentHour >= 12 && currentHour < 18) {
        greetingDiv.innerHTML = 'afternoon';
        greetingDivMobile.innerHTML = 'afternoon';
    }
    if (currentHour >= 18 || currentHour < 5) {
        greetingDiv.innerHTML = 'evening';
        greetingDivMobile.innerHTML = 'evening';
    }
}


/**
 * This function initiates the greeting of a user when the site is opened in mobile view. After a timeout the greeting fades out.
 */
function mobileGreetUser() {
    let greetDiv = document.getElementById('greet-div');
    greetDiv.classList.remove('d-none-imp');
    greetDiv.classList.add('fade-out');
    setTimeout(() => { greetDiv.classList.add('d-none-imp') }, 2000);
}


/**
 * The function checks if alreadyGreetMobile variable is set to false. If the varibale is false, the user is greeted.
 */
function checkIfAlreadyGreetMobile() {
    alreadyGreetMobile = localStorage.getItem('alreadyGreetMobile');
    if (!(alreadyGreetMobile == 'true')) {
        mobileGreetUser();
        alreadyGreetMobile = 'true';
        localStorage.setItem('alreadyGreetMobile', alreadyGreetMobile);
    }
}
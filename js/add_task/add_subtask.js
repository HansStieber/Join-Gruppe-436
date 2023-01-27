let subtasks = [];
let subtasksChecked = [];

/*----------- ADD NEW SUBTASK -----------*/
function createNewSubtask() {
    document.getElementById('icon-plus').classList.add('d-none');
    document.getElementById('close-subtask-icon').classList.remove('d-none');
    document.getElementById('border-small').classList.remove('d-none');
    document.getElementById('create-subtask-icon').classList.remove('d-none');
}

function closeNewSubtask() {
    document.getElementById('icon-plus').classList.remove('d-none');
    document.getElementById('close-subtask-icon').classList.add('d-none');
    document.getElementById('border-small').classList.add('d-none');
    document.getElementById('create-subtask-icon').classList.add('d-none');
}

function addNewSubtask() {
    let title = document.getElementById('subtask').value;
    let checked = false
    let newSubtask = new Subtask(title, checked);
    subtasks.push(newSubtask);

    document.getElementById('subtask').value = '';
    
    document.getElementById('subtasks').innerHTML = '';
    closeNewSubtask();
    loadSubtasks();

    console.log(subtasks);
}

function loadSubtasks() {
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        renderSubtasks(subtask, i);
    }
}

function selectSubtask(i) {
    subtasks[i].checked = true;
    document.getElementById('checkbox-subtask' + i).classList.remove('d-none');
    document.getElementById('checkbox-subtask-unchecked' + i).setAttribute('onclick', `removeSelection('${i}')`);
}

function removeSelection(i) {
    subtasks[i].checked = false;
    document.getElementById('checkbox-subtask' + i).classList.add('d-none');
    document.getElementById('checkbox-subtask-unchecked' + i).setAttribute('onclick', `selectSubtask('${i}')`);
}
let urgent = false;
let medium = false;
let low = false;

/*----------- SET PRIORITY -----------*/
function taskIsUrgent(id, path, id2, id3) {
    urgent = true;
    medium = false;
    low = false;
    setImgSelected(id, path, id2, id3);
}

function setImgSelected(id, path, id2, id3) {
    document.getElementById('prio-' + id).src = `assets/img/${path}_selected.svg`;
    focusPrio(id, id2, id3);
    unfocusPriority(id2, id, id3);
    unfocusPriority(id3, id, id2);
}

function focusPrio(id, id2, id3) {
    document.getElementById('prio-' + id).setAttribute('onmouseover', '');
    document.getElementById('prio-' + id).setAttribute('onmouseout', '');
    document.getElementById('prio-' + id).setAttribute('onclick', `unfocusPriority('${id}', '${id2}', '${id3}')`);
}

function unfocusPrio(id, id2, id3) {
    document.getElementById('prio-' + id).setAttribute('onmouseover', `hover('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).setAttribute('onmouseout', `leave('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).src = `assets/img/${id}_big.svg`;
}

function unfocusPriority(id, id2, id3) {
    if (id == 'urgent') {
        urgent = false;
    }
    if (id == 'medium') {
        medium = false;
    }
    if (id == 'low') {
        low = false; 
    }
    let firstLeter = id.charAt(0);
    let fLUppercase = firstLeter.toUpperCase();
    let newId = fLUppercase + id.substring(1);
    document.getElementById('prio-' + id).src = `assets/img/${id}_big.svg`;
    document.getElementById('prio-' + id).setAttribute('onclick', `taskIs${newId}('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).setAttribute('onmouseover', `hover('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById('prio-' + id).setAttribute('onmouseout', `leave('${id}', '${id}_big', '${id2}', '${id3}')`);
}

function taskIsMedium(id, path, id2, id3) {
    urgent = false;
    medium = true;
    low = false;
    setImgSelected(id, path, id2, id3);
}

function taskIsLow(id, path, id2, id3) {
    urgent = false;
    medium = false;
    low = true;
    setImgSelected(id, path, id2, id3);
}
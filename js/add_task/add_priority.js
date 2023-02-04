let urgent = false;
let medium = false;
let low = false;

/*----------- SET PRIORITY -----------*/
function taskIsUrgent(id, path, id2, id3, edit) {
    urgent = true;
    medium = false;
    low = false;
    setImgSelected(id, path, id2, id3, edit);
}

function setImgSelected(id, path, id2, id3, edit) {
    document.getElementById(edit + 'prio-' + id).src = `assets/img/${path}_selected.svg`;
    focusPrio(id, id2, id3, edit);
    unfocusPriority(id2, id, id3, edit);
    unfocusPriority(id3, id, id2, edit);
}

function focusPrio(id, id2, id3, edit) {
    document.getElementById(edit + 'prio-' + id).setAttribute('onmouseover', '');
    document.getElementById(edit + 'prio-' + id).setAttribute('onmouseout', '');
    document.getElementById(edit + 'prio-' + id).setAttribute('onclick', `unfocusPriority('${id}', '${id2}', '${id3}')`);
}

function unfocusPrio(id, id2, id3, edit) {
    document.getElementById(edit + 'prio-' + id).setAttribute('onmouseover', `hover('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById(edit + 'prio-' + id).setAttribute('onmouseout', `leave('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById(edit + 'prio-' + id).src = `assets/img/${id}_big.svg`;
}

function unfocusPriority(id, id2, id3, edit) {
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
    document.getElementById(edit + 'prio-' + id).src = `assets/img/${id}_big.svg`;
    document.getElementById(edit + 'prio-' + id).setAttribute('onclick', `taskIs${newId}('${id}', '${id}_big', '${id2}', '${id3}', '${edit}')`);
    document.getElementById(edit + 'prio-' + id).setAttribute('onmouseover', `hover('${id}', '${id}_big', '${id2}', '${id3}')`);
    document.getElementById(edit + 'prio-' + id).setAttribute('onmouseout', `leave('${id}', '${id}_big', '${id2}', '${id3}')`);
}

function taskIsMedium(id, path, id2, id3, edit) {
    urgent = false;
    medium = true;
    low = false;
    setImgSelected(id, path, id2, id3, edit);
}

function taskIsLow(id, path, id2, id3, edit) {
    urgent = false;
    medium = false;
    low = true;
    setImgSelected(id, path, id2, id3, edit);
}
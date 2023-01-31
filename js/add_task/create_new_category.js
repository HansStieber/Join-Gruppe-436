let colors = ['orange', 'violet', 'cyan', 'gold', 'blue', 'light-blue', 'green', 'red'];
let currentColor;
let categorySelected = false;

/*----------- CREATE NEW CATEGORY FOR SELECTION -----------*/
function createNewCategory() {
    showInputField('category');
    showColorSelection();
    hideDefaultInput('category');
    closeDropdownCategory();
}

function showInputField(id) {
    document.getElementById('new-' + id).classList.remove('d-none');
    document.getElementById('new-' + id + '-container').classList.remove('d-none');
}

function showColorSelection() {
    document.getElementById('color-selection-container').classList.remove('d-none');
}

function hideDefaultInput(id) {
    document.getElementById(id + '-options-container').classList.add('d-none');
}

function closeNewCategory() {
    hideInputField('category');
    hideColorSelection();
    showDefaultInput('category');
}

function hideInputField(id) {
    document.getElementById('new-' + id).value = '';
    document.getElementById('new-' + id).classList.add('d-none');
    document.getElementById('new-' + id + '-container').classList.add('d-none');
}

function hideColorSelection() {
    document.getElementById('color-selection-container').classList.add('d-none');
}

function showDefaultInput(id) {
    document.getElementById('options-' + id).classList.remove('scale-down-ver-top');
    document.getElementById(id + '-options-container').classList.remove('d-none');
}

/*----------- ADD NEW CATEGORY -----------*/
function addNewCategory() {
    let title = document.getElementById('new-category').value;

    if (!title == '' && !currentColor == '') {
        categorySelected = true;
        let newCategory = new Category(title, currentColor);
        categories.push(newCategory);

        document.getElementById('new-category').value = '';

        showCategories();
        hideInputField('category');
        hideColorSelection();
        renderSelectedCategory(title, currentColor);
    }
    console.log(categories);


}

function showCategories() {
    document.getElementById('category-options-container').classList.remove('d-none');
}


/*----------- SETTING CURRENTCOLOR -----------*/
/**
 * Sets the parameter currentColor to the 
 * 
 * @param {string} color - 
 * @param {number} i 
 */
function setCurrentColor(color, i) {
    currentColor = color;

    highlightCurrentColor(i);
}



function highlightCurrentColor(i) {
    for (let i = 0; i < colors.length; i++) {
        document.getElementById('color' + i).classList.remove('highlight');
    }
    document.getElementById('color' + i).classList.add('highlight');
}


/*----------- ADD NEW CATEGORY -----------*/
function selectCategory(title, color) {
    categorySelected = true;
    currentColor = color;
    renderSelectedCategory(title, color);
    closeDropdownCategory();
}
let colors = ['orange', 'violet', 'cyan', 'gold', 'blue', 'light-blue', 'green', 'red'];
let currentColor;
let temporaryCategories = [];
let categorySelected = false;

/*----------- CREATE NEW CATEGORY FOR SELECTION -----------*/
/**
 * This function lets the user create a new category by showing the category name input-field and color selection. It also closes the
 * dropdown menu and hides the default value of the input-field.
 */
function createNewCategory() {
    showInputField('category');
    showColorSelection();
    hideDefaultInput('category');
    closeDropdownCategory();
}

/**
 * The function shows the inputfield of the selection dropdown menu with the parameters id.
 * 
 * @param {string} id - defines the missing part of the id of the inputfield that is to be shown
 */
function showInputField(id) {
    document.getElementById('new-' + id).classList.remove('d-none');
    document.getElementById('new-' + id + '-container').classList.remove('d-none');
}


/**
 * The function shows the color selction container.
 */
function showColorSelection() {
    document.getElementById('color-selection-container').classList.remove('d-none');
}


/**
 * The function hides the inputfield of the selection dropdown menu with the parameters id.
 * 
 * @param {string} id - defines the missing part of the id of the inputfield that is to be hidden
 */
function hideDefaultInput(id) {
    document.getElementById(id + '-options-container').classList.add('d-none');
}


/**
 * The function closes the input-field for creating a new category. This is achieved by hiding the input-field and color selection and showing
 * the default input-field again.
 */
function closeNewCategory() {
    hideInputField('category');
    hideColorSelection();
    showDefaultInput('category');
}


/**
 * The function hides the input-field of the selection dropdown menu with the id of the parameter. Also the value of the input-field gets
 * cleared.
 * 
 * @param {string} id - defines the missing part of the id of the input-field that is to be hidden
 */
function hideInputField(id) {
    document.getElementById('new-' + id).value = '';
    document.getElementById('new-' + id).classList.add('d-none');
    document.getElementById('new-' + id + '-container').classList.add('d-none');
}


/**
 * The function hides the color selection for new categories.
 */
function hideColorSelection() {
    document.getElementById('color-selection-container').classList.add('d-none');
}


/**
 * The function shows the default input field of the selection dropdown menu.
 * 
 * @param {string} id - defines the missing part of the id of the default input-field that is to be shown
 */
function showDefaultInput(id) {
    document.getElementById('options-' + id).classList.remove('scale-down-ver-top');
    document.getElementById(id + '-options-container').classList.remove('d-none');
}

/*----------- ADD NEW CATEGORY TO EXISTING CATEGORIES -----------*/
/**
 * The function gets the title of the new category from the new-category input-field. It then checks if a category with the same name or color
 * already exists.
 */
function addNewCategory() {
    let title = document.getElementById('new-category').value;
    if (ifChosenTitleAndColorAreFree(title)) {
        createCategory(title);
        removeAlerts();
    } else {
        removeAlerts();
        hideInputField('category');
        hideColorSelection();
        showNewCategoyAlert();
    }
}


/**
 * The function checks if the category is still available by checking if the title or color matches with already existing categories.
 * 
 * @param {string} title - title of the category that should be created
 * @returns - the function returns if the title input-field is filled and a color is selected. It also returns if the title or color are
 * already in use
 */
function ifChosenTitleAndColorAreFree(title) {
    return !title == '' && !currentColor == '' && categories.every(t => t.title !== title) && categories.every(c => c.color !== currentColor);
}


/**
 * The function creates a new category, initiates pushing the category and hides the input-field and color selection for creating a new category
 * It also renders the new category as the selected category. Finally the categories are saved to the backend.
 * 
 * @param {string} title - title of the category that should be created
 */
function createCategory(title) {
    addCategory(title);
    removeAlerts();
    hideInputField('category');
    hideColorSelection();
    renderSelectedCategory(title, currentColor);
    saveCategories();
}


/**
 * The function sets the categorySelected variable to true. It also defines a new category with use of the Category class. The new category
 * is then pushed into the categories array. After the push, the value of the input-field is cleared. Also any possible alerts get cleared.
 * 
 * @param {string} title - title of the category that should be created
 */
function addCategory(title) {
    categorySelected = true;
    let newCategory = new Category(title, currentColor);
    categories.push(newCategory);
    document.getElementById('new-category').value = '';
    document.getElementById('category-required').innerHTML = 'Please enter a category name first';
}


/**
 * The function shows an alert if the new category is not created correctly.
 */
function showNewCategoyAlert() {
    document.getElementById('category-required').innerHTML = 'Choose a color and title that is not already in use';
    document.getElementById('category-required').classList.add('alert-color');
}


/**
 * The function removes all alerts from the category selection dropdown menu.
 */
function removeAlerts() {
    document.getElementById('category-options-container').classList.remove('d-none');
    document.getElementById('category-required').classList.remove('alert-color');
    document.getElementById('category-required').innerHTML = 'Please enter a category name first';
}


/*----------- SETTING CURRENTCOLOR -----------*/
/**
 * The function sets the parameter currentColor to the value of the color parameter. It also runs the highlightCurrentColor() function.
 * 
 * @param {string} color - the color that is set as currentColor
 * @param {number} i - index of the color at the colors array
 */
function setCurrentColor(color, i) {
    currentColor = color;
    highlightCurrentColor(i);
}

function deleteCategory(i) {
    document.getElementById('c-delete-option' + i).innerHTML = `
    <span class="delete-category-text" onclick=confirmDeletion(${i})>Yes</span><span class="margin-to-sides"> </span><span class="delete-category-text" onclick=doNotDelete(${i})>No</span>
    `;
}

function confirmDeletion(i) {
    categories.splice(i, 1);
    loadAllOptions();
    showCategoryOptions();
    saveCategories();
    closeDropdownCategory();
    openDropdownCategory();
}

function doNotDelete(i) {
    document.getElementById('c-delete-option' + i).innerHTML = `
    <span class="delete-category-text" onclick=deleteCategory(${i})>delete</span>
    `;
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
    removeAlerts();
}
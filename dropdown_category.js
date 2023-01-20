let categoryOptions = [
    {
        'id': '0',
        'name': 'New Category'
    },
    {
        'id': '1',
        'name': 'General Topic'
    },
];

function render() {
    loadCategoryOptions();
}

function loadCategoryOptions() {
    for (let i = 0; i < categoryOptions.length; i++) {
        const option = categoryOptions[i];
        renderCategoryOptions(option);
    }
}

function openDropdownCategory() {
    for (let i = 0; i < categoryOptions.length; i++) {
        const option = categoryOptions[i];
        document.getElementById(option['id']).classList.remove('d-none');
    }
    let selectContainer = document.getElementById('select-container');
    selectContainer.setAttribute('onclick','closeDropdownCategory()');
}

function closeDropdownCategory() {
    for (let i = 0; i < categoryOptions.length; i++) {
        const option = categoryOptions[i];
        document.getElementById(option['id']).classList.add('d-none');
    }
    let selectContainer = document.getElementById('select-container');
    selectContainer.setAttribute('onclick','openDropdownCategory()');
}

function renderCategoryOptions(option) {
    let optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML += `
    <div id="${option['id']}" class="option d-none">
        <span>${option['name']}</span>
    </div>
`;
}
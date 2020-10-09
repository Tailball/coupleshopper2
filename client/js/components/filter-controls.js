const _root = document.querySelector('#filters');
const _openFormButton = document.querySelector('#open-filters-button');
const _closeButton = document.querySelector('#filters-close');


let onSortChangeCallback;


export function setupSortControls(onSortChanged) {
    onSortChangeCallback = onSortChanged;

    const sort = document.querySelector('#filters .filters--sorting');
    
    sort.addEventListener('change', onSortChange);
    _openFormButton.addEventListener('click', onOpenForm);
    _closeButton.addEventListener('click', onCloseForm);
}

function onSortChange(e) {
    onCloseForm();
    onSortChangeCallback(e.target.value);
}

function onOpenForm(e) {
    _root.classList.add('show');
    _openFormButton.classList.add('gone');
}

function onCloseForm(e) {
    _openFormButton.classList.remove('gone');
    _root.classList.remove('show');
}
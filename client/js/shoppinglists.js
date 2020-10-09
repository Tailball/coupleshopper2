import { getToken, onHasNotLoggedIn } from './authentication/auth';
import { setToken, getShoppingLists, addShoppingList, deleteShoppingList, editShoppingList } from './data/repository';
import { setup as setupNodes, rebuildNodes } from './nodes/shoppinglistsNode';
import { setupItemControls, editItem } from './components/shoppinglists-item-controls';
import { setupSortControls } from './components/filter-controls';


let token;
let fullDataset;
let filteredDataset;
let filters = {
    sortBy: 'date'
};


window.addEventListener('load', onLoaded);

function onLoaded() {
    token = getToken();
    if(!token) onHasNotLoggedIn();
    else loadPage();
}


function loadPage() {
    setToken(token);
    setupNodes(onOpen, onDelete, onEdit);
    setupSortControls(onSortChanged);
    setupItemControls(onAdd);
    loadShoppinglists();
}


function loadShoppinglists() {
    getShoppingLists()
        .then(data => {
            fullDataset = data;
            filterAndRebuild();
        })
        .catch(err => {
            console.log(err);
        });
}

function filterAndRebuild() {
    switch(filters.sortBy) {
        case 'date':
            filteredDataset = fullDataset.sort((a, b) => {
                if(a.dateCreated < b.dateCreated) return -1;
                else if(a.dateCreated > b.dateCreated) return 1;
                else return 0;
            });
            break;

        case 'alphanumeric':
            filteredDataset = fullDataset.sort((a, b) => {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                else if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                else return 0;
            });
            break;
    } 

    rebuildNodes(filteredDataset);
}

function onAdd(item) {
    if(!item._id) {
        addShoppingList(item.name, item.description)
            .then(loadShoppinglists)
            .catch(err => console.log(err));
    }
    else {
        editShoppingList(item._id, item.name, item.description)
            .then(loadShoppinglists)
            .catch(err => console.log(err));
    }
}

function onDelete(e, id) {
    e.stopPropagation();
    
    deleteShoppingList(id)
        .then(loadShoppinglists)
        .catch(err => { console.log(err); })
}

function onEdit(e, id) {
    e.stopPropagation();
    
    const item = fullDataset.find(entry => entry._id === id);
    editItem(item);
}

function onOpen(id) {
    location.assign(`shoppinglist.html?id=${id}`);
}

function onSortChanged(sort) {
    filters = {
        ...filters,
        sortBy: sort
    };

    filterAndRebuild();
}
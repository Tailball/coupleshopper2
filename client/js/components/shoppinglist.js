import { getToken, onHasNotLoggedIn } from '../authentication/auth';
import { editShoppingList, getShoppingList, setToken } from '../data/repository';
import { setupSortControls } from './filter-controls';
import { setup as setupNodes, rebuildNodes } from './shoppinglistNode';
import { setupItemControls, editItem } from './shoppinglist-item-controls';


let token;
let shoppingList;
let searchId;
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
    setupNodes(onDelete, onEdit);
    setupSortControls(onSortChanged);
    setupItemControls(onAdd);
    loadShoppingList();
}

function loadShoppingList() {
    try {
        searchId = window.location.search.substr(1)
                                         .split('=')[1];
        
        getShoppingList(searchId)
            .then(data => {
                shoppingList = data;
                fullDataset = shoppingList.shoppingItems;
                filterAndRebuild();
            })
            .catch(err => {
                console.log(err);
            });
    }
    catch(err) {
        window.location.replace('shoppinglists.html');
    }
}

function filterAndRebuild(){
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

        case 'theme':
            filteredDataset = fullDataset.sort((a, b) => {
                if(a.theme.toLowerCase() < b.theme.toLowerCase()) return -1;
                else if(a.theme.toLowerCase() > b.theme.toLowerCase()) return 1;

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
        shoppingList.shoppingItems.push(item);
    }
    else {
        const shoppingItem = shoppingList.shoppingItems.find(entry => entry._id === item._id);
        shoppingItem.name = item.name;
        shoppingItem.description = item.description;
        shoppingItem.theme = item.theme;
        shoppingItem.quantity = item.quantity;   
        shoppingItem.theme = item.theme;
        shoppingItem.image = item.image;
    }

    editShoppingList(shoppingList._id, shoppingList.name, shoppingList.description, shoppingList.shoppingItems)
            .then(loadShoppingList)
            .catch(err => console.log(err));
}

function onDelete(id) {
    shoppingList.shoppingItems = shoppingList.shoppingItems.filter(entry => entry._id !== id);

    editShoppingList(shoppingList._id, shoppingList.name, shoppingList.description, shoppingList.shoppingItems)
        .then(loadShoppingList)
        .catch(err => console.log(err));
}

function onEdit(id) {
    const item = fullDataset.find(entry => entry._id === id);
    editItem(item);
}

function onSortChanged(sort) {
    filters = {
        ...filters,
        sortBy: sort
    };

    filterAndRebuild();
}
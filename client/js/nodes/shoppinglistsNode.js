import { formatFullDigits } from '../util/datehelper';


let onItemOpenCallback;
let onItemDeleteCallback;
let onItemEditCallback;

const root = document.querySelector('#data');


export const setup = (onOpenCallback, onDeleteCallback, onEditCallback) => {
    onItemOpenCallback = onOpenCallback;
    onItemDeleteCallback = onDeleteCallback;
    onItemEditCallback = onEditCallback;
}

export const rebuildNodes = dataset => {
    clearNodes();
    dataset.forEach(entry => createNode(entry));
}

const createNode = ({ _id, name, description, dateCreated }) => {
    //Main div (.node)
    const container = document.createElement('div');
    container.classList.add('node');
    container.setAttribute('data-id', _id);
    container.addEventListener('click', () => onItemOpenCallback(_id));
    
    //Header div (.node--header)
    const headerNode = document.createElement('div');
    headerNode.classList = 'node--header';
    container.appendChild(headerNode);

    //Title in header (.node--header-title)
    const titleNode = document.createElement('p');
    titleNode.innerHTML = '<i class="fas fa-clipboard-list"></i> ' + name;
    titleNode.classList.add('node--header-title');
    headerNode.appendChild(titleNode);

    //Date in header (.node--header-date)
    const d = new Date(dateCreated);
    const date = `${d.getFullYear()}-${formatFullDigits(d.getMonth() + 1)}-${formatFullDigits(d.getDate())} ${formatFullDigits(d.getHours())}:${formatFullDigits(d.getMinutes())}`;

    const dateNode = document.createElement('p');
    dateNode.innerHTML = date;
    dateNode.classList.add('node--header-date');
    headerNode.appendChild(dateNode);

    //Sub div (.node--sub)
    const subNode = document.createElement('div');
    subNode.classList.add('node--sub');
    container.appendChild(subNode);

    //Description in sub (.node--sub-description)
    const descriptionNode = document.createElement('p');
    descriptionNode.innerHTML = description;
    descriptionNode.classList.add('node--sub-description');
    subNode.appendChild(descriptionNode);

    //Controls in sub (.node--sub-controls)
    const controls = document.createElement('div');
    controls.classList.add('node--sub-controls');
    subNode.appendChild(controls);

    //Edit control in sub (.node--controls-edit)
    const controlEdit = document.createElement('button');
    controlEdit.innerHTML = '<i class="fas fa-wrench"></i>';
    controlEdit.classList.add('node--controls-edit');
    controlEdit.addEventListener('click', (e) => onItemEditCallback(e, _id));
    controls.appendChild(controlEdit);

    //Delete control in sub (.node--controls-delete)
    const controlDelete = document.createElement('button');
    controlDelete.innerHTML = '<i class="fas fa-trash"></i>';
    controlDelete.classList.add('node--controls-delete');
    controlDelete.addEventListener('click', (e) => onItemDeleteCallback(e, _id));
    controls.appendChild(controlDelete);

    root.appendChild(container);
};

export const clearNodes = () => {
    root.innerHTML = '';
}

// const filterData = (data, filter) => {
//     if(!filter) return [...data];
//     if(!filter.sortBy) return [...data];

//     switch(filter.sortBy) {
//         case 'date':
//             const filterByDate = data.sort((a, b) => {
//                 return a.dateCreated - b.dateCreated
//             });
//             return [...filterByDate];
        
//         case 'alphanumeric':
//             const filterByAlphabet = data.sort((a, b) => {
//                 const nA = a.name.toUpperCase();
//                 const nB = b.name.toUpperCase();
                
//                 if(nA < nB) return -1;
//                 else if(nA > nB) return 1;
//                 else return 0;
//             });
//             return [...filterByAlphabet];

//         case 'quantity':
//             const filterByQty = data.sort((a, b) => {
//                 return b.quantity - a.quantity;
//             });
//             return [...filterByQty];
//     }
// }
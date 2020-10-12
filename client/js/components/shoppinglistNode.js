import { formatFullDigits } from '../util/datehelper';


let onItemDeleteCallback;
let onItemEditCallback;

const root = document.querySelector('#data');


export const setup = (onDeleteCallback, onEditCallback) => {
    onItemDeleteCallback = onDeleteCallback;
    onItemEditCallback = onEditCallback;
}

const createNode = ({ _id, name, description, quantity, dateCreated, theme, image }) => {
    //Main div (.node)
    const container = document.createElement('div');
    container.classList.add('node');
    container.setAttribute('data-id', _id);
    
    //Header div (.node--header)
    const headerNode = document.createElement('div');
    headerNode.classList = 'node--header';
    container.appendChild(headerNode);

    //Title in header (.node--header-title)
    const titleNode = document.createElement('p');
    titleNode.innerHTML = '<i class="fas fa-shopping-cart"></i> ' + name
    titleNode.classList.add('node--header-title');
    headerNode.appendChild(titleNode);

    //Date in header (.node--header-date)
    const d = new Date(dateCreated);
    const date = `${d.getFullYear()}-${formatFullDigits(d.getMonth() + 1)}-${formatFullDigits(d.getDate())} ${formatFullDigits(d.getHours())}:${formatFullDigits(d.getMinutes())}`;

    const dateNode = document.createElement('p');
    dateNode.innerHTML = `${theme}  |  ${date}`;
    dateNode.classList.add('node--header-date');
    headerNode.appendChild(dateNode);

    //Sub div (.node--sub)
    const subNode = document.createElement('div');
    subNode.classList.add('node--sub');
    container.appendChild(subNode);

    //Quantity in sub (.node--sub-quantity)
    const quantityNode = document.createElement('p');
    quantityNode.innerHTML = quantity;
    quantityNode.classList.add('node--sub-quantity');
    subNode.appendChild(quantityNode);
    
    //Description in sub (.node--sub-description)
    const descriptionNode = document.createElement('p');
    descriptionNode.innerHTML = description;
    descriptionNode.classList.add('node--sub-description');
    subNode.appendChild(descriptionNode);

    if(image) {
        const imgNode = document.createElement('img');
        console.log(image);
        
        imgNode.src = image;
        
        imgNode.classList.add('node--sub-image');
        subNode.appendChild(imgNode);
    }

    //Controls in sub (.node--sub-controls)
    const controls = document.createElement('div');
    controls.classList.add('node--sub-controls');
    subNode.appendChild(controls);

    //Edit control in sub (.node--controls-edit)
    const controlEdit = document.createElement('button');
    controlEdit.innerHTML = '<i class="fas fa-wrench"></i>';
    controlEdit.classList.add('node--controls-edit');
    controlEdit.addEventListener('click', () => onItemEditCallback(_id));
    controls.appendChild(controlEdit);

    //Delete control in sub (.node--controls-delete)
    const controlDelete = document.createElement('button');
    controlDelete.innerHTML = '<i class="fas fa-trash"></i>';
    controlDelete.classList.add('node--controls-delete');
    controlDelete.addEventListener('click', () => onItemDeleteCallback(_id));
    controls.appendChild(controlDelete);

    root.appendChild(container);
};

export const clearNodes = () => {
    root.innerHTML = '';
}

export const rebuildNodes = dataset => {
    clearNodes();
    dataset.forEach(entry => createNode(entry));
}
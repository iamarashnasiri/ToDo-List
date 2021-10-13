const myForm = document.getElementById('create-form')
const createInput = document.getElementById('create-form-input')
const createTextArea = document.getElementById('create-form-textarea')
const removeAllBtn = document.querySelector('.clear')
const ul = document.querySelector('.task-list')
const serach = document.getElementById('search')
// main function
onLoadPage()
function onLoadPage() {
    document.addEventListener('DOMContentLoaded', loadCard)

    myForm.addEventListener('submit', getInput)

    document.addEventListener('click', removeCard)

    removeAllBtn.addEventListener('click', clearTasks)

    serach.addEventListener('keyup', showItems)
}
// get inpute
function getInput(e) {
    if (createInput.value != "" && createTextArea.value != "") {
        const textValue = createTextArea.value;
        const inputValue = createInput.value;
        console.log('title :' + inputValue + ', detail :' + textValue);
        createCard(inputValue, textValue)
        saveToStorage(inputValue, textValue)
    } else {
        alert('Fill the input please')
    }
    createInput.value = "";
    createTextArea.value = "";
    e.preventDefault();
}
// create cart
function createCard(newInput, newText) {
    const li = document.createElement('li')
    li.className = 'task-item';
    li.innerHTML = `
        <h6>Title :</h6>
        <p class="title">${newInput}</p>
        <h6>Detail :</h6>
        <p class="detail">${newText}</p>
        &nbsp
        <div>
            <button class="remove">remove</button>
            <button class="edit">edit</button>
        </div>
    `;
    ul.appendChild(li)
}
//delete item
function removeCard(e) {
    if (e.target.className === 'remove') {
        if (confirm('Are You Sure ?')) {
            e.target.parentElement.parentElement.remove()
            removeFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}
// clear all tasks
function clearTasks() {

    if (confirm('Are You Sure ?!')) {
        ul.innerHTML = '';
        localStorage.clear();
    }
}
// showItems 
function showItems(e) {
    const text = e.target.value.toLowerCase()
    const cards = document.querySelectorAll('.task-item')
    cards.forEach(card => {
        const item = card.children[1].innerHTML;
        if (item.toLowerCase().indexOf(text) != -1) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    })
}
// save task to local storage
function saveToStorage(title, detail) {
    let titles;
    let details;
    if (localStorage.getItem('titles') === null &&
        localStorage.getItem('details') === null
    ) {
        titles = [];
        details = [];
    } else {
        titles = JSON.parse(localStorage.getItem('titles'))
        details = JSON.parse(localStorage.getItem('details'))
    }
    titles.push(title)
    details.push(detail)
    localStorage.setItem('titles', JSON.stringify(titles))
    localStorage.setItem('details', JSON.stringify(details))
}
// remove task from Local Storage
function removeFromLocalStorage(item) {
    let titles;
    let details;
    if (localStorage.getItem('titles') === null &&
        localStorage.getItem('details') === null
    ) {
        titles = [];
        details = [];
    } else {
        titles = JSON.parse(localStorage.getItem('titles'))
        details = JSON.parse(localStorage.getItem('details'))
    }
    let titleItem = item.children[1].textContent;
    titles.forEach((title, index) => {
        if (titleItem === title) {
            titles.splice(index, 1)
            details.splice(index, 1)
        }
    });
    localStorage.setItem('titles', JSON.stringify(titles))
    localStorage.setItem('details', JSON.stringify(details))
}
// load cards
function loadCard() {
    let titles;
    let details;
    if (localStorage.getItem('titles') === null &&
        localStorage.getItem('details') === null
    ) {
        titles = [];
        details = [];
    } else {
        titles = JSON.parse(localStorage.getItem('titles'))
        details = JSON.parse(localStorage.getItem('details'))
    }
    titles.forEach((title, index) => {
        createCard(title, details[index])
    });
}
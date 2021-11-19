const inputText = document.getElementById('inputText');
const createTask = document.getElementById('add');
const deleteTask = document.querySelectorAll('.delete');
const blockTemplate = document.querySelector('#template');

const storageElements = [];

createTask.addEventListener('click', createBlockTask);
deleteTask.forEach((item) => item.addEventListener('click', removeBlock));

//START RENDERING from LOCALSTORAGE
window.onload = function renderingLS() {
  let keys = Object.keys(localStorage);
  keys = keys.reverse();
  for (let key of keys) {
    if (key !== 'userPosition') {
      let obgLS = JSON.parse(localStorage.getItem(key));
      buildBlock(obgLS.id, obgLS.title, obgLS.check);
    }
  }
};
function buildBlock(id, title, check) {
  const buildBlock = template.cloneNode(true);
  buildBlock.setAttribute('id', id);
  buildBlock.querySelector('.title').textContent = title;
  buildBlock.querySelector('.check');
  buildBlock.querySelector('.delete').addEventListener('click', removeBlock);
  buildBlock.querySelector('.check').addEventListener('click', chengeCheck);
  if (check === true) {
    buildBlock.querySelector('.check').classList.add('checkFin');
    buildBlock.querySelector('.title').classList.add('crossed');
  }

  console.log(buildBlock);
  blockTemplate.after(buildBlock);
}

//Create & ADD new block (clone).
function createBlockTask() {
  event.preventDefault();
  if (inputText.value === '') {
    return;
  }
  const newBlock = template.cloneNode(true);
  newBlock.removeAttribute('id');
  newBlock.setAttribute('id', IDforEl());
  newBlock.querySelector('.title').textContent = inputText.value;
  newBlock.querySelector('.delete').addEventListener('click', removeBlock);
  newBlock.querySelector('.check').addEventListener('click', chengeCheck);
  blockTemplate.after(newBlock);
  /*--------------------------*/
  function createObj() {
    let newObj = {
      id: newBlock.getAttribute('id'),
      title: inputText.value,
      check: false,
    };
    storageElements.push(newObj);
    let valueForLS = JSON.stringify(newObj);
    //Push change object in LocalStorage
    localStorage.setItem(IDforLS(), valueForLS);

    console.log(valueForLS);
    console.log(storageElements);
  }
  createObj();
  inputText.value = '';
}

function removeBlock() {
  let deletElement = this.parentNode.id;
  let deletElementIndex;
  storageElements.forEach((item) => {
    if (item.id === this.parentNode.id) {
      deletElementIndex = storageElements.indexOf(item);
    }
  });
  storageElements.splice(deletElementIndex, 1);
  console.log(storageElements);
  this.parentNode.parentNode.removeChild(this.parentNode);

  console.log(deletElement);
  localStorage.removeItem(deletElement);
}

function chengeCheck() {
  this.classList.add('checkFin');
  let divCheck = this.parentNode;
  let el_h3 = divCheck.querySelector('.title');
  el_h3.classList.add('crossed');
  /***************************************************/
  storageElements.forEach((item) => {
    if (item.id === this.parentNode.id) {
      item.check = true;
      //change "check" in LocalStorage
      let getLS = JSON.parse(localStorage.getItem(item.id));
      getLS.check = true;
      //Push change object in LocalStorage back;
      let valueForLS = JSON.stringify(getLS);
      localStorage.setItem(item.id, valueForLS);
      console.log(storageElements);
    }
  });
}

///Сreation of individual ID
function getId() {
  let idItem = 1;
  return function getID() {
    return idItem++;
  };
}

let IDforEl = getId();
let IDforLS = getId();

/*
function randomID() {
  return () => parseInt(Date.now() * Math.random());
}

	let nodeArr = document.querySelectorAll('.task');
	newNodeArr = Array.from(nodeArr).reverse();
	console.log(newNodeArr);
	console.log(newNodeArr[parentId]);
	let divCheck = newNodeArr[parentId-1];
	let el_h3 = divCheck.querySelector('.title');
	console.log(el_h3);
	el_h3.classList.add("crossed");
*/

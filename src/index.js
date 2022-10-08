import _, { add, times } from 'lodash';
import { clearAll } from './script.js';
import taskCompleted from './script.js';
import './style.css';



const formContainer = document.getElementById('form')
const inputElement = document.getElementById('input-element');
const myContainer = document.getElementById('items-container');
const clearSelectedList = document.getElementById('footer-a')



const loadTasks = () => {
	if (localStorage.getItem("listItems") == null){
		return;
	}
	const toDoList = Array.from(JSON.parse(localStorage.getItem("listItems")));

	toDoList.forEach((item) => {
		const list = document.createElement("li");
		list.classList.add('to-do-list-elements')
		list.innerHTML = `
			<input type="checkbox" onclick="taskCompleted(this)" class="check">
			<input type="text" value="${item.description}" class="task ${item.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTaskItem(this)">
			<i class="fa fa-trash" onclick='removeItem(this)'></i>
		`;
		myContainer.insertBefore(list, myContainer.children[0]);
	});
}


const addToDoItem = () => {
	let elemList = []
	if(inputElement.value === ''){
		return false;
	}
	if (document.querySelector(`input[value="${inputElement.value}"]`)){
		return false;
	}
	elemList.push(inputElement.value)
	localStorage.setItem("listItems", JSON.stringify([...JSON.parse(localStorage.getItem("listItems") || "[]"), { description: inputElement.value, completed: false, index: elemList.length}]));

	const list = document.createElement("li");
	list.classList.add('to-do-list-elements')
	list.innerHTML = `

		<input type="checkbox" onclick="taskCompleted(this)" class="check">
		<input type="text" value="${inputElement.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTaskItem(this)">
		<i class="fa fa-trash" onclick='removeItem(this)'></i>

	`;
	myContainer.insertBefore(list, myContainer.children[0]);
	// clear input
	inputElement.value = "";
}



window.removeItem = function(event){
	const taskItems = Array.from(JSON.parse(localStorage.getItem("listItems")));
	taskItems.forEach((item, index) => {
		if(item.description === event.parentNode.children[1].value){
			taskItems.splice(index, 1)
		}
	});
	localStorage.setItem("listItems", JSON.stringify(taskItems));
	event.parentElement.remove();
	
}


let currentTask = null;

window.getCurrentTask = function(event){
	currentTask = event.value;
}

window.editTaskItem = function(event) {
	const taskItem = Array.from(JSON.parse(localStorage.getItem('listItems')));
	if (event.value === ''){
		event.value == currentTask;
		return;
	}

	taskItem.forEach((item) => {
		if (item.description === event.value){
			event.value = currentTask;
			return;
		}
	});

	taskItem.forEach((item) => {
		if (item.description === currentTask){
			item.description = event.value;
		}
	});

	localStorage.setItem("listItems", JSON.stringify(taskItem));
}


window.onload = loadTasks;



// Form submit 
formContainer.addEventListener('submit', (event) => {
	event.preventDefault();
	addToDoItem();
})

// Clear all completed tasks
clearSelectedList.addEventListener('click', (event) => {
	const completedTasks = Array.from(document.getElementsByClassName("completed"));
	completedTasks.forEach((item, index) => {
		item.parentElement.remove();
	});
	clearAll();
})










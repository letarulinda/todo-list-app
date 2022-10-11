export const clearAll = () => {
	let taskItems = Array.from(JSON.parse(localStorage.getItem("listItems")));
	const newList = taskItems.filter(item => {
		return item.completed !== true;
	});
	localStorage.setItem('listItems', JSON.stringify(newList))
	window.location.reload;
}


window.taskCompleted = function(event) {
	const taskItems = Array.from(JSON.parse(localStorage.getItem("listItems")));
	taskItems.forEach((item) => {
		if (item.description === event.nextElementSibling.value){
			item.completed = !item.completed;
		}
	});
	localStorage.setItem("listItems", JSON.stringify(taskItems));
	event.nextElementSibling.classList.toggle("completed")
}

export default taskCompleted

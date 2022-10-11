export const clearAll = () => {
	const taskItems = Array.from(JSON.parse(localStorage.getItem('listItems')));
	const newList = taskItems.filter((item) => item.completed !== true);
	localStorage.setItem('listItems', JSON.stringify(newList));

	window.location.reload();
};

export const taskCompleted = (event) => {
	const taskItems = Array.from(JSON.parse(localStorage.getItem('listItems')));
	taskItems.forEach((item) => {
		if (item.description === event.nextElementSibling.value) {
			item.completed = !item.completed;
		}
	});
	localStorage.setItem('listItems', JSON.stringify(taskItems));
	event.nextElementSibling.classList.toggle('completed');
};

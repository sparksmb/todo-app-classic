/*global app */
app.usecase.viewTodoList = {
	create: function (view,
					   getTodoList,
					   saveTodoList,
					   todoListItemCreator,
					   addTodoListItemCreator,
					   completeTodoListItemCreator,
					   editTodoListItemCreator,
					   filterTodoListCreator) {
		'use strict';
		var viewTodoList = Object.create(app.usecase.usecaseBase.create()),
			todoList,
			addTodoListItem,
			completeTodoListItem,
			editTodoListItem,
			filterTodoList,
			filterStatus;
		
		function bindModelData(todoList) {
			var filteredList = filterTodoList.execute(filterStatus);
			filteredList.itemsLeft = todoList.itemsLeft;
			view.getViewData().data.todoList = filteredList;
		}
		
		function render() {
			bindModelData(todoList);
			view.render();
			view.initEventHandlers();
		}
		
		function addTodoListItemEventHandler(e) {
			var item = todoListItemCreator.create({ text: e.text });
			addTodoListItem.execute(item);
			saveTodoList.execute(todoList);
			render();
		}
		
		function editTodoListItemEventHandler(e) {
			editTodoListItem.execute(e.oldText, e.newText);
			saveTodoList.execute(todoList);
			render();
		}
		
		function completeTodoListItemEventHandler(e) {
			completeTodoListItem.execute(e.id, e.isChecked);
			saveTodoList.execute(todoList);
			render();
		}
		
		function filterTodoListEventHandler(e) {
			filterStatus = e.filterStatus;
			render();
		}
		
		function initEventHandlers() {
			viewTodoList.initEventHandler('addTodoListItem', addTodoListItemEventHandler);
			viewTodoList.initEventHandler('editTodoListItem', editTodoListItemEventHandler);
			viewTodoList.initEventHandler('completeTodoListItem', completeTodoListItemEventHandler);
			viewTodoList.initEventHandler('filterTodoList', filterTodoListEventHandler);
		}
		
		function initDependencies(todoList) {
			addTodoListItem = addTodoListItemCreator.create(todoList);
			completeTodoListItem = completeTodoListItemCreator.create(todoList);
			editTodoListItem = editTodoListItemCreator.create(todoList);
			filterTodoList = filterTodoListCreator.create(todoList);
		}
		
		viewTodoList.execute = function () {
			todoList = getTodoList.execute();
			filterStatus = filterStatus || todoList.ALL;
			initDependencies(todoList);
			render();
			initEventHandlers();
		};
		
		return viewTodoList;
	}
};
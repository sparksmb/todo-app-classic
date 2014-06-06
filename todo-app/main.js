/*global window, app, document */
app.main.run = function () {
	'use strict';
	var viewTodoList,
		xhr = app.entity.xhr.create(),
		storage = app.entity.webStorage.create(),
		todoListView = app.view.todoListView.create(xhr),
		getTodoList = app.usecase.getTodoList.create(storage, app.entity.todoList);/*,
		saveTodoList = app.usecase.saveTodoList.create(),
		clearTodoList = app.usecase.clearTodoList.create(),
		addTodoListItem = app.entity.addTodoListItem.create(),
		completeTodoListItem = app.entity.completeTodoListItem.create();*/
	
	viewTodoList = app.usecase.viewTodoList.create(
		todoListView,
		getTodoList/*,
		saveTodoList,
		clearTodoList,
		addTodoListItem,
		completeTodoListItem*/
	);
	
	viewTodoList.execute();
};
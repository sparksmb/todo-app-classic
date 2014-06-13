/*global window, app, document */
app.main.run = function () {
	'use strict';
	var viewTodoList,
		xhr = app.entity.xhr.create(),
		storage = app.entity.webStorage.create(),
		todoListView = app.view.todoListView.create(xhr),
		todoList = app.entity.todoList,
		getTodoList = app.usecase.getTodoList.create(storage, todoList),
		saveTodoList = app.usecase.saveTodoList.create(storage, todoList),
		addTodoListItem = app.usecase.addTodoListItem.create(todoList);
	
	viewTodoList = app.usecase.viewTodoList.create(
		todoListView,
		getTodoList,
		saveTodoList,
		addTodoListItem
	);
	
	viewTodoList.execute();
};
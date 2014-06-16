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
		todoListItemCreator = app.entity.todoListItem,
		addTodoListItemCreator = app.usecase.addTodoListItem;
	
	viewTodoList = app.usecase.viewTodoList.create(
		todoListView,
		getTodoList,
		saveTodoList,
		todoListItemCreator,
		addTodoListItemCreator
	);
	
	viewTodoList.execute();
};
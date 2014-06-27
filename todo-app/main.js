/*global window, app, document */

/******************************************
Main's responsibility is to instantiate 
dependencies (as seen by the variable list)
and then set the application in motion by
executing the viewTodoList usecase.  We
should not see the business rules or 
algorithms in main.  They should all be 
encapsulated in their appropriate modules.
Main is envoked in the index.html file
when the script tag is parsed.
******************************************/
app.main.run = function () {
	'use strict';
	var viewTodoList,
		xhr = app.entity.xhr.create(),
		webStorageCreator = app.entity.webStorage,
		storage = app.entity.todoListStorageAdapter.create(webStorageCreator),
		todoListView = app.view.todoListView.create(xhr),
		todoList = app.entity.todoList,
		getTodoList = app.usecase.getTodoList.create(storage, todoList),
		saveTodoList = app.usecase.saveTodoList.create(storage),
		todoListItemCreator = app.entity.todoListItem,
		addTodoListItemCreator = app.usecase.addTodoListItem,
		completeTodoListItemCreator = app.usecase.completeTodoListItem,
		editTodoListItemCreator = app.usecase.editTodoListItem,
		filterTodoListCreator = app.usecase.filterTodoList;
	
	viewTodoList = app.usecase.viewTodoList.create(
		todoListView,
		getTodoList,
		saveTodoList,
		todoListItemCreator,
		addTodoListItemCreator,
		completeTodoListItemCreator,
		editTodoListItemCreator,
		filterTodoListCreator
	);
	
	viewTodoList.execute();
};
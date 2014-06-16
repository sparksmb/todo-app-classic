/*global app */
app.usecase.viewTodoList = {
	create: function (view,
					  getTodoList,
					  saveTodoList,
					  todoListItemCreator,
					  addTodoListItemCreator) {
		'use strict';
		var viewTodoList = Object.create(app.usecase.usecaseBase.create()),
			addTodoListItem;
		
		function render() {
			view.render();
			view.initEventHandlers();
		}
		
		function addTodoListItemEventHandler(e) {
			var item = todoListItemCreator.create({ text: e.text });
			addTodoListItem.execute(item);
			render();
		}
		
		function initEventHandlers() {
			viewTodoList.initEventHandler('addTodoListItem', addTodoListItemEventHandler);
		}
		
		
		viewTodoList.execute = function () {
			var todoList = getTodoList.execute();
			addTodoListItem = addTodoListItemCreator.create(todoList, todoListItemCreator);
			view.getViewData().data.todoList = todoList.toArray();
			render();
			initEventHandlers();
		};
		
		return viewTodoList;
	}
};
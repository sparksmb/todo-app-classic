/*global app */
app.usecase.viewTodoList = {
	create: function (view,
					  getTodoList,
					  saveTodoList,
					  addTodoListItem) {
		'use strict';
		var viewTodoList = Object.create(app.usecase.usecaseBase.create());
		
		function addTodoListItemEventHandler(e) {
			//addTodoListItem.execute()
			alert(e.data);
		}
		
		function initEventHandlers() {
			viewTodoList.initEventHandler('addTodoListItem', addTodoListItem);
		}
		
		
		viewTodoList.execute = function () {
			var todoList = getTodoList.execute();
			view.getViewData().data.todoList = todoList.toArray();
			view.render();
			view.initEventHandlers();
			initEventHandlers();
		};
		
		return viewTodoList;
	}
};
/*global app */
app.usecase.viewTodoList = {
	create: function (view, getTodoList) {
		'use strict';
		var viewTodoList;
			
		viewTodoList = {
			execute: function () {
				var todoList = getTodoList.execute();
				view.getViewData().data.todoList = todoList.toArray();
				view.render();
				//view.initEventHandlers();
			}
		};
		
		return viewTodoList;
	}
};
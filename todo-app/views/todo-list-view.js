/*global app, document, alert, FileReader */
app.view.todoListView = {
	create: function (xhr, iViewData) {
		'use strict';
		
		var viewData = iViewData || {
				container_id: 'todo-app',
				template: { url: 'views/todo-list-view.html'},
				data: {
					todoList: null
				}
			},
			todoListView = Object.create(app.view.htmlView.create(xhr, viewData));
		
		return todoListView;
	}
};

/*global app, $, document, alert, FileReader */
app.view.todoListView = {
	create: function (xhr, iViewData) {
		'use strict';
		
		function sendAddItemEvent(text) {
			$('#todo-app').trigger({
				type: 'addTodoListItem',
				text: text
			});
		}
		
		function initAddItem() {
			$('#addItemTextbox').bind('keypress', function (e) {
				if (e.keyCode === 13) {
					sendAddItemEvent(this.value);
				}
			});
		}
		
		
		
		function init() {
			initAddItem();
			$('#addItemTextbox').focus();
		}
		
		var viewData = iViewData || {
				container_id: 'todo-app',
				template: { url: 'views/todo-list-view.html'},
				data: {
					todoList: null
				}
			},
			todoListView = Object.create(app.view.htmlView.create(xhr, viewData));
			
		todoListView.initEventHandlers = function () {
			init();
		};
		
		return todoListView;
	}
};

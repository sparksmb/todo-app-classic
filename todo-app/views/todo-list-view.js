/*global app, $, document, alert, FileReader */
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
		
		function initMarkCompleted() {
		}
		
		function init() {
			initAddItem();
			initMarkCompleted();
			$('#addItemTextbox').focus();
		}
		
		function preProcessItemsForRendering() {
			var i,
				completed = 0,
				todoItems = viewData.data.todoList,
				len = todoItems.length;
			
			for (i = 0; i < len; i += 1) {
				if (todoItems[i].isCompleted) {
					completed += 1;
				}
				todoItems[i].index = i;//expose index as a property
			}
			
			todoItems.itemsLeft = len - completed;
		}
		
		todoListView.initEventHandlers = function () {
			init();
		};
		
		todoListView.render = function () {
			preProcessItemsForRendering();
			Object.getPrototypeOf(todoListView).render(); //baseObj.render()
		};
		
		return todoListView;
	}
};

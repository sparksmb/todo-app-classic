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
		
		function sendCompleteItemEvent(index, isChecked) {
			$('#todo-app').trigger({
				type: 'completeTodoListItem',
				index: index,
				isChecked: isChecked
			});
		}
		
		function bindAddItemAction() {
			$('#addItemTextbox').bind('keypress', function (e) {
				if (e.keyCode === 13) {
					sendAddItemEvent(this.value);
				}
			});
		}
		
		function getIndexFromId(id) {
			var tokens = id.split('-');
			return parseInt(tokens[tokens.length - 1], 10);
		}
		
		function bindMarkCompletedAction() {
			$("input[type='checkbox']").click(function (e) {
				var index = getIndexFromId(e.target.id),
					isChecked = e.target.checked;
				//alert(getIndexFromId(index) + ', ' + isChecked);
				sendCompleteItemEvent(index, isChecked);
			});
		}
		
		function initMarkCompleted() {
		}
		
		function init() {
			bindAddItemAction();
			bindMarkCompletedAction();
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

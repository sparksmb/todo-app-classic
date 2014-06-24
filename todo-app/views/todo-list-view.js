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
		
		function sendEditItemEvent(oldText, newText) {
			$('#todo-app').trigger({
				type: 'editTodoListItem',
				oldText: oldText,
				newText: newText
			});
		}
		
		function endEditItemMode(element, oldText) {
			var newText = $('#editItemTextbox').val();
			element.innerHTML = newText;
			sendEditItemEvent(oldText, newText);
			$('#addItemTextbox').focus();
		}
		
		function detectEnterKeyPress(e, element) {
			if (e.keyCode === 13) {
				if (e.target.id === 'addItemTextbox') {
					sendAddItemEvent(e.target.value);
				} else {
					endEditItemMode(element);
				}
			}
		}
		
		function sendCompleteItemEvent(index, isChecked) {
			$('#todo-app').trigger({
				type: 'completeTodoListItem',
				index: index,
				isChecked: isChecked
			});
		}
		
		function bindAddItemAction() {
			$('#addItemTextbox').bind('keydown', function (e) {
				detectEnterKeyPress(e);
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
				
				sendCompleteItemEvent(index, isChecked);
			});
		}
		
		function startEditItemMode(element, text) {
			element.innerHTML = '<input type="text" id="editItemTextbox" value="' + text + '" />';
			
			/*if (!element.onkeydown) {
				element.onkeydown = function (e) {
					detectEnterKeyPress(e, element);
				};
			}*/
			
			$('#editItemTextbox').blur(function (e) {
				endEditItemMode(element, text);
			});
		}
		
		function bindEditItemAction() {
			$('.col2 .todo-text').click(function (e) {
				var todoTextElement = e.target,
					text = todoTextElement.textContent;
				
				startEditItemMode(todoTextElement, text);
			});
		}
		
		function init() {
			bindAddItemAction();
			bindMarkCompletedAction();
			bindEditItemAction();
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

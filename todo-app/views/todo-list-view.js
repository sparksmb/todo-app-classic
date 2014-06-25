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
		
		/************** SEND EVENTS ******************************/
		
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
		
		function sendCompleteItemEvent(id, isChecked) {
			$('#todo-app').trigger({
				type: 'completeTodoListItem',
				id: id,
				isChecked: isChecked
			});
		}
		
		function sendFilterStatusEvent(filterStatus) {
			$('#todo-app').trigger({
				type: 'filterTodoList',
				filterStatus: filterStatus
			});
		}
		
		/***************** UI STUFF ******************************/
		
		function parseId(id) {
			var tokens = id.split('-');
			return parseInt(tokens[tokens.length - 1], 10);
		}
		
		function endEditItemMode(element, oldText) {
			var newText = $('#editItemTextbox').val();
			element.innerHTML = newText;
			sendEditItemEvent(oldText, newText);
			$('#addItemTextbox').focus();
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
		
		function detectEnterKeyPress(e, element) {
			if (e.keyCode === 13) {
				if (e.target.id === 'addItemTextbox') {
					sendAddItemEvent(e.target.value);
				} else {
					endEditItemMode(element);
				}
			}
		}
		
		/************** BINDING ******************************/
		
		function bindMarkCompletedAction() {
			$("input[type='checkbox']").click(function (e) {
				var id = parseId(e.target.id),
					isChecked = e.target.checked;
				sendCompleteItemEvent(id, isChecked);
			});
		}
		
		function bindAddItemAction() {
			$('#addItemTextbox').bind('keydown', function (e) {
				detectEnterKeyPress(e);
			});
		}
		
		function bindEditItemAction() {
			$('.col2 .todo-text').click(function (e) {
				var todoTextElement = e.target,
					text = todoTextElement.textContent;
				
				startEditItemMode(todoTextElement, text);
			});
		}
		
		function bindFilterActions() {
			$('#filter-active').click(function (e) {
				sendFilterStatusEvent(1);
			});
			
			$('#filter-all').click(function (e) {
				sendFilterStatusEvent(2);
			});
			
			$('#filter-completed').click(function (e) {
				sendFilterStatusEvent(3);
			});
		}
		
		/*************** RENDER STUFF ******************/
		
		function init() {
			bindAddItemAction();
			bindMarkCompletedAction();
			bindEditItemAction();
			bindFilterActions();
			$('#addItemTextbox').focus();
		}
		
		todoListView.initEventHandlers = function () {
			init();
		};
		
		todoListView.render = function () {
			Object.getPrototypeOf(todoListView).render(); //baseObj.render()
		};
				
		return todoListView;
	}
};

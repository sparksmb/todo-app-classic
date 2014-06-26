/*global app, document, window, unescape, Mustache*/
app.view.htmlView = {
	create: function (xhr, iViewData) {
		'use strict';
		var htmlView;
		
		function getTemplate(template) {
			var html;
			if (template.url) {
				html = xhr.get(template.url);
			} else if (template.html) {
				html = template.html;
			} else {
				throw 'Invalid template type, expected string or object. template: ' + JSON.stringify(template);
			}
			return html;
		}
		
		function renderInContainer(containerId, htmlTemplate, data) {
			var html = Mustache.to_html(htmlTemplate, data);
			document.getElementById(containerId).innerHTML = html;
		}
		
		function renderView(view) {
			if (view) {
				renderInContainer(view.container_id,
					getTemplate(view.template),
					view.data);
			} else {
				throw 'Cannot render view before setting htmlView.view property!';
			}
		}
		
		function augmentViewData(data) {
			var prop;
			
			if (typeof data === 'object') {
				for (prop in data) {
					if (data.hasOwnProperty(prop)) {
						htmlView.view.data[prop] = data[prop];
					}
				}
			}
		}
				
		htmlView = {
			view: app.interFace.iViewData(iViewData),
			render: function (data) {
				augmentViewData(data);
				renderView(htmlView.view);
			},
			getHtml: function (data) {
				var html;
				augmentViewData(data);
				html = Mustache.to_html(getTemplate(htmlView.view.template), htmlView.view.data);
				return html;
			},
			getView: function () {
				return htmlView.view;
			},
			getViewData: function () {
				return htmlView.view;
			},
			setView: function (iViewData) {
				htmlView.view = app.interFace.iViewData(iViewData);
			}
		};
		
		return app.interFace.iView(htmlView);
	}
};
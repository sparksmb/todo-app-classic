/*global app, document */
app.usecase.usecaseBase = {
	create: function () {
		var usecaseBase = {
			initEventHandlers: function (iEventHandlerList) {
				var i, 
					length, 
					eventHandlerList = app.interFace.iEventHandlerList(iEventHandlerList);
				
				length = eventHandlerList.length;
				for (i=0; i < length; i += 1) {
					$("html").on(eventHandlerList[i].eventName, this[eventHandlerList[i].eventAction]);
				}
			},
			initEventHandler: function ( eventName, eventAction ) {
				if ( arguments.length != 2) {
					throw ('Expected 2 arguments to initEventHandler.');
				}
				
				if ( typeof eventAction != 'function' ) {
					throw ('Expected parameter to be of type function passed to initEventHandler.');
				}
			
				$("html").on(eventName, eventAction);
			}
		};
		
		return usecaseBase;
	}
};
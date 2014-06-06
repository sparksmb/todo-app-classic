/*global app */
app.interFace.iEventHandlerList = function (eventHandlerList) {
	var i, length, eventHandler;
	
	if (typeof eventHandlerList === 'object' && eventHandlerList.length) {
		length = eventHandlerList.length;
		for (i=0; i < length; i += 1 ) {
			eventHandler = eventHandlerList[i];
			if (typeof eventHandler === 'object') {
				if (!(eventHandler.eventName && 
					  typeof eventHandler.eventName === 'string' &&
					  eventHandler.eventAction &&
					  typeof eventHandler.eventAction === 'string'
					)) {
					throw 'Expected event handler properties eventName and eventAction to be of type string';
				}
			} else {
				throw 'Expected event handler to be an object!';
			}
		}
	} else {
		throw 'Expected event handler list to be an array!';
	}

	return eventHandlerList;
};
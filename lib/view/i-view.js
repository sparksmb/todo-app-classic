/*global app */
app.interFace.iView = function (iView) {
	if (iView) {
		if (typeof iView.render !== 'function') { throw 'Interface method iView.render was not implemented'; }
		if (typeof iView.getView !== 'function') { throw 'Interface method iView.getView was not implemented'; }
		if (typeof iView.setView !== 'function') { throw 'Interface method iView.setView was not implemented'; }
	} else {
		throw 'i-view interface not implemented.';
	}
	
	return iView;
};

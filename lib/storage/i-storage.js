/*global app */
app.interFace.iStorage = function (iStorage) {
	if (typeof iStorage === 'object') {
		if (typeof iStorage.create !== 'function') { throw 'Interface method iStorage.create was not implemented'; }
		if (typeof iStorage.read !== 'function') { throw 'Interface method iStorage.read was not implemented'; }
		if (typeof iStorage.update !== 'function') { throw 'Interface method iStorage.update was not implemented'; }
		if (typeof iStorage.destroy !== 'function') { throw 'Interface method iStorage.destroy was not implemented'; }
	} else {
		throw 'Storage interface not implemented.';
	}
	
	return iStorage;
};

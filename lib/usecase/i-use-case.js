/*global app */
app.interFace.iUseCase = function (iUseCase) {
	if (typeof iUseCase === 'object') {
		if (typeof iUseCase.execute !== 'function') { throw 'Interface method iUseCase.execute was not implemented'; }
	} else {
		throw 'Use Case interface not implemented.';
	}
	
	return iUseCase;
};

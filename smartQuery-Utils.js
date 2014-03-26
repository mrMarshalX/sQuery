;(function (root) {
	var prefix = '[Utils] ';
	console.log(prefix.concat('loaded!'));
	root.sQuery = root.sQuery || {};
	// MISC
	sQuery.isDOMElement = function (el) {
		return el.nodeName ? true : false;
	};

	sQuery.each = function (arr, callback) {
		var prefix = '[sQuery.each()] ';
		if (!callback) {
			throw new Error(prefix.concat('Callback is not defined'));
		}
		if (Array.prototype.forEach) {
			if (arr.constructor === Array) {
				Array.prototype.forEach.call(arr, callback);
			} else {
				throw new Error(prefix.concat('Passed argument is not an array'));
			}
		} else {
			throw new Error(prefix.concat('Native implementation is not supported'));
		}
	};

	sQuery.filter = function (arr, callback) {
		var prefix = '[sQuery.filter()] ';
		if (!callback) {
			throw new Error(prefix.concat('Callback is not defined'));
		}
		if (arr.constructor === Array) {
			Array.prototype.filter.call(arr, callback);
		} else {
			throw new Error(prefix.concat('Passed argument is not an array'));
		}
	};

	sQuery.now = function () {
		return Date.now();
	};

	sQuery.isObjectEmpty = function (obj) {
		if (typeof obj !== 'object') throw new Error('Passed argument is not an object');
		if (obj === null) throw new Error('Passed argument is a null');
		if (JSON.stringify(obj) === '{}') return true;
		else return false;	
	};
})(window);
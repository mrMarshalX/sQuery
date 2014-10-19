;(function (root) {
	var prefix = '[Utils] ';
	console.log(prefix.concat('loaded!'));
	root.sQuery = root.sQuery || {};
	// MISC

	function deepExtend(out) {
		var out = out || {}, i, obj, key;

		for (i = 1; i < arguments.length; i++) {
			obj = arguments[i];

			if (!obj) continue;

			for (key in obj) {
			  if (obj.hasOwnProperty(key)) {
			    if (typeof obj[key] === 'object') deepExtend(out[key], obj[key]);
			    else out[key] = obj[key];
			  }
			}
		}

  		return out;
	}

	function extend(out) {
		var out = out || {}, i, key;

		for (i = 1; i < arguments.length; i++) {
			if (!arguments[i]) continue;

			for (key in arguments[i]) {
			  if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
			}
		}
		
  		return out;
	}

	sQuery.isDOMElement = function (el) {
		return el.nodeName ? true : false;
	};

	sQuery.each = function (arr, callback) {
		var prefix = '[sQuery.each()] ',
			i;
		if (!callback) {
			throw prefix.concat('Callback is not defined');
		}
		if (Array.prototype.forEach) {
			if (arr.constructor === Array) {
				Array.prototype.forEach.call(arr, callback);
			} else {
				throw prefix.concat('Passed argument is not an array');
			}
		} else {
			throw 'Native implementation is not supported. Consider changing web browser for Webkit based';
		}
	};

	sQuery.filter = function (arr, callback) {
		var prefix = '[sQuery.filter()] ';

		if (!callback) {
			throw prefix.concat('Callback is not defined');
		}
		if (Array.prototype.filter) {
			if (arr.constructor === Array) {
				Array.prototype.filter.call(arr, callback);
			} else {
				throw prefix.concat('Passed argument is not an array');
			}	
		} else {
			throw 'Native implementation is not supported. Consider changing web browser for Webkit based';	
		}		
	};

	sQuery.proxy = function (fn, context) {
		fn.bind(context);
	};

	sQuery.now = function () {
		return Date.now();
	};

	sQuery.deepExtend = deepExtend;

	sQuery.shallowExtend = extend;

	sQuery.extend = function () {
		var r;
		if (typeof arguments[0] === 'boolean' && arguments[0]) {
			r = deepExtend.apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			if (typeof arguments[0] === 'boolean') {
				r = extend.apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				r = extend.apply(this, arguments);
			}			
		}
		return r;
	};

	sQuery.isObjectEmpty = function (obj) {
		if (typeof obj !== 'object') throw 'Passed argument is not an object';
		if (obj === null) throw 'Passed argument is a null';
		if (JSON.stringify(obj) === '{}') return true;
		else return false;	
	};	
})(window);
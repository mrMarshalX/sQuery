(function () {
	var prefix = '[Events] ';
	console.log(prefix.concat('loaded!'));

	Element.prototype.on = function (eventName, eventHandler) {
		this.addEventListener(eventName, eventHandler);
	};

	Element.prototype.off = function (eventName, eventHandler) {
		this.removeEventListener(eventName, eventHandler);
	};

	Element.prototype.trigger = function (eventName, data) {
		var ev;
		if (window.CustomEvent) {
			ev = new CustomEvent(eventName, {detail: data});
		} else {
			ev = document.createEvent('CustomEvent');
			ev.initCustomEvent(eventName, true, true, data);
		}
		this.dispatchEvent(ev);
	};
})();
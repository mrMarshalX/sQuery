(function () {
	var prefix = '[Effects] ';
	console.log(prefix.concat('loaded!'));
	// EFFECTS
	/**
		Hides DOM element
	*/
	Element.prototype.hide = function () {
		this.style.display = 'none';
		return this;
	};

	/**
		Shows DOM element
	*/
	Element.prototype.show = function () {
		this.style.display = '';
		return this;
	};
})();
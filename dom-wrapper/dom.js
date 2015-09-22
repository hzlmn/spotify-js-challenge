var helpers = require('./dom.helpers.js');

/**
 * [spotify description]
 * @param  {[type]} selector [description]
 * @return {[type]}          [description]
 */
var spotify = function (selector) {
	return new SpotifyDom(selector);
};

var SpotifyDom = function (selector) {
	if (typeof selector === 'string') {
		var selector = helpers.trim(selector);
		if (helpers.classTest(selector) || !helpers.idTest(selector)) {
			
			this.dom = _arrify((helpers.classTest(selector)) 
									? helpers.getByClass(selector) 
									: helpers.getByTag(selector));

			this.length = this.dom.length;
		} else if (helpers.idTest(selector)) {
			this.dom = helpers.getById(selector);
			this.length = 1;
		} else {
			throw new TypeError('Uncorrect type of selector');
		}
	} else if (typeof selector === 'object' && selector.dom) {
		this.dom = selector.dom;
		this.length = 1;
	}

	return this;
};

/**
 * [html description]
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
SpotifyDom.prototype.html = function(content) {
	if (helpers.isArray(this._dom)) throw new Error('SpotifyDOMInvalid: cannot set to collection');
	this._dom.innerHTML = content;
	return this;
};

/**
 * [val description]
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
SpotifyDom.prototype.val = function(content) {
	if (helpers.isArray(this._dom)) throw new Error('SpotifyDOMInvalid: cannot set to collection');
	this._dom.value = content;
	return this;
};

/**
 * [each description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
SpotifyDom.prototype.each = function(cb) {
	if (!helpers.isArray(this._dom)) throw new Error('SpotifyDOMInvalid: should be a collection');
	var i;
	for (i = 0; i < this.length; i++) {
		cb(new SpotifyDom({ dom: this._dom[i] }));
	}
	return this;
};

module.exports = spotify;

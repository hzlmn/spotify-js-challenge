var window  = require('global/window');
var helpers = require('./dom.helpers.js');

var _arrify = function (node) {
	return [].slice.call(node);
};

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

SpotifyDom.prototype = {
	html: function (content) {
		if (this._isCollection()) throw new Error('SpotifyDOMInvalid: cannot set to collection; use each method');
		this.dom.innerHTML = content;
		return this;
	},

	value: function (content) {
		if (this._isCollection()) throw new Error('SpotifyDOMInvalid: cannot set to collection; use each method');
		this.dom.value = content;
		return this;
	},

	each: function (callback) {
		if (!this._isCollection()) throw new Error('SpotifyDOMInvalid:should be a collection');
		var i;
		for (i = 0; i < this.length; i++) {
			callback(new SpotifyDom({ dom: this.dom[i] }));
		}
		return this;
	},

	_isCollection: function () {
		return helpers.isArray(this.dom);
	}
};

module.exports = spotify;
window.spotify = spotify;
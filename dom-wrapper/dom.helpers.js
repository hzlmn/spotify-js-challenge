/**
 * @desc module with utility functions
 */
var class_regex = /\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s*/ig;
var id_regex = /\#-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s*/ig;
var wp_regex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

var helpers = {
	/**
	 * [arrify description]
	 * @return {[type]} [description]
	 */
	arrify: function (nodeList) {
		return [].slice.call(nodeList);
	},

	/**
	 * [description]
	 * @return {[type]} [description]
	 */
	isArray: Array.isArray || function () {
		return Object.prototype.toString.call(element) === '[object Array]';
	},

	/**
	 * [classTest description]
	 * @return {[type]} [description]
	 */
	classTest: function (selector) {
		return class_regex.test(selector);
	},

	/**
	 * [idTest description]
	 * @return {[type]} [description]
	 */
	idTest: function (selector) {
		return id_regex.test(selector);
	},

	/**
	 * [trim description]
	 * @return {[type]} [description]
	 */
	trim: function (str) {
		if (typeof str !== 'string') { throw new TypeError('Should be a string'); }
		return el.replace(wp_regex, '');
	},

	/**
	 * getElementsByClass for old browsers
	 * @return array of selected elements
	 */
	getByClass: function (className) {
		var nodes = [];
		var tags = document.getElementsByTagName('*');
		var length = tags.length;
		var i, j;

		for (i = 0, j = 0; i < length; i++) {
			if (this.classTest(tags[i].className)) {
				nodes[j] = tags[i];
				j++;
			}
		}

		return nodes;
	}
};

module.exports = helpers;

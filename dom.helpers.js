var document = require('global/document');
var classname = require('regex-classname');
var regexTrimmer = require('regex-trimmer');
var id = require('regex-id');

exports.isArray = Array.isArray || function (element) {
	return Object.prototype.toString.call(element) === '[object Array]';
};

exports.classTest = function (selector) {
	return selector.match(classname());
};

exports.idTest = function (selector) {
	return selector.match(id());
};

exports.trim = function (el) {
	if (typeof el !== 'string') throw new Error('Should be a string');
	return el.replace(regexTrimmer(), '');
};

exports.getByClass = function (className) {
	var className = className.replace('.', '');
	var nodes = [];
	var tags = document.getElementsByTagName('*');
	var length = tags.length;
	var rega = new RegExp(className);
	var i, j;

	for (i = 0, j = 0; i < length; i++) {
		if (rega.test(tags[i].className)) {
			nodes[j] = tags[i];
			j++;
		}
	}

	return nodes;
};

exports.getById = function (id) {
	var id = id.replace('#', '');
	return document.getElementById(id);
};

exports.getByTag = function () {
	return document.getElementsByTagName(tag);
};

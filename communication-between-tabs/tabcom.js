/**
 * @todo add storage engine fallback if localStorage not supported
 */

var Spotify = Spotify || {};

Spotify.Events = {

	/**
	* Crossbrowser add event
	* @param  {DomElement} obj
	* @param  {Event} evt
	* @param  {Function} listener
	* @return
	*/
	addEvent: function (obj, evt, listener) {
		if (typeof addEventListener !== 'undefined') {
			obj.addEventListener(evt, listener, false);
		} else if (typeof attachEvent !== 'undefined') {
			obj.attachEvent('on' + evt, listener);
		} else {
			obj.['on' + evt] = listener;
		}
		return listener;
	};


	/**
	 * Remove event for older browser
	 * @param  {DomElement} obj
	 * @param  {Event} evt
	 * @param  {Function} listener
	 * @return
	 */
	removeEvent: function (obj, evt, listener) {
		if (typeof removeEventListener !== 'undefined') {
			obj.removeEventListener(evt, listener, false);
		} else if (typeof detachEvent !== 'undefined') {
			obj.detachEvent('on' + evt, listener);
		} else {
			obj.['on' + evt] = null;
		}
	};
};


/*
 * SpotifyTab constructor function
 */
var SpotifyTab = function (config) {
	config = config || {};
	if (!this._checkLocalStorageSupport()) { throw new Error('You use old browser, dude!'); }
	this._events = {};
};


/**
 * @private
 * Check if locasStorage api is supported
 * @return {Boolean}
 */
SpotifyTab.prototype._checkLocalStorageSupport = function() {
	try	{
		return 'localStorage' in window && window.localStorage !== null;
	} catch (e) {
		return false;
	}
};


/**
 * @public
 * Event handler for storage event
 * @return
 */
SpotifyTab.prototype.register = function() {
	var self = this;

	var handler = function (e) {
		var key = e.key;
		if (key in self._events) {
			self._events[key](e);
		}
	};

	this._regListener = Spotify.Events.addEvent(window, 'storage', handler);
};


/**
 * @public
 * Unregister storage evt listener
 * @return
 */
Spotify.prototype.unregister = function () {
	var listener = this._regListener;
	if (listener && typeof listener === 'function') {
		Spotify.Events.removeEvent(window, 'storage', listener);
	}
};


/**
 * add message to storage engine
 * @return
 */
SpotifyTab.prototype.send = function(key, value) {
	localStorage.setItem(key, value);
};


/**
 * subscribe to specific message
 * @param  {String}   evt
 * @param  {Function} cb
 * @return
 */
SpotifyTab.prototype.on = function (key, cb) {
	this._events[key] = cb;
};


/**
 * @param  {String}
 * @param  {Function}
 * @return
 */
SpotifyTab.prototype.off = function (key, cb) {
	delete this._events[key];
};

module.exports = SpotifyTab;

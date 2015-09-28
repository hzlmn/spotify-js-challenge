/**
 * @todo add storage engine fallback if localStorage not supported
 */
/*
 * SpotifyTab constructor function
 */
var SpotifyTab = function () {
	if (!this._checkLocalStorageSupport()) { throw new Error('You use old browser, dude!'); }
	this._events = {};
	this._register();
};

/**
 * @private
 * check if locasStorage api is supported
 * @return {[bool]}
 */
SpotifyTab.prototype._checkLocalStorageSupport = function() {
	try	{
		return 'localStorage' in window && window.localStorage !== null;
	} catch (e) {
		return false;
	}
};

/**
 * @private
 * event handler for storage event
 * @return {[type]}     [description]
 */
SpotifyTab.prototype._register = function() {
	var self = this;
	this._window.addEventListener('storage', function (e) {
		var key = e.key;
		if (key in self._events) {
			self._events[key](e);
		}
	}, false);
};

/**
 * add message to storage engine
 */
SpotifyTab.prototype.send = function(key, value) {
	localStorage.setItem(key, value);
};

/**
 * subscribe to specific message
 * @param  {[string]}   evt [key value]
 * @param  {Function} cb  [callback]
 * @return {[null]}  
 */
SpotifyTab.prototype.subscribe = function (key, cb) {
	this._events[key] = function (e) {
		cb(e);
	};
};

window.s = new SpotifyTab();

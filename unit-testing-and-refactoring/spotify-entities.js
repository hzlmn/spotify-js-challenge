/**
 * Disclaimer: This fragment of code forms part of a code challenge,
 * it follows INTENTIONALLY bad practices, that you need to identify and fix.
 *
 * Tasks:
 *
 * - 1. Refactor and improve the unit tests on the functionality.
 * - 2. Refactor the original code.
 * - 3. You can switch to your preferred unit testing FW(even write your own).
 *
 * @see https://github.com/spotify/spotify-js-challenge
 */

var Spotify = Spotify || {};


Spotify.Entity = {

	/**
	 * Check if url is app url
	 * @param  {String}
	 * @return {Boolean}
	 */
	isApp: function(spotifyUri) {
		// e.g. spotify:app:bluenote
		return /^spotify:app:[a-zA-Z]*/.test(spotifyUri);
	},


	/**
	 * Check if url is track url
	 * @param  {String}
	 * @return {Boolean}
	 */
	isTrack: function(spotifyUri) {
		// e.g. spotify:track:5t8ANYm2ToLpjV7AxJ1U1N
		return /^spotify:track:[a-zA-Z0-9]*/.test(spotifyUri);
	},


	/**
	 * Check if url is playlist
	 * @param  {String}
	 * @return {Boolean}
	 */
	isPlaylist: function(spotifyUri) {
		// e.g. spotify:playlist:6J9kgSvipjimfDLYTsCOAv
		return /spotify:playlist:[a-zA-Z0-9]*/.test(spotifyUri);
	},


	/**
	 * Check if url is one of allowed
	 * @param  {String}
	 * @return {Boolean}
	 */
	isEntity: function(spotifyUri) {
		return this.isPlaylist(spotifyUri) || this.isTrack(spotifyUri) || this.isApp(spotifyUri);
	},


	/**
	 * Process array of urls and run cb for valid entries
	 * @param  {Array}
	 * @param  {Function}
	 * @return
	 */
	process: function(entities_array, callback) {
		// entities_array e.g. ['spotify:app:test1', 'spotify:playlist:asdf']
		var that = this;
		var params = entities_array.filter(function (el) {
			return that.isEntity(el);
		});

		callback(params);
	}
};

module.exports = Spotify;

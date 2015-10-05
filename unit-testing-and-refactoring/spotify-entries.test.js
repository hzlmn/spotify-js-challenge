/**
 * @todo improve test cases
 */

var assert = require('chai').assert;
var Spotify = require('./spotify-entities');

describe('Spotify tests', function () {
	describe('Spotify checker case', function () {
		it('isPlaylist should return correct result', function (cb) {
			assert.strictEqual(Spotify.Entity.isPlaylist('spotify:playlist:6J9kgSvipjimfDLYTsCOAv'), true);
			assert.strictEqual(Spotify.Entity.isPlaylist('spotify:play]list:undefined'), false);
			cb();
		});
		it('isApp should return correct result', function (cb) {
			assert.strictEqual(Spotify.Entity.isApp('spotify:app:bluenote'), true);
			assert.strictEqual(Spotify.Entity.isApp('spotify:player:bluenote'), false);
			cb();
		});
		it('isTrack should return correct result', function (cb) {
			assert.strictEqual(Spotify.Entity.isTrack('spotify:track:5t8ANYm2ToLpjV7AxJ1U1N'), true);
			assert.strictEqual(Spotify.Entity.isTrack('spotify:undef:undef'), false);
			cb();
		});
		it('isEntiny should return correct result', function (cb) {
			assert.strictEqual(Spotify.Entity.isEntity('spotify:track:5t8ANYm2ToLpjV7AxJ1U1N'), true);
			assert.strictEqual(Spotify.Entity.isEntity('spotify:app:bluenote'), true);
			assert.strictEqual(Spotify.Entity.isEntity('spotify:playlist:6J9kgSvipjimfDLYTsCOAv'), true);
			assert.strictEqual(Spotify.Entity.isEntity('spotify:undef:undef'), false);
			cb();
		});
	});

	describe('Spotify process case', function () {
		it('Process should correctly work with all correct', function (cb) {
			var length;

			Spotify.Entity.process(['spotify:track:5t8ANYm2ToLpjV7AxJ1U1N', 'spotify:track:5t8ANYm2ToLpjV7AxJ1U1N'], function (params) {
				length = params.length;
			});

			assert.strictEqual(length, 2);
			cb();
		});

		it('Process should correctly work with few correct', function (cb) {
			var length;

			Spotify.Entity.process(['spotify:track:5t8ANYm2ToLpjV7AxJ1U1N', 'spotify:undef:5t8ANYm2ToLpjV7AxJ1U1N'], function (params) {
				length = params.length;
			});

			assert.strictEqual(length, 1);
			cb();
		});
	});
});

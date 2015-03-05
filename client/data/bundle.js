
PINF.bundle("", function(require) {
	require.memoize("/main.js", function(require, exports, module) {
		exports.main = function(options) {
			dump("Hello World from FirePHP bundle!");
		}
	});
});

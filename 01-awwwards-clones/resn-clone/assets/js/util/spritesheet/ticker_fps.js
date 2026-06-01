define([
	'underscore',
	'util/class',
], function(
	_,
	Class
){

	'use strict';


	/**
	 * FPS based ticker, stripped version of the Ticker from CreateJS (http://createjs.com/docs/tweenjs/files/createjs_utils_Ticker.js.html)
	 */
	var TickerFPS = Class.extend({



		/**
		 * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
		 * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
		 * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
		 * (ex. maxDelta=50 when running at 40fps).
		 * 
		 * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
		 * when using both delta and other values.
		 * 
		 * If 0, there is no maximum.
		 * @property maxDelta
		 * @static
		 * @type {number}
		 * @default 0
		 */
		maxDelta: 0,

		_startTime: 0,
		_ticks: 0,
		_interval: 50,
		_lastTime: 0,
		_times: null,
		_tickTimes: null,
		_timerId: null,
		_now: window.performance && (window.performance.now || window.performance.mozNow || window.performance.msNow || window.performance.oNow || window.performance.webkitNow),

	 	initialize: function(fps, handler){

	 		_.bindAll(this, '_handleSynch');

	 		this.fps = fps;
	 		this._handler = handler;

			this._times = [];
			this._tickTimes = [];
			this._startTime = this._getTime();
			this._times.push(this._lastTime = 0);

	 		this._interval = 1000 / this.fps;
	 		this._setupTick();
	 	},

	 	destroy: function(){

	 		var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
			var fun = f && f(this._timerId);

			this._handler = undefined;
			this._timerId = this._times = this._tickTimes = null;
			this._startTime = this._lastTime = this._ticks = 0;
		},

		/**
		 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
		 * because it only measures the time spent within the tick execution stack. 
		 * 
		 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between 
		 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that 
		 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
		 *
		 * Example 2: With a target FPS of 30, getFPS() returns 10fps, which indicates an average of 100ms between the end of
		 * one tick and the end of the next. However, getMeasuredTickTime() returns 20ms. This would indicate that something
		 * other than the tick is using ~80ms (another script, DOM rendering, etc).
		 * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
		 * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
		 * @return {Number} The average time spent in a tick in milliseconds.
		 **/
		getMeasuredTickTime: function(ticks) {

			var ttl = 0, times = this._tickTimes;

			if (!times || times.length < 1) { 
				return -1;
			}
	 
			// by default, calculate average for the past ~1 second:
			ticks = Math.min(times.length, ticks || (this.fps | 0 ));

			for (var i = 0; i < ticks; i++){ 
				ttl += times[i]; 
			}

			return ttl / ticks;
		},

		/**
		 * Returns the actual frames / ticks per second.
		 * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
		 * Defaults to the number of ticks per second.
		 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
		 * from the target frames per second.
		 **/
		getMeasuredFPS: function(ticks) {

			var times = this._times;
			
			if (!times || times.length < 2) {
				return -1;
			}
	 
			// by default, calculate fps for the past ~1 second:
			ticks = Math.min(times.length - 1, ticks || (this.fps | 0));

			return 1000 / ((times[0] - times[ticks]) / ticks);
		},

		/**
		 * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
		 * Returns -1 if Ticker has not been initialized. For example, you could use
		 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
		 * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
		 * If false, the value returned will be total time elapsed since the first tick event listener was added.
		 * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized or -1.
		 **/
		getTime: function(runTime) {
			return this._startTime ? this._getTime()  : -1;
		},

		/**
		 * Similar to the {{#crossLink "Ticker/getTime"}}{{/crossLink}} method, but returns the time on the most recent {{#crossLink "Ticker/tick:event"}}{{/crossLink}}
		 * event object.
		 * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
		 * @returns {number} The time or runTime property from the most recent tick event or -1.
		 */
		getEventTime: function(runTime) {
			return this._startTime ? (this._lastTime || this._startTime) : -1;
		},

		/**
		 * Returns the number of ticks that have been broadcast by Ticker.
		 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
		 * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
		 * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
		 * value. The default value is false.
		 * @return {Number} of ticks that have been broadcast.
		 **/
		getTicks: function() {
			return  this._ticks; // - (pauseable ? this._pausedTicks : 0);
		},

		_handleSynch: function() {
			// Make sure is called async (without this get bug in FF)
			if(this._timerId === null) {
				return;
			}
			this._timerId = null;
			this._setupTick();
	 
			// run if enough time has elapsed, with a little bit of flexibility to be early:
			if (this._getTime() - this._lastTime >= (this._interval - 1) * 0.97) {
				this._tick();
			}
		},
	 
		_setupTick: function() {

			// avoid duplicates
			if (this._timerId != null) {
				return;
			}
		
			var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if (f) {
				this._timerId = f(this._handleSynch);
			}
		},
	 
		_tick: function() {

			var time = this._getTime();
			var elapsedTime = time - this._lastTime;
			this._lastTime = time;
			this._ticks++;
			
			this._tickTimes.unshift(this._getTime() - time);

			while (this._tickTimes.length > 100) {
				this._tickTimes.pop();
			}
	 
			this._times.unshift(time);

			while (this._times.length > 100) {
				this._times.pop();
			}

			// dispatch event
			var event = {};
			var maxDelta = this.maxDelta;
			event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
			event.time = time;
			event.step = Math.round(event.delta / (1000 / this.fps));
			this._handler(event);
		},
	 
		_getTime: function() {
			return ((this._now && this._now.call(window.performance)) || (new Date().getTime())) - this._startTime;
		},
	});

	return TickerFPS;

});
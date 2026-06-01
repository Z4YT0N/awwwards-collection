define([
    'underscore',
    'util/class',
    'util/spritesheet/ticker_fps'
], function(
    _,
    Class,
    TickerFPS
) {


	/**
     * Pure data-based utility for managing frame sequences
     */
    var FrameSequence = Class.extend({

        _state: undefined,
        _range: undefined,
        _currentIndex: 0,
        _isInfiniteLoop: false,
        _isTicking: false,
        _ticker: undefined,
        _handlers: undefined,
        _autoUpdate: undefined,
        _isFirstTick: false,



        /**
         * Constructor - fps is optional
         */
        initialize: function(totalFrames, fps, onFrame, onEnd, autoUpdate){

            _.bindAll(this, '_onTick', 'update');

            this._handlers = {
                onFrame: onFrame || function(){},
                onEnd: onEnd || function(){}
            };

            this._autoUpdate = autoUpdate === false ? false : true;

            this._state = {
                isPaused: true,
                isEnded: false,
                totalFrames: totalFrames,
                startFrame: 0,
                endFrame: totalFrames - 1,
                autoReverse: false,
                direction: 1,
                fps: fps || 60,
                currentFrame: 0,
                currentLoop: 0,
                maxLoops: 0,
            };

            // derived from state
            this._range = this._createRangeFromState(this._state);
            this._currentIndex = 0;
            this._isInfiniteLoop = false;
        },

        /**
         * Plays a sequence based on passed parameters
         * Passing 0 for 'loops' means infinite looping
         * 'autoreverse' defaults to false
         * 'forceUnidirectional' defaults to false
         */
        play: function(loops, start, end, autoReverse, forceUnidirectional){

            if(!inRange(start, 0, this._state.totalFrames - 1)){
                throw new Error('Start frame is out of bounds');
            }

            if(!inRange(end, 0, this._state.totalFrames - 1)){
                throw new Error('End frame is out of bounds');
            }

            this._state.isPaused = false;
            this._state.isEnded = false;
            this._state.maxLoops = loops;
            this._state.startFrame = start;
            this._state.endFrame = end;
            this._state.autoReverse = (autoReverse === undefined) ? false : autoReverse;
            this._state.direction = (forceUnidirectional === true) ? 1 : (start > end) ? -1 : 1;
            this._state.currentFrame = start;
            this._state.currentLoop = 0;
            
            this._range = this._createRangeFromState(this._state);
            this._currentIndex = 0;
            this._isInfiniteLoop = loops === 0;

            this._isFirstTick = true;

            this._startTicker();
        },

        reverse: function(){

            if(this._state.isEnded){
                return;
            }

            var oldStartFrame = this._state.startFrame;
            var isLeftSideOfRange = this._currentIndex <= this._range.length * 0.5;

            this._state.startFrame = this._state.endFrame;
            this._state.endFrame = oldStartFrame;
            this._state.direction = this._state.direction *= -1;

            this._range = this._createRangeFromState(this._state);
            this._currentIndex = isLeftSideOfRange ? this._range.indexOf(this._state.currentFrame) : this._range.lastIndexOf(this._state.currentFrame);
        },

        pause: function(){

        	this._isFirstTick = false;
            this._state.isPaused = true;
            this._stopTicker();
        },

        pauseAtFrame: function(frame){

            if(!inRange(frame, 0, this._state.totalFrames - 1)){
                throw new Error('Frame is out of bounds');
            }

            this._isFirstTick = false;
            this._state.isPaused = true;
            this._stopTicker();
            this._state.currentFrame = frame;
            this._handlers.onFrame(this._state.currentFrame);
        },

        resume: function(){

            if(this._state.isPaused && !this._state.isEnded){

                this._state.isPaused = false;
                this._startTicker();
            }
        },

        setFPS: function(fps){

            if(fps !== this._state.fps){

                this._state.fps = fps;

                if(this._isTicking){
                    this._stopTicker();
                    this._startTicker();
                }
            }
        },

        update: function(){

            if(this._isTicking && this._autoUpdate === false){
                this._ticker.update();
            }
        },

        getCurrentFrame: function(){
            return this._state.currentFrame;
        },

        // PRIVATE
        // -------

        _startTicker: function(){

            if(this._isTicking) {
                return;
            }
            this._isTicking = true;
            this._ticker = new TickerFPS(this._state.fps, this._onTick, this._autoUpdate);
        },

        _stopTicker: function(){

            if(!this._isTicking) {
                return;
            }
            this._isTicking = false;
	        this._ticker.destroy();
            this._ticker = undefined;
        },

        _onTick: function(e){

        	var delta = e.step;
        	var isFirstTick = this._isFirstTick;

        	// reset first tick
        	this._isFirstTick = false;

        	if(!isFirstTick){

        		// check for new loop
        		if(!inRange(this._currentIndex + delta, 0, this._range.length - 1)){

	        		this._state.currentLoop++;

	        		// when we've reached max loops, we can end the sequence
	        		if(this._state.currentLoop === this._state.maxLoops && !this._isInfiniteLoop) {

	                    // this is the end
	                    this._end();

	                    return;
	                }
	        	}

	        	// update our frame
        		this._updateFrame(delta);
        	}

        	// always trigger frame
        	this._handlers.onFrame(this._state.currentFrame);
        },

        _updateFrame: function(delta){

            this._currentIndex = (this._currentIndex + delta) % this._range.length;
            this._state.currentFrame = this._getFrameByIndex(this._range, this._currentIndex);
        },

        _end: function(){

        	this._stopTicker();

        	var previousIndex = this._currentIndex;

        	// the last frame should always be the last of the range, independent from frame step
			this._currentIndex = this._range.length - 1;

			// we only want to call the frame handler when there is an actual difference
			if(previousIndex !== this._currentIndex){
				this._state.currentFrame = this._getFrameByIndex(this._range, this._currentIndex);
            	this._handlers.onFrame(this._state.currentFrame);
			}

            this._state.isEnded = true;
            this._handlers.onEnd();
        },

        _createRangeFromState: function(state){
            return rangeMake(state.totalFrames, state.startFrame, state.endFrame, state.autoReverse, state.direction);
        },

        _getFrameByIndex: function(range, index){
            return range[index];
        }
    });
	

	

	// PURE HELPERS -----------------------------------


	/**
	 * Immutable array reverse
	 */
	function reverse(list){
		return list.concat().reverse();
	}


	/**
	 * Slightly modified slice that also takes range shifting into account
	 * Example: slice([0, 1, 2, 3, 4, 5], 4, 3) => [4, 5, 0, 1, 2];
	 */
	function slice(list, start, end){
		if(start >= end){
			list = list.slice(start).concat(list.slice(0, end));
		} else {
			list = list.slice(start, end);
		}

		return list;
	}

	/**
	 * Returns an array based on size
	 * Example: indexedList(5) => [0, 1, 2, 3, 4, 5]
	 */
	function indexedList(size){
		var list = [];
		for(var i = 0; i < size; i++){
			list.push(i);
		}
		return list;
	}


	/**
	 * Creates an array range based on the passed arguments
	 * Example: rangeMake(5, 0, 4, false, 1) => [0, 1, 2, 3, 4];
	 * Example: rangeMake(5, 4, 1, true, 1) => [4, 0, 1, 0];
	 */
	function rangeMake(size, start, end, autoReverse, direction){

		// provide default for direction setting
		direction = (direction === undefined) ? start < end ? 1 : -1 : direction;

		// create an indexed list to work with
		var range = indexedList(size);
		
		// reverse range if it's not unidirectional
		range = (direction === -1) ? reverse(range) : range;

		// grab start and end indices for range
		var startIndex = range.indexOf(start);
		var endIndex = range.indexOf(end);

		// create the range set
		range = slice(range, startIndex, endIndex + 1);

		// append the reversed set (without first and last index), when autoReverse is true
		range = (autoReverse) ? range.concat(reverse(range.slice(1, -1))) : range;

		return range;
	}


    /**
     * Checks if the passed value exists within a given range
     * (http://codegolf.stackexchange.com/questions/8649/shortest-code-to-check-if-a-number-is-in-a-range-in-javascript)
     */
    function inRange(value, min, max){
        return (value - min) * (value - max) <= 0;
    }



	// EXPORT ----------------------

    return FrameSequence;

});
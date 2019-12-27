/*
@@@@@@@t               i8@@@@@
@@@@@@f .tCLf1iii1t1i:  t@@@@@
@@@@@8  L@@@@@@@@@@@@@; i@@@@@
@@@@@@..@@@@@@@@@@@@@@; f@@@@@
@@@@@@i.i1t1f0@@8CfffCi.0@@@@@
@@@@@0.,.i;, ;Gt, :ii;t,@@@@@@
@@@@@8fGG0fLG:Ct10CGG0C;8@@@@@
@@@@@@@8@@8ffG@@ff0@@8G@@@@@@@
@@@@@@@@@C;C@@800L:L@@@@@@@@@@
@@@@@@@@8 ;00t,1LG1:8@@@@@@@@@
@@@@@@@@: it.:1t;18f,f@@@@@@@@
@0GCLti, ,:,. ,ifGfi::L0@@@@@@
:        .@L; .;1f00   .,:1f0@
          i8@G1t0@G:;       .;
            ,:i11:  :
*/

/**
 * Author: Thanh Tran - int3ractive.com
 * MIT License
 */

/*
 * WORDLEJS namespace
 */
var WORDLEJS = WORDLEJS || {};

(function() {
    /*
     * Rectangle class
     */
    WORDLEJS.Rectangle = function(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    };

    WORDLEJS.Rectangle.prototype = {
        constructor: WORDLEJS.Rectangle,

        getRight: function() {
            return this.x + this.width;
        },

        getBottom: function() {
            return this.y + this.height;
        },

        getCenterX: function() {
            return this.x + this.width / 2;
        },

        getCenterY: function() {
            return this.y + this.height / 2;
        },

        intersects: function(r2) {
            return !(
                r2.x > this.getRight() ||
                r2.getRight() < this.x ||
                r2.y > this.getBottom() ||
                r2.getBottom() < this.y
            );
        },

        toString: function() {
            return (
                "Rect: " + this.x + "x" + this.y + ":" + this.width + "x" + this.height
            );
        }
    };
})();

(function() {
    /*
     * Word class
     */
    WORDLEJS.Word = function(initObj) {
        if (!initObj) throw new Error("bad Word init");

        this.text = initObj.text || "";
        this.weight = initObj.weight;

        this.fontFamily = initObj.fontFamily || "sans-serif";
        this.fontSize = initObj.fontSize || 10;
        this.fillColor = initObj.fillColor; //Color
        this.strokeColor = initObj.strokeColor; //Color
        this.url = initObj.url;

        this.sprite = null; //considered later
        this.bounds = null; //bounds of the rendered text
        this._rotated = initObj.rotated;
    };

    WORDLEJS.Word.prototype = {
        constructor: WORDLEJS.Word,

        /**
         * Calculate the metrics and position of this word
         */
        calculate: function(ctx) {
            //
            var fontFamily = this.fontFamily,
                fontSize = this.fontSize,
                text = this.text,
                textMetrics,
                bounds,
                w,
                h,
                tx = 0, //translate x;
                ty = 0; //translate y;

            ctx.font = fontSize + "px " + fontFamily;

            textMetrics = ctx.measureText(text);
            //log(text + ': ' + textMetrics.width);

            if (this._rotated) {
                //case vertical
                w = fontSize;
                h = textMetrics.width;
            } else {
                //case horizontal
                w = textMetrics.width;
                h = fontSize;
            }
            //register point offset to center of rectangle
            tx = -w / 2;
            ty = -h / 2;

            bounds = new WORDLEJS.Rectangle(tx, ty, w, h);

            this.bounds = bounds;
        },

        renderText: function(container) {
            var bounds = this.bounds,
                text = this.text;

            var anchor = document.createElement("a"),
                s = anchor.style,
                xPos = bounds.x,
                yPos = bounds.y,
                fillColor = this.fillColor;
            anchor.href = this.url;
            anchor.target = "_blank";
            anchor.textContent = text;
            anchor.className = "word";
            s.color = "#" + fillColor;
            s.font =
                "normal normal " +
                this.fontSize +
                "px/" +
                this.fontSize +
                "px " +
                this.fontFamily;

            if (this._rotated) {
                //transform will be soon standardized
                /*
                s.webkitTransform = 'rotate(90deg)';
                s.MozTransform = 'rotate(90deg)';
                s.oTransform = 'rotate(90deg)';
                s.msTransform = 'rotate(90deg)';
                s.transform = 'rotate(90deg)';
                */
                //using CSS is safer since the property names in each browser are too different
                anchor.className += " rotated";

                //object is rotated at its center
                xPos = xPos - bounds.height / 2 + bounds.width / 2;
                yPos = yPos + bounds.height / 2 - bounds.width / 2;
            }
            s.left = xPos + "px";
            s.top = yPos + "px";
            //DEBUG:
            //s.background = 'rgba(99,0,99,0.5)';

            container.appendChild(anchor);
        },

        toString: function() {
            return this.text;
        }
    };
})();

(function() {
    /*
     * Wordle class
     */
    WORDLEJS.Wordle = function(elContainer) {
        var container = document.createElement("div");
        container.className = "wordle";
        elContainer.appendChild(container);

        var canvas = document.createElement("canvas");

        this.ctx = canvas.getContext("2d"); //canvas used to measure text only
        this.parent = elContainer;
        this.container = container;
    };

    WORDLEJS.Wordle.prototype = {
        //member
        biggestSize: 80,
        smallestSize: 12,
        words: null,
        dRadius: 10.0,
        dDeg: 10,
        sortType: "",
        allowRotate: true,
        ctx: null,
        container: null,
        center: null,
        current: null,
        first: null,
        wl: 0,
        startTime: 0,
        runTime: 0,
        curIdx: 0,
        keepCenter: false,
        urlPrefix: "https://94275.cn/?q=",

        //methods
        constructor: WORDLEJS.Wordle,

        setWords: function(arr, maxium) {
            var urlPrefix = this.urlPrefix;
            maxium = maxium || 100;
            this.words = [];

            for (var i = 0, il = arr.length; i < il; ++i) {
                var wordObject = arr[i];
                if (i >= maxium) {
                    break;
                }

                //trace( 'wordObject : ' + wordObject.text, wordObject.count );

                var w = {
                    text: wordObject.text,
                    weight: wordObject.count,
                    url: urlPrefix + wordObject.text,
                    //strokeColor: Random.getRandomColor(), //no use
                    fillColor: Random.getRandomColor(0x44, 0xff),
                    fontFamily: Random.getRandomBoolean() ? "sans-serif" : "serif",
                    rotated: Random.getRandomBoolean() // half chances of rotation
                };

                this.words.push(new WORDLEJS.Word(w));
            }
            trace(1, "Number of words: " + this.words.length);
        },

        /**
         * calculate words positions
         */
        doLayout: function() {
            var words = this.words,
                ctx = this.ctx,
                high = -Number.MAX_VALUE,
                low = Number.MAX_VALUE,
                w,
                wl = words.length,
                i;

            if (words.length <= 0) {
                log("no word to render");
                return;
            }

            //startTime = getTimer();

            switch (this.sortType) {
                case "a":
                    // sort from biggest to smallest
                    words.sort(function(w1, w2) {
                        return w2.weight - w1.weight;
                    });
                    break;

                case "b":
                    //sort from smallest to biggest
                    words.sort(function(w1, w2) {
                        return w1.weight - w2.weight;
                    });

                    break;
                case "c":
                    //sort by alphabet
                    words.sort(function(w1, w2) {
                        if (w1.text.toLowerCase() < w2.text.toLowerCase()) {
                            return -1;
                        } else if (w1.text.toLowerCase() > w2.text.toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    break;
                case "d":
                    //shuffle array
                    var randomSeq = Random.getRandomSequence(0, words.length - 1),
                        newArr = [];
                    for (i = 0; i < wl; i++) {
                        newArr[i] = words[randomSeq[i]];
                    }

                    this.words = words = newArr; //be careful with changing the variable pointer
                    break;

                default:
                //use the order in the words array
            }
            //trace( 'words : ' + words );

            for (i = 0; i < wl; i++) {
                w = words[i];
                //check for highest & lowest weight to scatter the font size accordingly
                high = high > w.weight ? high : w.weight;
                low = low < w.weight ? low : w.weight;
            }

            //calculate word metrics first
            for (i = 0; i < wl; i++) {
                w = words[i];
                w.fontSize =
                    (w.weight - low) / (high - low) * (this.biggestSize - this.smallestSize) +
                    this.smallestSize;
                w.calculate(ctx);
            }

            //start position
            this.center = { x: 0, y: 0 };
            this.curIdx = 1;
            this.wl = wl;

            words[0].renderText(this.container);

            this.layoutNextWord();
        },

        layoutNextWord: function() {
            var i,
                wl = this.wl,
                curIdx = this.curIdx;

            if (curIdx >= wl) {
                //TODO: maybe do some benchmark here

                return;
            }

            var words = this.words,
                current = words[curIdx],
                first = words[0],
                center = this.center,
                totalWeight = 0.0,
                prev,
                wPrev;
            //calculate current center
            center.x = 0;
            center.y = 0;

            //calculate the mass center of the wordle so far
            for (prev = 0; prev < curIdx; ++prev) {
                wPrev = words[prev];
                center.x += wPrev.bounds.getCenterX() * wPrev.weight;
                center.y += wPrev.bounds.getCenterY() * wPrev.weight;
                totalWeight += wPrev.weight;
            }
            center.x /= totalWeight;
            center.y /= totalWeight;
            //trace( 'center : ' + center );

            var bounds = current.bounds,
                done = false,
                radius = 0.5 * Math.min(first.bounds.width, first.bounds.height),
                startDeg,
                prev_x,
                prev_y,
                deg,
                rad,
                dDeg = this.dDeg,
                candidateBounds,
                container = this.container;

            var loopPrevent = 0;

            while (!done) {
                loopPrevent++;
                if (loopPrevent > 100000) {
                    log("maximum loop reach");
                    break;
                }

                startDeg = Math.floor(Math.random() * 360);
                //log('startDeg ' + startDeg);
                //loop over spiral
                prev_x = -1;
                prev_y = -1;

                for (deg = startDeg; deg < startDeg + 360; deg += dDeg) {
                    rad = deg / Math.PI * 180.0;
                    var cx = Math.floor(center.x + radius * Math.cos(rad));
                    var cy = Math.floor(center.y + radius * Math.sin(rad));

                    if (prev_x == cx && prev_y == cy) continue;

                    prev_x = cx;
                    prev_y = cy;
                    //log( 'cx,cy : ' + cx + cy );
                    //test:
                    //graphics.beginFill(0xFF0000, 0.5);
                    //graphics.drawCircle(cx, cy, 0.5);

                    candidateBounds = new WORDLEJS.Rectangle(
                        current.bounds.x + cx,
                        current.bounds.y + cy,
                        current.bounds.width,
                        current.bounds.height
                    );

                    //any collision ?
                    for (prev = 0; prev < curIdx; ++prev) {
                        if (candidateBounds.intersects(words[prev].bounds)) {
                            break;
                        }
                    }

                    //no collision: we're done
                    if (prev == curIdx) {
                        current.bounds = candidateBounds;
                        current.renderText(container);

                        trace(2, "Word rendered: " + current);
                        trace(
                            3,
                            "Mass center: " + parseInt(center.x, 10) + "x" + parseInt(center.y, 10)
                        );
                        if (this.keepCenter) {
                            container.style.marginLeft = -center.x + "px";
                            container.style.marginTop = -center.y + "px";
                        }

                        done = true;
                        break;
                    }
                }
                radius += this.dRadius;
            }
            //_layoutProgress.dispatch(current);
            this.curIdx++;

            requestAnimationFrame(this.layoutNextWord.bind(this));
        },

        reset: function() {
            var container = this.container;
            container.innerHTML = "";
            container.style.marginLeft = "0";
            container.style.marginTop = "0";
            this.words = null;
        }
    };
})();

//util

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console) {
        arguments.callee = arguments.callee.caller;
        var newarr = [].slice.call(arguments);
        (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
    }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

window.trace = function(line, str) {
    window.document.getElementById('line' + line).innerHTML = str;
};

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

                window.setTimeout( callback, 1000 / 60 );

            };

    } )();

}


/**
 * TextUtil
 */
var TextUtil = {
    countWordOccurance: function (text) {
        // Remove punctuations, non-word characters...
        //note: this case also remove Vietnamese unicode characters, improve later when needed
        text = text.replace(/[^A-Za-z0-9_\-\s]/g, '');

        var words = text.split(/\s+/),
            wordsObject = {},
            i, il, w;

        for (i = 0, il = words.length; i < il; i++) {
            w = words[i];

            if (wordsObject[w] && typeof(wordsObject[w]) === 'number') {
                wordsObject[w] ++;
            } else {
                wordsObject[w] = 1;
            }
        }

        //tranfer to array in order to sort
        var result = [];
        for (var item in wordsObject) {
            if(wordsObject.hasOwnProperty(item)) {
                result.push({ text: item, count:wordsObject[item] });
            }
        }

        //bigger count stay at top
        result.sort(function (wordA, wordB) {
            return wordB.count - wordA.count;
        });

        return result;
    }
};

/**
 * Random util
 */
var Random = {
    /**
     * Creates a randomized boolean
     * @return
     */
    getRandomBoolean: function () {
        return Math.random() >= 0.5;
    },

    /**
     * Return random color number as hex string; avoid dark color
     */
    getRandomColor: function (componentMin, componentMax) {
        return (this.getRandomInt(componentMin, componentMax).toString(16) +
            this.getRandomInt(componentMin, componentMax).toString(16) +
            this.getRandomInt(componentMin, componentMax).toString(16));
    },

    /**
     * Return a integer value within min - max (inclusive)
     */
    getRandomInt: function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    },

    /**
     * Get a random sequence
     */
    getRandomSequence: function (min, max) {
        var o = [], //original seq
            r = [], //result
            c, //child item
            l; //length
        if (min > max) {
            var tmp = max;
            max = min;
            min = tmp;
        }

        l = Math.abs(max - min) + 1;
        //log ('max: ' + max);
        //log('length: ' + l);
        //original sequence
        for (var i = 0; i < l; i ++) {
            o[i] = min + i;
            //log(o[i]);
        }

        while (true) {
            l = o.length;
            if (l > 0) {
                c = o.splice(this.getRandomInt(0,l - 1),1)[0];
                r.push(c);
            } else {
                break;
            }
        }
        log (r);
        return r;
    }
};

/* ============ MAIN SCRIPT ============== */
(function (win) {
    //global
    var doc = win.document,
        container = doc.getElementById('wordle-container'),
        wordle = new WORDLEJS.Wordle(container);

    var demo = {
        // text to render (with some preprositions already stripped)
        testText: 'all people created equal; they endowed by their Creator with certain inalienable Rights; among these Life, Liberty, pursuit Happiness. This immortal statement was made Declaration Independence United States America 1776. broader sense, this means: all peoples on earth equal from birth, all peoples have right live, be happy free. Declaration Rights Man Citizen French Revolution made 1791 also states: all men born free with equal rights, must always remain free have equal rights. Those undeniable truths. Nevertheless, for more than eighty years, French imperialists, name Liberty, Equality, Fraternity, have violated our Fatherland oppressed our fellow citizens. They have acted contrary ideals humanity justice. all people created equal; they endowed by their Creator with certain inalienable Rights; among these Life, Liberty, pursuit Happiness. This immortal statement was made Declaration Independence United States America 1776. broader sense, this means: all peoples on earth equal from birth, all peoples hav toe right live, be happy free. For these reasons, we, members of Provisional Government, representing whole Vietnamese people, declare that from now on we break off all relations of colonial character with France; we repeal all international obligation that France has so far subscribed on behalf of Viet-Nam, and we abolish all special rights French have unlawfully acquired our Fatherland. whole Vietnamese people, animated by common purpose, are determined fight bitter end against any attempt by French colonialists reconquer country.',
        wordsLimit: 200,

        renderWordle: function () {
            var sortResult = TextUtil.countWordOccurance(this.testText);

            wordle.reset();
            wordle.setWords(sortResult, this.wordsLimit);
            log('wordle sortType: ' + wordle.sortType);

            wordle.doLayout();
        },
    };


    var gui = new dat.GUI();
    gui.add(demo, 'testText');
    gui.add(demo, 'wordsLimit', [10, 50, 100, 200]);
    gui.add(wordle, 'urlPrefix');
    gui.add(wordle, 'keepCenter');
    gui.add(wordle, 'sortType', {'default': '', 'big -> small': 'a', 'small -> big': 'b', 'A -> Z': 'c', 'shuffle': 'd' });
    gui.add(demo, 'renderWordle');

    demo.renderWordle();
})(window);
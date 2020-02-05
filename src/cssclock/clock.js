/**[minimum JS only to set current time and sound the chimes]**/
(function() {
    'use strict';
    let	seconds = document.getElementById('second_time'),
        munutes = document.getElementById('minute_time'),
        hours = document.getElementById('hour_time'),
        s, m, h, S, M, H, time;

    /*[set the clock to correct time and let CSS handle the rest]*/
    function windup () {
        time = new Date(),
            s = time.getSeconds(),
            m = time.getMinutes(),
            h = time.getHours(),
            S = s * 6,
            M = m * 6 + s / 10,
            H = h * 30 + 0.5 * m;

        seconds.style.transform = 'rotate(' + S + 'deg)';
        munutes.style.transform = 'rotate(' + M + 'deg)';
        hours.style.transform = 'rotate(' + H + 'deg)';

        console.log('windup: ' + h + ':' + m + ':' + s);
        tick.volume = chime.volume = 1;
    }
    setTimeout(windup, 0);

    /*[main visibility API function]*/
    // use visibility API to check if current tab is active or not
    let vis = (function(){
        let stateKey,
            eventKey,
            keys = {
                hidden: 'visibilitychange',
                webkitHidden: 'webkitvisibilitychange',
                mozHidden: 'mozvisibilitychange',
                msHidden: 'msvisibilitychange'
            };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function(c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    })();

    /*[HTML5 Visibility API]****************************************/
    // check if current tab is active or not
    vis( function () {
        if (vis()) {
            setTimeout( function () {
                // tween resume() code goes here
                windup();
                console.log('tab is visible - has focus');
            }, 300);
        } else {
            // tween pause() code goes here
            console.log('tab is invisible - has blur');
            tick.volume = chime.volume = 0.1;
        }
    });

    // check if browser window has focus
    let notIE = (document.documentMode === undefined),
        isChromium = window.chrome;
    if (notIE && !isChromium) {
        // checks for Firefox and other  NON IE Chrome versions
        $(window).on('focusin', function () {
            // tween resume() code goes here
            setTimeout( function () {
                windup();
                console.log('focus');
            }, 300);
        }).on('focusout', function () {
            // tween pause() code goes here
            console.log('blur');
            tick.volume = chime.volume = 0.1;
        });
    } else {
        // checks for IE and Chromium versions
        if (window.addEventListener) {
            // bind focus event
            window.addEventListener('focus', function (event) {
                // tween resume() code goes here
                setTimeout( function () {
                    windup();
                    console.log('focus');
                },300);
            }, false);
            // bind blur event
            window.addEventListener('blur', function (event) {
                // tween pause() code goes here
                console.log('blur');
                tick.volume = chime.volume = 0.1;
            }, false);
        } else {
            // bind focus event
            window.attachEvent('focus', function (event) {
                // tween resume() code goes here
                setTimeout( function () {
                    windup();
                    console.log('focus');
                },300);
            });
            // bind focus event
            window.attachEvent('blur', function (event) {
                // tween pause() code goes here
                console.log('blur');
                tick.volume = chime.volume = 0.1;
            });
        }
    }
    /*[end HTML5 Visibility API]************************************/

    /*[hourly and quarterly chimes]*/
    const tick = document.getElementById('tick');
    const chime = document.getElementById('chime');
    const sound_dir = 'http://www.gerasimenko.com/sandbox/codepen/sounds/';

    let bell, tock = 'tock.wav';

    tick.src = sound_dir + tock;

    function hourly_chime(n) {
        console.log('plays left: ' + n);
        if (n === 0) {
            return;
        } else {
            chime.pause();
            chime.currentTime = 0;
            chime.play();
            n--;
            setTimeout( function () {
                hourly_chime(n);
            }, 3000);
        }
    }

    setInterval( function () {
        time = new Date(),
            s = time.getSeconds(),
            m = time.getMinutes(),
            h = time.getHours();

        console.log('watch: ' + h + ':' + m + ':' + s);
        tick.play();

        if (s === 0 && (m === 15 || m === 30 || m === 45)) {
            bell = 'ding-tone.wav';
            chime.src = sound_dir + bell;
            hourly_chime(m / 15);
        } else if (s === 0 && m === 0) {
            bell = 'bell-japanese.wav';
            chime.src = sound_dir + bell;
            h > 12 ? h = h - 12 : h;
            hourly_chime(h);
        }
    }, 1000);
})();

/*

	Bubble color picker
	By @Lewitje

	Have fun with it!

*/

var colorPicker = (function(){

    var config = {
        baseColors: [
            [46, 204, 113],
            [52, 152, 219],
            [155, 89, 182],
            [52, 73, 94],
            [241, 196, 15],
            [230, 126, 34],
            [231, 76, 60]
        ],
        lightModifier: 20,
        darkModifier: 0,
        transitionDuration: 200,
        transitionDelay: 25,
        variationTotal: 10
    };

    var state = {
        activeColor: [0, 0, 0]
    };

    function init(){
        createColorPicker(function(){
            appendBaseColors();
        });

        addEventListeners();

        setFirstColorActive(function(){
            setFirstModifiedColorActive();
        });
    }

    function setActiveBaseColor(el){
        $('.color.active').removeClass('active');
        el.addClass('active');
    }

    function setActiveColor(el){
        $('.color-var.active').removeClass('active');
        el.addClass('active');
        state.activeColor = el.data('color').split(',');
    }

    function addEventListeners(){
        $('body').on('click', '.color', function(){
            var color = $(this).data('color').split(',');
            setActiveBaseColor($(this));

            hideVariations(function(){
                createVariations(color, function(){
                    setDelays(function(){
                        showVariations();
                    });
                });
            });
        });

        $('body').on('click', '.color-var', function(){
            setActiveColor($(this));
            setBackgroundColor();
        });
    }

    function setFirstColorActive(callback){
        $('.color').eq(1).trigger('click');
        callback();
    }

    function setFirstModifiedColorActive(){
        setTimeout(function(){
            $('.color-var').eq(7).trigger('click');
        }, 500);
    }

    function createColorPicker(callback){
        $('.color-picker').append('<div class="base-colors"></div>');
        $('.color-picker').append('<div class="varied-colors"></div>');
        $('.color-picker').append('<div class="active-color"></div>');
        $('.color-picker').append('<div class="color-history"></div>');

        callback();
    }

    function appendBaseColors(){
        for(i = 0; i < config.baseColors.length; i++){
            $('.base-colors').append('<div class="color" data-color="' + config.baseColors[i].join() + '" style="background-color: rgb(' + config.baseColors[i].join() + ');"></div>');
        }
    };

    function setBackgroundColor(){
        $('body').css({
            'background-color': 'rgb(' + state.activeColor + ')'
        });
    }

    function createVariations(color, callback){
        $('.varied-colors').html('');

        for(var i = 0; i < config.variationTotal; i++){
            var newColor = [];

            for (var x = 0; x < color.length; x++){
                var modifiedColor = (Number(color[x]) - 100) + (config.lightModifier * i);

                if(modifiedColor <= 0){
                    modifiedColor = 0;
                } else if (modifiedColor >= 255){
                    modifiedColor = 255;
                }

                newColor.push(modifiedColor);
            }

            $('.varied-colors').append('<div data-color="' + newColor + '" class="color-var" style="background-color: rgb(' + newColor + ');"></div>');
        }

        callback();
    }

    function setDelays(callback){
        $('.color-var').each(function(x){
            $(this).css({
                'transition': 'transform ' + (config.transitionDuration / 1000) + 's ' + ((config.transitionDelay / 1000) * x) + 's'
            });
        });

        callback();
    }

    function showVariations(){
        setTimeout(function(){
            $('.color-var').addClass('visible');
        },(config.transitionDelay * config.variationTotal));
    }

    function hideVariations(callback){
        $('.color-var').removeClass('visible').removeClass('active');

        setTimeout(function(){
            callback();
        },(config.transitionDelay * config.variationTotal));
    }

    return{
        init: init
    };

}());

colorPicker.init();
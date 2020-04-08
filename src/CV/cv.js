$(function(){
    $('.list li:first-child').click(function(){
        window.setTimeout(function() {
            $('.profile').slideToggle();
        }, 300);
    });
    $('.list li:nth-child(2)').click(function(){
        window.setTimeout(function(){
            $('.trivia').slideToggle();
        },300);
    });
    $('.list li:nth-child(3)').click(function(){
        window.setTimeout(function(){
            $('.movies').slideToggle();
        },300);
    });
    $('.list li:nth-child(4)').click(function(){
        window.setTimeout(function(){
            $('.awards').slideToggle();
        }, 300);
    });
    $('.list li:nth-child(5)').click(function(){
        window.setTimeout(function(){
            $('.quotes').slideToggle();
        }, 300);
    });
    $('.btn-close').click(function(){
        $('.list-content').hide(300);
    });
});
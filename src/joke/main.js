const query = `
  query { 
    joke {
      joke
    }
  }
`;

function jokeLoad() {
    fetch(`https://icanhazdadjoke.com/graphql?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const {joke} = data.data.joke;
            $('.active').remove();
            if (joke.indexOf('?') > -1) {
                $(`
      <p data-splitting="words">${joke.substr(0, (joke + "?").indexOf("?")) + '?'}<b>${joke.substr(joke.lastIndexOf("?") + 1)}</b></p>
    `).appendTo('.inner').addClass('active');
            } else {
                $(`
      <p data-splitting="words">${joke}</p>
    `).appendTo('.inner').addClass('active');
            }

            Splitting();
            console.log(($('.active span').length / 6));
            document.documentElement.style.setProperty('--wordCount', (($('.active span').length / 6) + ($('.active span b').length * 4)));
        });
}

$('button').click(function () {
    jokeLoad();
    $('button').addClass('facepalm');
    setTimeout(function () {
        $('button').removeClass("facepalm");
    }, 1000);
});

$(document).ready(function () {
    jokeLoad();
});

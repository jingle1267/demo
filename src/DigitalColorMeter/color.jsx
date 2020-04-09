const { useState, useEffect } = React;

// Home
const App = () => {
    // demo image
    const sampleImg = document.querySelector("#demo").src;
    const [colors, setColors] = useState([]);

    // get params of mouse
    const getColorParams = (event, element, hasClick) => {
        let cords = getCords(event);
        let canvas = document.querySelector("#cs");
        let thumb = document.querySelector("img");

        useCanvas(canvas, thumb, () => {
            // get image data
            let params = canvas.getContext("2d");
            params = params.getImageData(cords.x, cords.y, 1, 1);
            params = params.data;
            // get color
            let bg = rgbToHex(params[0], params[1], params[2]);
            // if click push new color
            if (hasClick) setColors(colors => [...colors, bg]);
            // add background in body
            if (element) element.style.background = bg;
        });
    };

    useEffect(() => {
        const inputFile = document.querySelector("#image-input");
        const displayFile = document.querySelector("img");
        const preview = document.querySelector(".preview");
        // getnerate image on select file
        generateImage(inputFile, displayFile);
        // click function
        displayFile.addEventListener(
            "click",
            event => {
                getColorParams(event, false, true);
            },
            false
        );
        // preview function mousemove
        displayFile.addEventListener(
            "mousemove",
            event => {
                getColorParams(event, preview, false);
            },
            false
        );
    }, []);

    let num = 0;
    return (
        <div className="main">
        <div className="container">
        {colors
                    ? colors.map(item => {
                    let style = {
                        backgroundColor: item
                    };
                    return (
                        <div
                    key={++num}
                    style={style}
                    className="color">
                        <span>{item}</span>
                        </div>
                );
                })
                : ""}
        </div>
        <div className="container">
        <div className="preview"></div>
        <img src={sampleImg} id="image-display" alt="" />
        <input type="file" id="image-input" />
        <label for="image-input" id="fake">
        Chosse file
    </label>
    </div>
    <canvas id="cs"></canvas>
        </div>
);
};

ReactDOM.render(<App />, window.root);

/** Functions
 ----------------------------*/
// get cordinates of mouse
function getCords(cords) {
    let x = 0,
        y = 0;
    // chrome
    if (cords.offsetX) {
        x = cords.offsetX;
        y = cords.offsetY;
    }
    // firefox
    else if (cords.layerX) {
        x = cords.layerX;
        y = cords.layerY;
    }
    return { x, y };
}

// canvas function
function useCanvas(el, image, callback) {
    el.width = image.width; // img width
    el.height = image.height; // img height
    // draw image in canvas tag
    el.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
    return callback();
}
// rgb tox thex color
function rgbToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    r.length == 1 ? "0" + r : r;
    g.length == 1 ? "0" + g : g;
    b.length == 1 ? "0" + b : b;
    return "#" + r + g + b;
}
// generate image on file select
function generateImage(inputFile, displayFile) {
    // demo img
    let imgInput = inputFile,
        db = window.localStorage;

    // check if exists image-base64
    if (!db.getItem("image-base64")) {
        let t = setTimeout(() => {
            db.setItem("image-base64", displayFile.getAttribute("src"));
            clearTimeout(t);
        }, 100);
    }

    // Restore image src from local storage
    const updateUi = () => {
        var t = setTimeout(() => {
            displayFile.src = db.getItem("image-base64");
            clearTimeout(t);
        }, 200);
    };

    // on select file render image preview
    const bindUi = () => {
        imgInput.addEventListener(
            "change",
            function() {
                if (this.files.length) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        db.setItem("image-base64", e.target.result);
                        updateUi();
                    };
                    // generate image data uri
                    reader.readAsDataURL(this.files[0]);
                }
            },
            false
        );
    };

    // update firdst
    updateUi();
    // select file
    bindUi();
}

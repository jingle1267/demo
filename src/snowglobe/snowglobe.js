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

var sceneSize = 80;
var particles = [];
var diameter = 24;

// create illo
const illo = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas',
    zoom: 4,
    resize: 'fullscreen',
    rotate: { x: -Zdog.TAU/3 },
    onResize: function( width, height ) {
        this.zoom = Math.floor( Math.min( width, height ) / sceneSize );
    },
});

let hillGroup = new Zdog.Group({
    addTo: illo,
});


let domeSnow = new Zdog.Hemisphere({
    addTo: hillGroup,
    diameter: 50,
    stroke: false,
    color: '#e3f1f6',
    backface: '#fff',
});

let dome = new Zdog.Hemisphere({
    addTo: hillGroup,
    diameter: 50,
    // fill enabled by default
    // disable stroke for crisp edge
    stroke: false,
    color: 'rgba(227,241,246,0.5)',
    backface: 'rgba(227,241,246,0.5)',
    rotate: { y: Zdog.TAU/2},
    backface: false
});


let snowflake = new Zdog.Shape({
    addTo: hillGroup,
    // no path set, default to single point
    stroke: 1,
    color: 'white',
    translate: {z: -24}
});

//tree
let tree = new Zdog.Group({
    addTo: hillGroup,
    rotate: { y: Zdog.TAU/2},
    translate: { x: 15},
    backface: false
});


let firstCone = new Zdog.Cone({
    addTo: tree,
    diameter: 5,
    length: 5,
    stroke: false,
    color: '#072702',
    translate:{ y: 0, z:0, x:0},
});

let secondCone = new Zdog.Cone({
    addTo: tree,
    diameter: 5,
    length: 5,
    stroke: false,
    color: '#073600',
    translate:{ x:0, y: 0, z: 2 },
});


tree.copyGraph({
    translate: { x: -10, y: -15 }
});

tree.copyGraph({
    translate: { x: -17, y: 10 }
});

tree.copyGraph({
    translate: { x: 8, y: 15 }
});

let bush = new Zdog.Group({
    addTo: hillGroup,
    translate: { x: 15},
    backface: false,
    rotate: {y: Zdog.TAU/2},
    translate:{ z:0}
});

let firstBush = new Zdog.Hemisphere({
    addTo: bush,
    diameter: 4,
    length: 5,
    stroke: false,
    color: '#073600',
});

let secondBush = new Zdog.Hemisphere({
    addTo: bush,
    diameter: 3,
    length: 5,
    stroke: false,
    color: '#073600',
});

//tree end

var housewidth = 13;
var househeight = 15;
var housedepth = 10;

let houseGroup = new Zdog.Group({
    addTo: hillGroup,
    translate: {z: -5},
    rotate: { y: Zdog.TAU/2, /*z:-Zdog.TAU/6*/},
    backface: false
});

let house = new Zdog.Box({
    addTo: houseGroup,
    width: housewidth,
    height:  househeight,
    depth: housedepth,
    stroke: false,
    backface: '#6a5745',
    color: '#6a5745',
});

let curvedPathGroup = new Zdog.Group({
    addTo: houseGroup,
    translate: {z: -5},
    //rotate: { y: Zdog.TAU/2},
});

let curvedPath = new Zdog.Ellipse({
    addTo: curvedPathGroup,
    diameter: 5,
    height: 4,
    quarters: 2, // semi-circle
    translate: { x: -1, y: -10 },
    // rotate semi-circle to point up
    fill: true,
    color: '#c2dfe0',
    stroke: false,
});

curvedPath.copyGraph({
    translate: { x: 0, y: -13 },
    height: 7,
    rotate: { y: Zdog.TAU/2},
});

curvedPath.copyGraph({
    translate: { x: 0, y: -16.5 },
    height: 7,
});


let rock = new Zdog.Hemisphere({
    addTo: houseGroup,
    diameter: 2,
    stroke: false,
    color: 'dimgrey',
    backface: 'black',
    //rotate: { y: Zdog.TAU/2 },
    translate: {x: -2, y: -15, z: -5},
});

rock.copyGraph({
    translate: {x: 2, y: -16, z: -5}
});

rock.copyGraph({
    diameter: 1,
    translate: {x: 0, y: -20, z: -5}
});

rock.copyGraph({
    diameter: 1,
    translate: {x: 1.5, y: -10, z: -5}
});

rock.copyGraph({
    diameter: 1,
    translate: {x: 0.5, y: -13, z: -5}
});

rock.copyGraph({
    diameter: 1,
    translate: {x: -1, y: -10, z: -5}
});



let doorBlock = new Zdog.Box({
    addTo: houseGroup,
    width: housewidth/9,
    height:  househeight/2.5,
    depth: housedepth/1.5,
    stroke: false,
    backface: '#554231',
    color: '#554231',
    rotate: {z: Zdog.TAU/4},
    translate: {x:0, y: -(househeight/2)-0.5, z:-2},
});

let door = new Zdog.Box({
    addTo: doorBlock,
    width: 0.5,
    height: househeight/4,
    depth: housedepth/2,
    stroke: false,
    color: '#c7905a',
    translate: {x: -1, z: -1},
});

let doorTriangles = new Zdog.Shape({
    addTo: houseGroup,
    path: [
        //triangle
        { move: { x: housewidth/4, y: -househeight/1.5, z:  0 } },
        { x:  0, y:  -househeight/1.5 , z:  housedepth/3},
        { x:  -housewidth/4, y:  -househeight/1.5 , z:  0},
        { x:  housewidth/4, y:  -househeight/1.5 , z:  0},
        //second triangle
    ],
    fill: true,
    // closed by default
    stroke: 0,
    color: 'brown',
});

let doorRectangles = new Zdog.Shape({
    addTo: doorTriangles,
    path: [
        //roof border
        { move: { x: 0, y: -househeight/2.5, z:  housedepth/3.3}},
        { x:  0, y:  -househeight/1.43 , z:  housedepth/3.3},
        { x:  housewidth/3.3, y:  -househeight/1.43 , z:  0},
        { x:  housewidth/3.3, y:  -househeight/2.5 , z:  0},
        //right roof border
        { move: { x: 0, y: -househeight/2.5, z:  housedepth/3.3} },
        { x:  0, y:  -househeight/1.43 , z:  housedepth/3.3},
        { x:  -housewidth/3.3, y:  -househeight/1.43 , z:  0},
        { x:  -housewidth/3.3, y:  -househeight/2.5 , z:  0},
        //vertical rectangle divide
        /*{ move: { x: 0, y: 6, z:  housedepth } },
        { x:  0, y:  -2 , z:  housedepth},
        { x:  -2, y:  -2 , z:  housedepth/3},
        { x:  -2, y:  2 , z:  housedepth/3},*/
    ],
    fill: true,
    // closed by default
    stroke: 0.5,
    color: 'maroon',
});

let doorKnob = new Zdog.Hemisphere({
    addTo: door,
    diameter: 1,
    stroke: false,
    color: 'gold',
    backface: 'gold',
    backface: false
});


let houseWall = new Zdog.Rect({
    addTo: houseGroup,
    width: housewidth/1.01,
    height:  housedepth-1,
    color: "#6a5745",
    fill:true,
    stroke:false,
    rotate: {x: -Zdog.TAU/4},
    backface: false,
    translate: {x: 0, y: -househeight/2, z: -1}
});

let bottomChimney = new Zdog.Box({
    addTo: houseGroup,
    width: 5,
    height: 3,
    depth: 10,
    fill:true,
    color: '#66270a',
    stroke: 0.2,
    translate: {y: 9, z: 0}
});


let backhouseWall = new Zdog.Rect({
    addTo: houseGroup,
    width: housewidth/1.01,
    height:  housedepth-1,
    color: "#6a5745",
    fill:true,
    stroke:false,
    rotate: {x: Zdog.TAU/4},
    backface: false,
    translate: {x: 0, y: househeight/2, z: -1}
});

let backTriangleRoof = new Zdog.Shape({
    addTo: houseGroup,
    path: [{ move: { x: -housewidth/2.3, y: househeight/2, z:  housedepth/2 } },
        { x:  0, y:  househeight/2, z:  housedepth},
        { x:  housewidth/2.3, y:  househeight/2, z:  housedepth/2},
        { x:  -housewidth/2.3, y:  househeight/2, z:  housedepth/2}],
    fill: true,
    color: 'maroon'
});

let topChimney = new Zdog.Box({
    addTo: houseGroup,
    width: 3,
    height: 3,
    depth: 9,
    fill:true,
    color: '#742b09',
    stroke: 0.2,
    translate: {y: 9, z: 9}
});

let roofTriangles = new Zdog.Shape({
    addTo: houseGroup,
    path: [
        //triangle
        { move: { x: housewidth/2.3, y: -househeight/2, z:  housedepth/2 } },
        { x:  0, y:  -househeight/2 , z:  housedepth},
        { x:  -housewidth/2.3, y:  -househeight/2 , z:  housedepth/2},
        { x:  housewidth/2.3, y:  -househeight/2 , z:  housedepth/2},
    ],
    fill: true,
    // closed by default
    stroke: 0.5,
    color: 'brown',
});


let roofRectangles = new Zdog.Shape({
    addTo: roofTriangles,
    path: [
        //roof border
        { move: { x: 0, y: -househeight/2, z:  housedepth }},
        { x:  0, y:  househeight/2 , z:  housedepth},
        { x:  housewidth/1.8, y:  househeight/2 , z:  (housedepth/2)-1},
        { x:  housewidth/1.8, y:  -househeight/2 , z:  (housedepth/2)-1},
        //right roof border
        { move: { x: 0, y: househeight/2, z:  housedepth } },
        { x:  0, y:  -househeight/2 , z:  housedepth},
        { x:  -housewidth/1.8, y:  -househeight/2 , z:  (housedepth/2)-1},
        { x:  -housewidth/1.8, y:  househeight/2 , z:  (housedepth/2)-1},
        //vertical rectangle divide
        { move: { x: 0, y: househeight/2, z:  housedepth } },
        { x:  0, y:  -househeight/2 , z:  housedepth},
        { x:  -housewidth/1.8, y:  -househeight/2 , z:  (housedepth/2)-1},
        { x:  -housewidth/1.8, y:  househeight/2 , z:  (housedepth/2)-1},
    ],
    fill: true,
    // closed by default
    stroke: 0.5,
    color: '#6d1b01'
});

let chimneyUnderBorder = new Zdog.Box({
    addTo: houseGroup,
    width:3,
    height: 3,
    depth: 4,
    stroke: 0.5,
    translate: {y: 9, z: 12},
    color: '#8a6e54'
});

let chimneyBorder = new Zdog.Rect({
    addTo: houseGroup,
    width:3,
    height: 3,
    stroke: 0.5,
    translate: {y: 9, z: 14},
    color: 'white'
});

let circleWindow = new Zdog.Ellipse({
    addTo: houseGroup,
    diameter: 3.5,
    fill: true,
    color: 'gold',
    stroke: 'none',
    rotate: {x: Zdog.TAU/4},
    backface: false,
    translate: { y: -househeight/2, z: housedepth/2}
});

let circleBorder = new Zdog.Ellipse({
    addTo: houseGroup,
    diameter: 3.5,
    color: 'maroon',
    stroke: 0.5,
    rotate: {x: Zdog.TAU/4},
    backface: false,
    translate: { y: -househeight/2, z: housedepth/2}
});

let circleLine= new Zdog.Shape({
    addTo: circleWindow,
    path: [
        { x: -circleWindow.diameter/2 }, // start at 1st point
        { x:  circleWindow.diameter/2 }, // line to 2nd point
    ],
    stroke: 0.3,
    fill:true,
    backface: 'rgba(0,0,0,0)',
    //translate: {z: circlewindow.diameter*1.4, y: -(househeight/2)},
    color: '#6d1b01',
});

let circleLineV= new Zdog.Shape({
    addTo: circleWindow,
    path: [
        { z: -circleWindow.diameter/2 }, // start at 1st point
        { z:  circleWindow.diameter/2 }, // line to 2nd point
    ],
    stroke: 0.3,
    fill:true,
    backface: 'rgba(0,0,0,0)',
    rotate: {x: -Zdog.TAU/4, z: -Zdog.TAU/4},
    //translate: {z: circlewindow.diameter*1.4, y: -househeight/2},
    color: '#6d1b01',
});

let houseWindow = new Zdog.Rect({
    addTo: houseGroup,
    width: housewidth/5,
    height:  housewidth/5,
    color: 'gold',
    fill: true,
    stroke: false,
    backface: false,
    translate: {x: -housewidth/2, y: househeight/4},
    rotate: {y: Zdog.TAU/4}
});

let windowborder = new Zdog.Rect({
    addTo: houseWindow,
    width: houseWindow.width,
    height:  houseWindow.height,
    color: 'maroon',
    backface:false,
    fill: false,
    stroke: 0.2,
});

let windowlineV= new Zdog.Shape({
    addTo: houseWindow,
    path: [
        { x: -houseWindow.width/2 }, // start at 1st point
        { x:  houseWindow.width/2 }, // line to 2nd point
    ],
    stroke: 0.3,
    fill:true,
    backface: 'rgba(0,0,0,0)',
    //translate: {z: circlewindow.diameter*1.4, y: -(househeight/2)},
    color: 'purple',
});

let windowline= new Zdog.Shape({
    addTo: houseWindow,
    path: [
        { y: -houseWindow.height/2 },
        { y:  houseWindow.height/2 },
    ],
    stroke: 0.3,
    fill:true,
    backface: 'rgba(0,0,0,0)',
    color: 'purple',
});

houseWindow.copyGraph({
    translate: { x: -housewidth/2, y: -househeight/9 }
});

houseWindow.copyGraph({
    translate: { x: housewidth/2, y: -househeight/9 },
    rotate: {y: -Zdog.TAU/4}
});

houseWindow.copyGraph({
    translate: {x: housewidth/2, y: househeight/4},
    rotate: {y: -Zdog.TAU/4}
});


//snow
letitsnow = function(){

    if(this.translate.z < 0){
        this.translate.z += ((Math.random() * 0.3) + 0.1);
    }else{
        var tempx = this.translate.x;
        var tempy = this.translate.y;
        this.translate.z = -Math.abs(Math.sqrt(Math.pow(diameter,2) - Math.pow(tempy,2) - Math.pow(tempx,2)));
    }
}

function update(){
    for (var i = 0; i < particles.length; i++){
        letitsnow.call(particles[i]);
    }
}

particles.push(snowflake);

for (var i = 1; i < 30; i++){
    let tempSnow = snowflake.copyGraph({});

    do{
        tempSnow.translate.x = (Math.random()*(diameter*2)) - diameter;
        tempSnow.translate.y = (Math.random()*(diameter*2)) - diameter;
        tempx = tempSnow.translate.x;
        tempy = tempSnow.translate.y;
    }while(Math.pow(tempx,2) + Math.pow(tempy,2) > 576);
    tempSnow.translate.z = -Math.abs(Math.sqrt(Math.pow(diameter,2) - Math.pow(tempy,2) - Math.pow(tempx,2)));
    if(!(isNaN(tempSnow.translate.z))){
        particles.push(tempSnow);
    }

}

function animate() {
    illo.rotate.z -= 0.01;
    update();
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
}

animate();

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const CELL_SIZE = 10;

const NEUTRAL = 0;
const BLUE = 1;
const RED = 2;

const REDTILE = 'rgba(200,0,0,.5';
const BLUETILE = 'rgba(0,0,200,.5)';
const NEUTRALTILE = 'rgba(0,0,0,0)';

const WATER = 0;
const DESERT = 1;
const FOREST = 2;
const GRASS = 4;
const MOUNTAIN = 8;
const WHEAT = 16;
const DEBUGGER = 32;

//Mapping array indexes to binary multiples
var numbin = {0:1, 1:2, 2:4, 3:8, 4:16, 5:0, 6:32};

var loadedImagesCount = 0;
var imageNames = ["img/desert.png", "img/forest.png", "img/grass.png", "img/mountain.png", 
                  "img/wheat.png", "img/water.png", "img/debugger.png"];
var imagesArray = [];

for (var i = 0; i < imageNames.length; i++) {
    var image = new Image();
    image.src = imageNames[i];
    image.onload = function(){
        loadedImagesCount++;
        if (loadedImagesCount >= imageNames.length) {
            main();
        }
    }
    imagesArray[numbin[i]] = image;
}

function Cell(x, y, possession, terrain) {
	this.x = x;                        // location on x axis
	this.y = y;						   // location on y axis
	this.possession = possession;      // which player owns it 0,1,2 --> maybe change to binary for ease of manipulation
	this.terrain = terrain;            // terrain attribute on cell, probably should use binary 000001, 000010 , ... 100000
}

window.addEventListener( "keypress", doKeyDown, false );

function doKeyDown(e){
	console.log(e.keyCode);
	if(e.keyCode == 82 || e.keyCode == 114){
		drawInitMap();
	}
}

// PRE: x and y are index positions, color is constant (RED, BLUE, NEUTRAL)
function drawCell(x, y, color) {
	context.clearRect ( x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE );
	context.beginPath();
	context.rect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
	context.fillStyle = color;
	context.fill();
}

/* PRE: x and y are index positions, team is a constant */
function conquerCell(x, y, team) {
    if(team == RED){
        drawCell(x, y, REDTILE);
    }
    else if(team == BLUE){
        drawCell(x, y, BLUETILE);
    }
    else {
        drawCell(x, y, NEUTRALTILE);
    }
}

/* PRE: same as conquerCell(), w and h are index */
function conquerCells(x, y, w, h, team) {
	for(var i = 0; i < w; i++){
		for(var j = 0; j < h; j++){
			conquerCell(x+i, y+j, team);
		}
	}
}

function drawInitMap(){
	var map = drawMap();
	for(var x = 0; x < 80; x++){
		for(var y = 0; y < 50; y++) {
	        drawCell(x, y, NEUTRALTILE);
	        context.drawImage(imagesArray[map[x][y]], x*10, y*10);
		}
	}
}

var main = function(){

	/* Side bar */
	context.beginPath();
	context.rect(0, 0, 900, 500);
	context.fillStyle = '#ffffff';
	context.fill();

	drawInitMap();
    
	context.font = "bold 16px Arial";
	context.fillStyle = 'black';
	context.fillText("Buildings", 815, 20);
	context.beginPath();
	context.fillStyle = 'blue';
	context.font = "normal 10px Arial";
	context.fillText("Town Hall", 840, 42);
	context.drawImage(imagesArray[1], 815, 30);
    
	//window.setInterval(drawRed, INTERVAL);
}

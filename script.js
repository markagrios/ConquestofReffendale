var canvasbase = document.getElementById("canvasbase");
var contextbase = canvasbase.getContext("2d");

//var canvasmenu = document.getElementById("canvasmenu");
//var contextmenu = canvasmenu.getContext("2d");

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

var menu = false;

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

window.addEventListener("keydown", doKeyDown, false);

function doKeyDown(e){
	console.log(e.keyCode);
	if(e.keyCode == 82 || e.keyCode == 114){
		drawInitMap();
	}
	if(e.keyCode == 27) {
		if(menu){
			contextmenu.clear();
		} else {
			contextmenu.beginPath();
			contextmenu.rect(0, 0, 900, 500);
			contextmenu.fillStyle = '#ffffff';
			contextmenu.fill();
		}
		menu = !menu;
	}
}

// PRE: x and y are index positions, color is constant (RED, BLUE, NEUTRAL)
function drawCell(x, y, color) {
	contextbase.clearRect ( x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE );
	contextbase.beginPath();
	contextbase.rect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
	contextbase.fillStyle = color;
	contextbase.fill();
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
	        contextbase.drawImage(imagesArray[map[x][y]], x*10, y*10);
		}
	}
}

var main = function(){

	/* Side bar */
	contextbase.beginPath();
	contextbase.rect(0, 0, 900, 500);
	contextbase.fillStyle = '#ffffff';
	contextbase.fill();

	drawInitMap();
    
	contextbase.font = "bold 16px Arial";
	contextbase.fillStyle = 'black';
	contextbase.fillText("Buildings", 815, 20);
	contextbase.beginPath();
	contextbase.fillStyle = 'blue';
	contextbase.font = "normal 10px Arial";
	contextbase.fillText("Town Hall", 840, 42);
	contextbase.drawImage(imagesArray[1], 815, 30);
    
	//window.setInterval(drawRed, INTERVAL);
}

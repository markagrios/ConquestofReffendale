var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const CELL_SIZE = 10;
const NEUTRAL = 0;
const BLUE = 1;
const RED = 2;
const REDTILE = 'rgba(200,0,0,.5';
const BLUETILE = 'rgba(0,0,200,.5)';
const NEUTRALTILE = 'rgba(0,0,0,0)';
const DESERT = 0;				// hard to expand, no rm, minimal gold
const FOREST = 2;				// hard ish to expand, good rm, some gold
const GRASS = 4;				// easy to expand, some rm, some gold
const MOUNTAIN = 8;			    // hard to expand, good rm, good gold
const WHEAT = 16;				// easy ish to expand, great rm, good ish gold
const INTERVAL = 500;

var numbin = {0:1, 2:2, 3:4, 4:8, 5:16};

var rmoney;
var bmoney;
var rraw;
var braw;

var loadedImagesCount = 0;
var imageNames = ["img/gravel.png", "img/town_hall.png"];
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

var items = ['img/gravel.png',
             'img/town_hall.png'];

function Cell(x, y, possession, terrain) {
	this.x = x;                        // location on x axis
	this.y = y;						   // location on y axis
	this.possession = possession;      // which player owns it 0,1,2 --> maybe change to binary for ease of manipulation
	this.terrain = terrain;            // terrain attribute on cell, probably should use binary 000001, 000010 , ... 100000
}

function Building(){
	var gproduction;
	var rproduction;
}

/* Create 2D array for map cells */
var map = drawMap();
/*for(var i = 0; i < 80; i++){
    map[i] = [];
    for(var x = 0; x < 50; x++){
        map[i][x] = new Cell(i, x, NEUTRAL, DESERT);
    }
}*/
	
/* PRE: x and y are index positions, color is constant */
function drawCell(x, y, color) {
	context.clearRect ( x*10, y*10, 10, 10 );
	context.beginPath();
	context.rect(x*10, y*10, CELL_SIZE, CELL_SIZE);
	context.fillStyle = color;
	context.fill();
	for(var x = 0; x<80; x++){
		for(var y = 0; y < 50; y++){
			context.drawImage(imagesArray[map[x][y]], x*10, y*10);
		}
	}
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
var indexer = 0;
var drawRed = function() {
	conquerCell(indexer, indexer, RED);
	indexer++;
}
	
var main = function(){
	/* Side bar */
	context.beginPath();
	context.rect(0, 0, 900, 500);
	context.fillStyle = '#ffffff';
	context.fill();
	
	/* draw initial map */
	for(var x = 0; x < 80; x++){
		for(var y = 0; y < 50; y++) {
	        drawCell(x, y, "rgba(184,138,0,.5)");
	        context.drawImage(imagesArray[0], x*10, y*10);
		}
	}
	
	/* testing */
	for(var x = 0; x < 10; x++){
	    for(var y = 0; y < 10; y++){
	        conquerCell(x,y,BLUE);
	    }
	}
	
	for(var x = 70; x < 80; x++){
	    for(var y = 40; y < 50; y++){
	        conquerCell(x,y,RED);
	    }
	}
	
	conquerCell(50, 10, NEUTRAL);
	conquerCells(50, 10, 10, 20, BLUE);
	
	context.drawImage(imagesArray[1], 5, 5);
	context.drawImage(imagesArray[1], 775, 475);

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

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const CELL_SIZE = 10;
const RED = 'rgba(200,0,0,.5';
const BLUE = 'rgba(0,0,200,.5)';
const NEUTRAL = 'rgba(0,0,0,0)';
const DESERT = 1;				// hard to expand, no rm, minimal gold
const FOREST = 2;				// hard ish to expand, good rm, some gold
const GRASS = 4;				// easy to expand, some rm, some gold
const MOUNTAIN = 8;			    // hard to expand, good rm, good gold
const WHEAT = 16;				// easy ish to expand, great rm, good ish gold

/* Create 2D array for map cells */
var map = [];
for(var i = 0; i < 80; i++){
    map[i] = [];
}

var gravel = new Image();
var town_hall = new Image();
gravel.src = 'img/gravel.png';
town_hall.src = 'img/town_hall.png';

function Cell(x, y, possession, terrain) {
		this.x = x;                        // location on x axis
		this.y = y;						   // location on y axis
		this.possession = possession;      // which player owns it 0,1,2    --> maybe change to binary for ease of manipulation
		this.terrain = terrain;            // terrain attribute on cell, probably should use binary 000001, 000010 , ... 100000
}

town_hall.onload = function(){
	
/* PRE: x and y are index positions */
function drawCell(x, y, color) {
	context.beginPath();
	context.rect(x*10, y*10, CELL_SIZE, CELL_SIZE);
	context.fillStyle = color;
	context.fill();
}

function conquerCell(x, y, team) {
    if(team.localeCompare('r') == 0){
        drawCell(x, y, RED);
    }
    else if(team.localeCompare('b') == 0){
        drawCell(x, y, BLUE);
    }
    else {
        drawCell(x, y, NEUTRAL);
    }
}

function conquerCells(x, y, w, h, team) {
	for(var i = 0; i < w; i++){
		for(var j = 0; j < h; j++){
			conquerCell(x+i, y+j, team);
		}
	}
}

/* Side bar */
context.beginPath();
context.rect(800, 0, 100, 500);
context.fillStyle = '#000000';
context.fill();

/* draw initial map */
for(var x = 0; x < 80; x++){
	for(var y = 0; y < 50; y++) {
        drawCell(x, y, "rgba(184,138,0,.5)");
        map[x][y] = new Cell(x, y, 'g', DESERT);
        context.drawImage(gravel, x*10, y*10);
	}
}

/* testing */
for(var x = 0; x < 10; x++){
    for(var y = 0; y < 10; y++){
        conquerCell(x,y,'b');
    }
}

for(var x = 70; x < 80; x++){
    for(var y = 40; y < 50; y++){
        conquerCell(x,y,'r');
    }
}

conquerCell(50, 10, 'n');
conquerCells(50, 10, 10, 20, 'b');

context.drawImage(town_hall, 5, 5);
context.drawImage(town_hall, 775, 475)

}

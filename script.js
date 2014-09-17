var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const CELL_SIZE = 10;
const desert = 1;				// hard to expand, no rm, minimal gold
const forest = 2;				// hard ish to expand, good rm, some gold
const grass = 4;				// easy to expand, some rm, some gold
const mountain = 8;			    // hard to expand, good rm, good gold
const wheat = 16;				// easy ish to expand, great rm, good ish gold

/* Create 2D array for map cells */
var map = [];
for(var i = 0; i < 80; i++){
    map[i] = [];
}


var gravel = new Image();
gravel.src = 'gravel.png';

/* PRE: x and y are index positions */
function drawCell(x, y, color) {
	context.beginPath();
	context.rect(x*10, y*10, CELL_SIZE, CELL_SIZE);
	context.fillStyle = color;
	context.fill();
}

function conquerCell(x, y, team) {
    if(team.localeCompare('r') == 0){
        drawCell(x, y, 'rgba(255,0,0,.5');
    }
    else if(team.localeCompare('b') == 0){
        drawCell(x, y, 'rgba(0,0,255,.5)');
    }
    else {
        drawCell(x, y, 'rgba(0,0,0,0)');
    }
}


function Cell(){
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
        map[x][y] = new Cell();
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

/* Mark i copied your stuff, we need to merge it in */

var enough = 0;
while(enough != 0) {
		var x = Math.floor((Math.getRandomInt(0,800) / 10));		// x and y values for cell being placed
		var y = Math.floor((Math.getRandomInt(0,500) / 10));

		var t = 1 << (Math.getRandomInt(1,6));		// sets variable to power of 2
		enough |= t;												// ors x to enough. eg. if x is 000100 and enough is 010000 then enough |= x   is 010100
		// add
}


function cell(locX, locY, possession, terrain) {
		this.locX = locX;                           // location on x axis
		this.locY = locY;						   // location on y axis
		this.possession = possession;      // which player owns it 0,1,2    --> maybe change to binary for ease of manipulation
		this.terrain = terrain;                     // terrain attribute on cell, probably should use binary 000001, 000010 , ... 100000
}

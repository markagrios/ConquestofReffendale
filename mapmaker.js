var drawMap = function DrawMap() {

const XVAL = 0;
const YVAL = 1;
const TVAL = 2;

const WATER = 0;
const DESERT = 1;
const FOREST = 2;
const GRASS = 4;
const MOUNTAIN = 8;
const WHEAT = 16;

function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
}

function expand() {
	for(var i = 0; i < 200; i++) {			// arbitrary amount I need to define

		var dx = getRandomInt(-1,2);
		var dy = getRandomInt(-1,2);

	    console.log("icount: " + icount);
	    console.log("X before:" + initials[icount][XVAL]);
	    console.log("Y before:" + initials[icount][YVAL]);
		initials[icount][XVAL] += dx;	// increment x value of certain block
		initials[icount][YVAL] += dy;	// increment y value of certain block
		/*while(initials[icount][XVAL] < 0 || initials[icount][YVAL] < 0 || initials[icount][XVAL] > 80 || initials[icount][YVAL] > 50) {
			var dx = getRandomInt(-1,1);
			var dy = getRandomInt(-1,1);

			initials[icount][XVAL] += dx;	// increment x value of certain block
			initials[icount][YVAL] += dy;	// increment y value of certain block
		}*/
		console.log(initials[icount][XVAL]);
		console.log(initials[icount][YVAL]);
		//console.log(map[initials[icount][XVAL]][initials[icount][YVAL]]);
		//console.log(map[initials[icount][XVAL]][initials[icount][YVAL]]);
		while(typeof map[initials[icount][XVAL]][initials[icount][YVAL]] == 1) {	//enter loop if cell exists

			var dx = getRandomInt(-1,2);
			var dy = getRandomInt(-1,2);

			initials[icount][XVAL] += dx;
			initials[icount][YVAL] += dy;

		}
		map[initials[icount][XVAL]][initials[icount][YVAL]] = initials[icount][TVAL]; //assign terrain value to new cell
		
		/*icount++;
		if(icount == null) {				// loops back to first element if the next is null so it keeps cycling through
			icount = 0;
		}*/

	}
	
}


var map = [];
for(var i = 0; i < 80; i++) {
	map[i] = [];
}

var initials = [];
for(var i = 0; i < 25; i++) {		// need to sort out how many elements will be in initials
	initials[i] = [];
}

for(var x = 0; x < 80; x++) {
	for(var y = 0; y < 50; y++) {
		map[x][y] = WATER;
	}
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initializes random starting cells ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var enough = 0;
var icount = 0;
var t = 0;
var x = 0;
var y = 0;

while(enough < 31) {

	t = 0;

	x = (getRandomInt(0,80));	// x and y values for cell being placed
	y = (getRandomInt(0,50));
	t = 1 << (getRandomInt(0,5));			// sets variable to power of 2

	enough |= t;									// ors x to enough. eg. if x is 000100 and enough is 010000 then enough |= x   is 010100

	initials[icount][XVAL] = x;		// x value

	initials[icount][YVAL] = y;		// y value
	initials[icount][TVAL] = t;		// terrain value

	icount++;

	if(icount == 25) {
		break;
	}
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//console.log(initials[icount - 1][TVAL]);
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Places starting cells ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
for(icount--; icount >= 0; icount--) {
	map[initials[icount][XVAL]][initials[icount][YVAL]] = initials[icount][TVAL];
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EXPAND FROM INITIAL CELLS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*
 * there should be two chosen directions and eight possible outcomes.
 * If the two directions are equal then the outcome will be up,down,left,right.
 * If different it should be sum of the two (diagonals)
 */

/*
 * Starts at initials block's coordinates, looks at random adjacent cell and if null, fill in with terrain.
 * If not null, move observation point to chosen adjacent cell.
 */
icount = 0;
for(var i = 0; i < 5; i++) {
	expand();
	icount++;
}
/*
var check = "";
for(var q = 0; q < 80; q++){
	for(var w = 0; w < 50; w++){
		if(typeof map[q][w] === 'undefined'){
			check += "u" + " ";
		} else {
		check += map[q][w] + " ";
		}
	}
	check += "\n";
}
console.log(check);
*/
return map;
}

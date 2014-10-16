var drawMap = function DrawMap() {

const xVal = 0;
const yVal = 1;
const tVal = 2;
const DESERT = 1;
const FOREST = 2;
const GRASS = 4;
const MOUNTAIN = 8;
const WHEAT = 16;

function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
}

var map = [];
for(var i = 0; i < 80; i++) {
	map[i] = [];
}

var initials = [];
for(var i = 0; i < 25; i++) {		// need to sort out how many elements will be in initials
	initials[i] = [];
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initializes random starting cells ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var enough = 0;
var icount = 0;

while(enough != 31) {

	var t = 0;

	var x = (getRandomInt(0,80));	// x and y values for cell being placed
	var y = (getRandomInt(0,50));
	var t = 1 << (getRandomInt(0,5));			// sets variable to power of 2
	
	enough |= t;									// ors x to enough. eg. if x is 000100 and enough is 010000 then enough |= x   is 010100

	initials[icount][xVal] = x;		// x value
	initials[icount][yVal] = y;		// y value
	initials[icount][tVal] = t;		// terrain value

	icount++;
	if(icount > 24) {
			break;
	}
	//console.log(icount);
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//console.log(initials[icount - 1][tVal]);
icount--;
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Places starting cells ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
for(icount; icount >= 0 ; icount--) {
	map[initials[icount][xVal]][initials[icount][yVal]] = initials[icount][tVal];
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
for(var i = 0; i < 100; i++) {			// arbitrary amount I need to define
	
	var dx = getRandomInt(-1,1);
	var dy = getRandomInt(-1,1);

	icount = 0;
	initials[icount][xVal] += dx;	// increment x value of certain block
	initials[icount][yVal] += dy;	// increment y value of certain block
	/*while(initials[icount][xVal] < 0 || initials[icount][yVal] < 0 || initials[icount][xVal] > 80 || initials[icount][yVal] > 50) {
		var dx = getRandomInt(-1,1);
		var dy = getRandomInt(-1,1);
		
		initials[icount][xVal] += dx;	// increment x value of certain block
		initials[icount][yVal] += dy;	// increment y value of certain block
	}*/
	//console.log(initials[icount][xVal]);
	//console.log(initials[icount][yVal]);
	//console.log(map[initials[icount][xVal]][initials[icount][yVal]]);
	while(map[initials[icount][xVal]][initials[icount][yVal]] != null) {	//enter loop if something is there		
		var dx = getRandomInt(-1,1);
		var dy = getRandomInt(-1,1);
		
		initials[icount][xVal] += dx;
		initials[icount][yVal] += dy;
	}
	map[initials[icount][xVal]][initials[icount][yVal]] = initials[icount][tVal]; //assign terrain value to new cell
	
	icount++;	
	if(icount + 1 == null) {				// loops back to first element if the next is null so it keeps cycling through
		icount = 0;
	}
}

return map;
}

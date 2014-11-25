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
const DEBUGGER = 32;

function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
}

/* MAYBE NOT EVEN NECESSARY
function fix(x,y,t) {	//looks at cell, fills it with what is around it. 
		if(map[x][y] > 0) {
				return;
		}
		// what do if cell is in middle of ocean?
}
*/

function fill(x, y, t) {
	
	if(x < 0 || y < 0) {
		return;
	}
	
	if(map[x][y] > 0) {
		t = map[x][y];
		return;
	}	
	
	if(map[x][y] == 0) {
		map[x][y] = t;
		console.log(x +","+ y);
	}
	
		if((x+1 >= 0 && y >= 0) && (x >= 0 && y+1 >= 0)) { // if 2 perpendicular adjacent cells are defined
		if(map[x+1][y] > 0 && map[x][y+1] > 0) {    // if 2 perpendicular cells are occupied
			fill(x-1,y-1,t); // fill() the opposite cases.
			return;
		}
		}
		if((x >= 0 && y+1 >= 0) && (x-1 >= 0 && y >= 0)) {
		if(map[x][y-1] > 0 && map[x+1][y] > 0) {
			fill(x-1,y+1,t);
			return;
		}
		}
		if((x-1 >= 0 && y >= 0) && (x >= 0 && y-1 >= 0)) {
		if(map[x+1][y] > 0 && map[x][y+1] > 0) {
			fill(x-1,y-1,t);
			return;
		}
		}
	
	fill(x-1, y-1, t);
	fill(x-1, y, t);
	fill(x-1, y+1, t);
	fill(x, y-1, t);
	fill(x, y+1, t);
	fill(x+1, y-1, t);
	fill(x+1, y, t);
	fill(x+1, y+1, t);

	t = map[x][y];
}


function expand() {
	for(var i = 0; i < 5500; i++) {			// arbitrary amount I need to define

		var dx = getRandomInt(-1,2);
		var dy = getRandomInt(-1,2);
		
		var old = map[initials[icount][XVAL]][initials[icount][YVAL]];
		
	    //console.log("icount: " + icount);
	    //console.log("X before:" + initials[icount][XVAL]);
	    //console.log("Y before:" + initials[icount][YVAL]);
		initials[icount][XVAL] += dx;	// increment x value of certain block
		initials[icount][YVAL] += dy;	// increment y value of certain block

		if(initials[icount][XVAL] < 0) {
			initials[icount][XVAL] = 79;
		}
		if(initials[icount][XVAL] > 79) {
			initials[icount][XVAL] = 0;
		}
		if(initials[icount][YVAL] < 0) {
			initials[icount][XVAL] = 49;
		}
		if(initials[icount][YVAL] > 49) {
			initials[icount][XVAL] = 0;
		}
		
		//console.log(initials[icount][XVAL]);
		//console.log(initials[icount][YVAL]);		
		//console.log(old);
		
		while(typeof map[initials[icount][XVAL]][initials[icount][YVAL]] > WATER) {	//enter loop if cell exists

			var dx = getRandomInt(-1,1);
			var dy = getRandomInt(-1,1);

			initials[icount][XVAL] += dx;
			initials[icount][YVAL] += dy;

		}
		map[initials[icount][XVAL]][initials[icount][YVAL]] = initials[icount][TVAL]; //assign terrain value to new cell
		/*
		initials[icount][XVAL] += 2*dx;
		initials[icount][YVAL] += 2*dy;
		map[initials[icount][XVAL]][initials[icount][YVAL]] = initials[icount][TVAL]; //assign terrain value to new cell
		*/
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
	t = 1 << (getRandomInt(0,5));		// sets variable to power of 2

	enough |= t;						// ors x to enough. eg. if x is 000100 and enough is 010000 then enough |= x   is 010100

	initials[icount][XVAL] = x;		// x value

	initials[icount][YVAL] = y;		// y value
	initials[icount][TVAL] = t;		// terrain value

	icount++;
	icountAmount = icount;
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
for(var i = 0; i < icountAmount; i++) {
	expand();
	icount++;
}

t = 1 << (getRandomInt(0,5));

/*for(var x = 0; x < 80; x++) {
	for(var y = 0; y < 50; y++) {
		fill(x,y,t);
	}
}*/
//fill(0,0,DEBUGGER);

return map;
}

var drawMap = function DrawMap() {

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
	var t = 1 << (getRandomInt(1,6));			// sets variable to power of 2
	
	enough |= t;									// ors x to enough. eg. if x is 000100 and enough is 010000 then enough |= x   is 010100

	initials[icount][0] = x;		// x value
	initials[icount][1] = y;		// y value
	initials[icount][2] = t;		// terrain value

	icount++;

}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
console.log(initials[icount][2]);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Places starting cells ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//var currentCell = 0;
for(; icount >= 0 ; icount--) {
	map[initials[icount][0]][initials[icount][1]] = initials[icount][2];

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
for(var i = 0; i < 100000000; i++) {			// arbitrary amount I need to define
	
	var dxi = getRandomInt(-1,1);
	var dyi = getRandomInt(-1,1);
	
	var dx = 0;
	var dy = 0;
	while((map[initials[icount][0+dx][initials[icount[1+dy]]]] != null) || (map[initials[icount][0+dxi][initials[icount[1+dyi]]]] != null)) {

		if(map[initials[icount][0+dx][initials[icount[1+dy]]]] == null) {
			map[initials[icount][0+dx][initials[icount[1+dy]]]] = initials[icount[2]];
		}
		else {
			
			initials[icount][0] += dxi;
			initials[icount][1] += dyi;
			
			dx = Math.getRandomInt(-1,1);
			dy = Math.getRandomInt(-1,1);
			
		}
		
	}	
	icount++;	
	if(icount + 1 == null) {				// loops back to first element if the next is null so it keeps cycling through
		icount = 0;
	}
}

	return map;
}

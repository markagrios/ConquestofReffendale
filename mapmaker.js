const DESERT = 1;
const FOREST = 2;
const GRASS = 4;
const MOUNTAIN = 8;
const WHEAT = 16;


var map = [];
for(var i = 0; i < 80; i++) {		// how is this 2D?...
	map[i] = [];
}

var initials = [];
for(var i = 0; i < 10; i++) {		// need to sort out how many elements will be in initials
	initials[i] = [];
}


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initializes random starting cells ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var enough = 0;
var icount = 0;

while(enough != 31) {

	var t = 0;


	var x = (Math.getRandomInt(0,80));	// x and y values for cell being placed
	var y = (Math.getRandomInt(0,50));


	var t = 1 << (Math.getRandomInt(1,6));			// sets variable to power of 2
	enough |= t;		// ors x to enough. eg. if x is 000100 and enough is 010000 then enough |= x   is 010100

	initials[icount][0] = x;		// x value
	initials[icount][1] = y;		// y value
	initials[icount][2] = t;		// terrain value

	icount++;


}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Places starting cells ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//var currentCell = 0;
for(icount; icount > 0 ; i--) {

	map[initials[icount][0]][initials[icount][1]] = initials[icount][2];									// cryptic as fuck....

}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/





















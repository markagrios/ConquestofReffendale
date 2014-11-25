var drawMap = function DrawMap() {

const XVAL = 0;
const YVAL = 1;
const TVAL = 2;	
	
const DESERT = 1;	//---> mountain
const FOREST = 2;   //---> grass, wheat, mountain
const GRASS = 4;    //---> forest, wheat
const MOUNTAIN = 8; //---> forest, desert
const WHEAT = 16;   //---> grass, forest


var map = [];
for(var i = 0; i < 80; i++) {
	map[i] = [];
}

function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
}

function makeCell(currentT) {
	var terrain;
	var num = getRandomInt(1,100);
	
if(currentT == DESERT) { //---> mountain
	if(num < 70) {
		terrain = currentT;
	}
	if(70 <= num <= 100) {
		terrain = MOUNTAIN;
	}
}
if(currentT == FOREST) { //---> grass, wheat, mountain
	if(num < 60) {
		terrain = currentT;
	}
	if(60 <= num <= 80) {
		terrain = GRASS;
	}
	if(80 <= num <= 90) {
		terrain = WHEAT;
	}
	if(90 <= num <= 100) {
		terrain = MOUNTAIN;
	}
}
if(currentT == GRASS) { //---> forest, wheat
	if(num < 60) {
		terrain = currentT;
	}
	if(60 <= num <= 80) {
		terrain = FOREST;
	}
	if(80 <= num <= 100) {
		terrain = WHEAT;
	}
}
if(currentT == MOUNTAIN) { //---> forest, desert
	if(num < 60) {
		terrain = currentT;
	}
	if(60 <= num <= 80) {
		terrain = FOREST;
	}
	if(80 <= num <= 100) {
		terrain = DESERT;
	}
}	
if(currentT == WHEAT) { //---> grass, forest
	if(num < 60) {
		terrain = currentT;
	}
	if(60 <= num <= 80) {
		terrain = GRASS;
	}
	if(80 <= num <= 100) {
		terrain = FOREST;
	}
}	

return terrain;
}

/******************************************************/
var initialT = 1 << (getRandomInt(0,5));
map[0][0] = initialT;

for(var x = 0; x < 80; x++) {
	for(var y = 0; y < 50; y++) {
		makeCell(map[x][y]);
	}
}	


return map;
}

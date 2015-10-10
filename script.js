var canvasbase = document.getElementById("canvasbase");
var contextbase = canvasbase.getContext("2d");

var canvasmenu = document.getElementById("canvasmenu");
var contextmenu = canvasmenu.getContext("2d");

var map = drawMap();
var selected_building = -1;
var setup = true;

const gold_count = 0;
const resources_count = 1;
const pop_count = 2;

var redStuff = [0,0,0];
var blueStuff = [0,0,0];

const castle_count = 0;
const f_count = 1;
const c_count = 2;
const t_count = 3;
const b_count = 4;
const s_count = 5;

var redBuildings = [0,0,0,0,0,0];
var blueBuildings = [0,0,0,0,0,0];

var buildingRadii = [8,3,4,3,2,0];

var who_turn = 1; //1 for red, 2 for blue

const CELL_SIZE = 10;
const MAP_WIDTH = 80;
const MAP_HEIGHT = 50;

const NEUTRAL = 0;
const RED = 1;
const BLUE = 2;

const REDTILE = 'rgba(200,0,0,.3';
const BLUETILE = 'rgba(0,0,200,.3)';
const NEUTRALTILE = 'rgba(0,0,0,0)';

const WATER = 0;
const DESERT = 1;
const FOREST = 2;
const GRASS = 3;
const MOUNTAIN = 4;
const PLAIN = 5;
const DEBUGGER = 6;

const CASTLE = 0;
const FACTORY = 1;
const CITY = 2;
const TOWN = 3;
const BARRACK = 4;
const SOLDIER = 5;

var gPrices = [0,150,120,80,80,140]; //prices in gold for the structures.
var rPrices = [0,20,10,4,15,20];    //prices in resources for the structures.
var costMultpliers = [1,1.25,1.5,1.2,1.75,1.2]; //each of the terrain has a multiplier for how much it costs to build on it
var gYieldMultipliers = [2,1.5,2,2.5,.75,1]; //each building has a multiplier for how much gold it produces.
var rYieldMultipliers = [2,2.75,1.75,1,.75,1]; //each building has a multiplier for how much resources it produces.

const factory_btn = 70;
const city_btn = 67;
const town_btn = 84;
const barrack_btn = 66;
const soldier_btn = 83;

var menu = true;
/*
var map = [[]];

for(var i = 0; i < 80; i++) {
    map[i] = [];
}*/

//console.log(map);

//Mapping array indexes to binary multiples
var numbin = {0:1, 1:2, 2:4, 3:8, 4:16, 5:0, 6:32, 7:3};

var loadedImagesCount = 0;

var imageNames = ["img/desert.png", "img/forest.png", "img/grass.png", "img/mountain.png",
                  "img/wheat.png", "img/water.png", "img/debugger.png", "img/castle.png", "img/city.png", "img/town.png",
                  "img/barracks.png", "img/factory.png", "img/soldier.png"];
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

var numbin = {0:1, 1:2, 2:4, 3:8, 4:16, 5:0, 6:32, 7:3};
var loadedImagesCount = 0;

var structureNames = ["img/castle.png", "img/factory.png",  "img/city.png", "img/town.png", 
						"img/barracks.png", "img/soldier.png"];                  
var structureArray = [];
/*
for (var i = 0; i < structureNames.length; i++) {
    var image = new Image();
    image.src = imageNames[i];
    image.onload = function(){
        loadedImagesCount++;
        if (loadedImagesCount >= structureNames.length) {
            main();
        }
    }
    structureArray[numbin[i]] = image;
}
*/

function binConvert(x) {
	switch(x) {
		case 0:
			return 0;
			break;
		case 1: 
			return 1;
			break;
		case 2:
			return 2;
			break;
		case 4:
			return 3;
			break;
		case 8:
			return 4;
			break;
		case 16:
			return 5;
			break;
		default:
			return;
			break;
	}
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

	switch(e.keyCode) {
		case 82: 
			drawInitMap();
			break;
		case 114:
			drawInitMap();
			break;
		case 13: 
			runTurn();
			break;
		case 27: 
			/*
			contextbase.beginPath();
			contextbase.rect(0, 0, 900, 500);
			contextbase.fillStyle = 'rgba(0,0,0,.5)';
			contextbase.fill();
			*/
			break;
		case factory_btn:
			selected_building = FACTORY;
			break;
		case city_btn:
			selected_building = CITY;
			break;
		case town_btn:
			selected_building = TOWN;
			break;
		case barrack_btn:
			selected_building = BARRACK;
			break;
		case soldier_btn:
			selected_building = SOLDIER;
			break;
		default:
			break;
	}
}

// PRE: x and y are index positions, color is constant (RED, BLUE, NEUTRAL)
function drawCell(x, y, color) {
	contextbase.clearRect ( x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE );
	contextbase.beginPath();
	contextbase.rect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
	contextbase.fillStyle = color;
    cell = map[x][y];
	contextbase.drawImage(imagesArray[cell.terrain], x*CELL_SIZE, y*CELL_SIZE);
    contextbase.fill();
}

/* PRE: x and y are index positions, team is a constant */
function conquerCell(x, y, team) {
    //if(map[x][y] != NEUTRAL) {console.log("already conquered"); return;}
    if(team == RED){
        contextbase.fillStyle = "rgba(255,0,0,.3)";
		contextbase.fillRect(x*10,y*10,10,10);
		map[x*10][y*10].possession = RED;
    }
    else if(team == BLUE){
        contextbase.fillStyle = "rgba(0,0,255,.3)";
		contextbase.fillRect(x*10,y*10,10,10);
		map[x*10][y*10].possession = BLUE;
    }
    else {
        //drawCell(x, y, NEUTRALTILE);
        console.log("?");
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

function addTerritory(upleftx, uplefty, bottomrightx, bottomrighty, team) {
	map[x][y].possession = team;
}

function putBuilding(building, x, y) {
	console.log(map[x][y]);
	if(map[x][y] === WATER) {
		return;
	}
	var img = new Image();
	img.src = structureNames[building];
	contextbase.drawImage(img, x*10, y*10);
	
	if(who_turn == RED) {
		//check to see if enough stuff to make
		redStuff[gold_count] -= gPrices[building];
		redStuff[resources_count] -= rPrices[building];

		redBuildings[building]++;

		conquerCells(x+3,y-3,x-3,y+3,RED);
		console.log("conquer?");
	}
	if(who_turn == BLUE) {
		//check to see if enough stuff to make
		blueStuff[gold_count] -= gPrices[building];
		blueStuff[resources_count] -= rPrices[building];		
		
		blueBuildings[building]++;

	}	
}

function drawInitMap(){
	var terrain = drawMap();
	while(!checkMap(terrain)) {
		terrain = drawMap();
		//console.log("it is " + checkMap(terrain));
	}

	for(var x = 0; x < 80; x++){
		for(var y = 0; y < 50; y++) {
            map[x][y] = new Cell(x, y, NEUTRAL, terrain[x][y]);
	        drawCell(x, y, NEUTRALTILE);
		}
	}
}

function checkMap(map) {
	const maparea = 6400;
	const acceptable = 1600;
	var terrainCount = [0, 0, 0, 0, 0];
	
	for(var i = 0; i < 80; i++) {
		for(var j = 0; j < 80; j++) {
			switch(map[i][j]) {
				case MOUNTAIN: 
					terrainCount[0]++;
					break;
				case DESERT:
					terrainCount[1]++;
					break;
				case WATER:
					terrainCount[2]++;
					break;
				case PLAIN:
					terrainCount[3]++;
					break;
				case GRASS:
					terrainCount[4]++;
					break;
				case FOREST:
					terrainCount[5]++;
					break;
				default:
					break;
			}
		}
	}
	//console.log(terrainCount[0]);
	//console.log(terrainCount[1]);
	//console.log(terrainCount[2]);
	//console.log(terrainCount[3]);
	//console.log(terrainCount[4]);
	//console.log("------------");
	
	
	if((terrainCount[0] > acceptable) || (terrainCount[1] > acceptable) || (terrainCount[2] > acceptable) || (terrainCount[3] > acceptable) || (terrainCount[4] > acceptable)) {
		return false;
	} else {
		return true;
	}
	
}

function displayCoord(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
        x: Math.round((event.clientX - rect.left)/CELL_SIZE),
		y: Math.round((event.clientY - rect.top)/CELL_SIZE)	
	}
}

canvasmenu.addEventListener("mousemove", function (event) {
	var mousePos = displayCoord(canvasmenu, event);
	var message = (mousePos.x)+ ',' + (mousePos.y);
	//console.log(message);
	//console.log(map[mousePos.x][mousePos.y]);
});
canvasmenu.addEventListener("mousedown", function (event) {
	var mousePos = displayCoord(canvasmenu, event);
	putBuilding(selected_building, mousePos.x - 1, mousePos.y - 1);
	
});

function runTurn() {
	//night time sequence
	
	document.getElementById("redGold").innerHTML = redStuff[gold_count];
	document.getElementById("redResources").innerHTML = redStuff[resources_count];
	document.getElementById("redPop").innerHTML = redStuff[pop_count];

	document.getElementById("blueGold").innerHTML = blueStuff[gold_count];
	document.getElementById("blueResources").innerHTML = blueStuff[resources_count];
	document.getElementById("bluePop").innerHTML = blueStuff[pop_count];
	
	document.getElementById("redFactoryCount").innerHTML = redBuildings[f_count];
	document.getElementById("redCityCount").innerHTML = redBuildings[c_count];
	document.getElementById("redTownCount").innerHTML = redBuildings[t_count];
	document.getElementById("redBarrackCount").innerHTML = redBuildings[b_count];
	document.getElementById("redSoldierCount").innerHTML = redBuildings[s_count];

	document.getElementById("blueFactoryCount").innerHTML = blueBuildings[f_count];
	document.getElementById("blueCityCount").innerHTML = blueBuildings[c_count];
	document.getElementById("blueTownCount").innerHTML = blueBuildings[t_count];
	document.getElementById("blueBarrackCount").innerHTML = blueBuildings[b_count];
	document.getElementById("blueSoldierCount").innerHTML = blueBuildings[s_count];
}

var main = function(){

	/* Side bar */
	contextbase.beginPath();
	contextbase.rect(0, 0, 900, 500);
	contextbase.fillStyle = '#ffffff';
	contextbase.fill();

	drawInitMap();

    contextmenu.beginPath();
    contextmenu.rect(0, 0, 900, 500);
	contextmenu.fillStyle = 'rgba(0,0,0,.5)';
	contextmenu.fill();

	contextbase.font = "bold 16px Arial";
	contextbase.fillStyle = 'black';
	contextbase.fillText("Buildings", 815, 20);
	contextbase.beginPath();
	contextbase.fillStyle = 'blue';
	contextbase.font = "bold 10px Arial";
	contextbase.fillText("Town Hall", 840, 42);
	contextbase.drawImage(imagesArray[3], 815, 30);

    runTurn();

	if(setup == true) {
		var redBet = prompt("Red: Please bet your current points to decide who gets the first move.", "Between 1 and 100");
		while(redBet > 100) {
			redBet = prompt("Red: Please bet your current points to decide who gets the first move.", "Between 1 and 100");
		}
		var blueBet = prompt("Blue: Please bet your current points to decide who gets the first move.", "Between 1 and 100");
		while(blueBet > 100) {
			blueBet = prompt("Blue: Please bet your current points to decide who gets the first move.", "Between 1 and 100");	
		}


		if(redBet > blueBet) {
			alert("Red wins with " + redBet);
			who_turn = RED;
			document.getElementById("redYourTurn").innerHTML = "your turn";
		}
		if(redBet < blueBet) {
			alert("Blue wins with " + blueBet);
			who_turn = BLUE;
			document.getElementById("blueYourTurn").innerHTML = "your turn";
		}
		if(redBet == blueBet) {
			alert("Tie! a random player was chosen to go first");
			who_turn = Math.round(Math.random()) + 1;
			if(who_turn == RED) {
				document.getElementById("redYourTurn").innerHTML = "your turn";
			}
			if(who_turn == BLUE) {
				document.getElementById("blueYourTurn").innerHTML = "your turn";
			}
		}
		
	}
	
	selected_building = CASTLE;

	/*
	contextbase.fillStyle = "rgba(255,0,0,.3)";
	contextbase.fillRect(20,20,100,100);
	*/
}
















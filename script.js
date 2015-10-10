var canvasbase = document.getElementById("canvasbase");
var contextbase = canvasbase.getContext("2d");

var canvasmenu = document.getElementById("canvasmenu");
var contextmenu = canvasmenu.getContext("2d");

var map = drawMap();
var selected_building = 0;

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
const GRASS = 4;
const MOUNTAIN = 8;
const PLAIN = 16;
const DEBUGGER = 32;

const CASTLE = 0;
const FACTORY = 1;
const CITY = 2;
const TOWN = 3;
const BARRACK = 4;
const SOLDIER = 5;

var gPrices = [0,150,120,80,80,140]; //prices in gold for the structures.
var rPrices = [0,20,10,5,15,20];    //prices in resources for the structures.

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

console.log(map);

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
function Cell(x, y, possession, terrain) {
	this.x = x;                        // location on x axis
	this.y = y;						   // location on y axis
	this.possession = possession;      // which player owns it 0,1,2 --> maybe change to binary for ease of manipulation
	this.terrain = terrain;            // terrain attribute on cell, probably should use binary 000001, 000010 , ... 100000
}

window.addEventListener("keydown", doKeyDown, false);

function doKeyDown(e){
	console.log(e.keyCode);
	if(e.keyCode == 82 || e.keyCode == 114){
		drawInitMap();
	}
	if(e.keyCode == 27) {
		if(menu){
			contextmenu.clearRect(0, 0, 900, 500);
		} else {
			contextmenu.beginPath();
			contextmenu.rect(0, 0, 900, 500);
			contextmenu.fillStyle = 'rgba(0,0,0,.5)';
			contextmenu.fill();
		}
		menu = !menu;
	}

	if(e.keyCode == 13) {
		runTurn();
	}
	switch(e.keyCode) {
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

function addTerritory(upleftx, uplefty, bottomrightx, bottomrighty, team) {
	/*for(var i = uplefty; i < bottomrighty; i++) {
		for(var j = upleftx; j < bottomrighty; j++) {
			//make the cells that teams color
			map[i][j] = new Cell(x, y, team, terrain[x][y]);
		}
	}*/
	var mousePos = displayCoord(canvasmenu, event);
	conquerCells(mousePos.x - 3,mousePos.y + 3,mousePos.x + 3,mousePos.y - 3,RED);
}

function putBuilding(building, x, y) {
	if(map[x][y] === WATER) {
		return;
	}
	var img = new Image();
	img.src = structureNames[building];
	contextbase.drawImage(img, x*10, y*10);
	
	if(who_turn == RED) {
		redBuildings[building]++;
		redStuff[gold_count] -= gPrices[building];
		redStuff[resources_count] -= rPrices[building];
		//decrement gold and resources
	}
	if(who_turn == BLUE) {
		blueBuildings[building]++;
		blueStuff[gold_count] -= gPrices[building];
		blueStuff[resources_count] -= rPrices[building];
	}	
}

function drawInitMap(){
	var terrain = drawMap();
	while(!checkMap(terrain)) {
		terrain = drawMap();
		console.log("it is " + checkMap(terrain));
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
	console.log(terrainCount[0]);
	console.log(terrainCount[1]);
	console.log(terrainCount[2]);
	console.log(terrainCount[3]);
	console.log(terrainCount[4]);
	console.log("------------");
	
	
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
	console.log(message);
	console.log(map[mousePos.x][mousePos.y]);
});
canvasmenu.addEventListener("mousedown", function (event) {
	var mousePos = displayCoord(canvasmenu, event);
	putBuilding(selected_building, mousePos.x - 1, mousePos.y - 1);
	
});

function runTurn() {
	document.getElementById("redFactoryCount").innerHTML = redBuildings[f_count];;
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

    
    putBuilding(CASTLE, 5, 5);
    putBuilding(CITY, 8, 12);
    
    
}

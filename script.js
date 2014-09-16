var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.beginPath();
context.rect(0, 0, 800, 500);
context.fillStyle = '#BADA55';
context.fill();

for(var x = 5; x < 800; x += 20){
	for(var y = 5; y < 500; y += 20) {
		context.beginPath();
		context.rect(x, y, 10, 10);
		context.fillStyle = "#000000";
		context.fill();
	}
}
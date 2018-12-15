class Point 
{
	constructor(x, y) 
	{
		this.x = x;
		this.y = y;
	}
	add(point)
	{
		return new Point(this.x + point.x, this.y + point.y);
	}
}


var GameRunning = true;

var SquareSize = 40;
var Snake = [];
var Apple = createApple();

var SnakeDirectionEnum = Object.freeze({"left":1, "up":2, "right":3, "down":4})
var SnakeDirection = SnakeDirectionEnum.right;

window.onload = function()
{
	Snake.push(new Point(2, 2));
	Snake.push(new Point(2, 3));
	Snake.push(new Point(3, 3));
	
	refresh();
};	

function myFunction(event) {
    var x = event.keyCode;
	
	if (x == 37 && SnakeDirection != SnakeDirectionEnum.right) 
		SnakeDirection = SnakeDirectionEnum.left;
	else if (x == 38 && SnakeDirection != SnakeDirectionEnum.down) 
		SnakeDirection = SnakeDirectionEnum.up;
	else if (x == 39 && SnakeDirection != SnakeDirectionEnum.left) 
		SnakeDirection = SnakeDirectionEnum.right;
	else if (x == 40 && SnakeDirection != SnakeDirectionEnum.up) 
		SnakeDirection = SnakeDirectionEnum.down;
	
	
}

function createApple()
{
	var x;
	var y;
	var appleCoverFlag;
	
	do 
	{
		x = Math.floor(Math.random() * 840 / SquareSize);
		y = Math.floor(Math.random() * 440 / SquareSize);
		appleCoverFlag = false;
		
		for (i = 0; i < Snake.length; i++)
		{
			if (x == Snake[i].x && y == Snake[i].y)
			{
				appleCoverFlag = true;
				break;
			}
		}
	} while (appleCoverFlag == true);
	
	return new Point(x, y);
	
}


function collision()
{
	
	for (var i = 0; i < Snake.length - 4; i++)
	{
		if (Snake[i].x == Snake[Snake.length -1].x && Snake[i].y == Snake[Snake.length -1].y)
		{
			return true;
		}
	}
	
	return false;
}


function drawSquare(point, color)
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	
	ctx.fillRect(point.x * SquareSize, point.y * SquareSize, SquareSize, SquareSize);
	ctx.strokeRect(point.x * SquareSize, point.y * SquareSize, SquareSize, SquareSize);
}

function clearRect()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#b5cce5";
	ctx.fillRect(0, 0, 840, 440);
}


var eatenApple = false;

function refresh()
{
	
	clearRect();
	
	var snakeFront = Snake[Snake.length - 1];
	
	if (SnakeDirection == SnakeDirectionEnum.left)
	{
		if (snakeFront.x == 0)
			Snake.push(snakeFront.add(new Point(20, 0)));
		else
			Snake.push(snakeFront.add(new Point(-1, 0)));
	}
	else if (SnakeDirection == SnakeDirectionEnum.up) 
	{
		if (snakeFront.y == 0)
			Snake.push(snakeFront.add(new Point(0, 10)));
		else
			Snake.push(snakeFront.add(new Point(0, -1)));
	}
	else if (SnakeDirection == SnakeDirectionEnum.right)
	{
		if (snakeFront.x == 20)	
			Snake.push(snakeFront.add(new Point(-20, 0)));
		else
			Snake.push(snakeFront.add(new Point(1, 0)));
	}		
	else if (SnakeDirection == SnakeDirectionEnum.down) 
	{
		if (snakeFront.y == 10)
			Snake.push(snakeFront.add(new Point(0, -10)));
		else
			Snake.push(snakeFront.add(new Point(0, 1)));
	}


	if (eatenApple == false)
		Snake.shift();
	
	var coll = collision();
	GameRunning = !coll;
	
	
	snakeFront = Snake[Snake.length - 1];
	if (snakeFront.x == Apple.x && snakeFront.y == Apple.y)
	{
		eatenApple = true;
		Apple = createApple();
	}
	else
		eatenApple = false;
	

	
	
	for (var i = 0; i < Snake.length; i++)
	{
		drawSquare(Snake[i], "#0eb719");
	}
	drawSquare(Apple, "#ff0000");
	
	
	

	if (GameRunning)
	{
		document.getElementById("direction").innerHTML = "Length: " + Snake.length;
		setTimeout("refresh()", 200);
	}
		
}




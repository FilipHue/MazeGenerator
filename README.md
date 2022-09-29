# Maze Generator
This is a simple maze generator, using the DFS algorithm.

## Algorithm

The algorithm it's iterative, using a stack to keep track of the neighbors visited.

It works as follows: 
1.  Choose the initial cell, mark it as visited and push it to the stack
2.  While the stack is not empty
    1.  Pop a cell from the stack and make it a current cell
    2.  If the current cell has any neighbors which have not been visited
        1.  Push the current cell to the stack
        2.  Choose one of the unvisited neighbors
        3.  Remove the wall between the current cell and the chosen cell
        4.  Mark the chosen cell as visited and push it to the stack
  
  So let's break it down:
3. Choose an initial cell, mark it as visited and push it to the stack
```js
currentCell = grid.canvas[0];
currentCell.visited = true;
stack.push(currentCell);
```
4. While the stack is not empty
```js
 while (stack.length != 0) { ... }
```
5. Pop a cell from the stack and make it a current cell
```js
currentCell = stack.pop();
```
6.  If the current cell has any neighbors which have not been visited
```js
let nextCell = currentCell.checkNeighbours(grid.canvas, collumns, rows);
if (nextCell) { ... }
```
7. Push the current cell to the stack
```js
stack.push(currentCell);
```
8. Choose one of the unvisited neighbors
  This is already done in the checkNeighbours() function.
9. Remove the wall between the current cell and the chosen cell
```js
grid.removeWalls(currentCell, nextCell);
```
10. Mark the chosen cell as visited and push it to the stack
```js
nextCell.visited = true;
currentCell = nextCell;
stack.push(nextCell);
```

## Program

You can run the program by double-clicking on the **index.html** file.
Let's break down the structure of the program. The main files are:
* **grid.js**
* **cell.js**
* **sketch.js**

1. **Grid.js**
	* it contains the grid class, which represents how the tiles are shown;
	* it has 3 elements:
		* collumns
		* rows
		* canvas
	* it has 2 functions:
		* removeWalls:
		```js
		removeWalls(currentCell, nextCell) {
			if (currentCell.i  -  nextCell.i  !=  0) {
				if (currentCell.i  -  nextCell.i  >  0) {
					currentCell.walls[3] =  false;
					nextCell.walls[1] =  false;
				} else {
					currentCell.walls[1] =  false;
					nextCell.walls[3] =  false;
				}
			}

			if (currentCell.j  -  nextCell.j  !=  0) {
				if (currentCell.j  -  nextCell.j  >  0) {
					currentCell.walls[0] =  false;
					nextCell.walls[2] =  false;
				} else {
					currentCell.walls[2] =  false;
					nextCell.walls[0] =  false;
				}
			}
		}
		```
		* show:
		```js
		show(currentCell) {
			for (let  i  =  0; i  <  this.collumns; i++) {
				for (let  j  =  0; j  <  this.rows; j++) {
					let  cell  =  this.canvas[i  +  j  *  rows];
					if (cell  ==  currentCell) {
						currentCell.highlight(DIM);
					} else {
						cell.show(DIM);
					}
				}
			}
		}
		```
2. **Cell.js**
	* it contains the Cell class, which represents the cell objects from the grid
	* each cell has a position (i and j), an array of walls and a visited check
	* the walls array is a bool array that says which wall, clockwise, starting from the north, exists (true) or doesn't exists (false)
	* it has 3 functions:
		* checkNeighbours:
		```js
		checkNeighbours(grid, collumns, rows) {
			let  neighbours  = [];
			let  directions  = [undefined, undefined, undefined, undefined];

			// UP
			if (this.j  >  0) {
				directions[0] =  grid[this.i  + (this.j  -  1) *  rows];
			}
			
			//RIGHT
			if (this.i  <  collumns  -  1) {
				directions[1] =  grid[this.i  +  1  +  this.j  *  rows];
			}
			
			// DOWN
			if (this.j  <  collumns  -  1) {
				directions[2] =  grid[this.i  + (this.j  +  1) *  rows] {
			}

			// LEFT
			if (this.i  >  0) {
				directions[3] =  grid[this.i  -  1  +  this.j  *  rows];
			}
			
			for (let  i  =  0; i  <  4; i++) {
				if (directions[i]) {
					if (!directions[i].visited) {
						neighbours.push(directions[i]);
					}
				}
			}

			if (neighbours.length) {
				let  randomNeighbour  =  floor(random(0, neighbours.length));
				return  neighbours[randomNeighbour];
			}
			
			return  undefined;
		}
		``` 
		> The directions list represents the cells from around the current cell (the neighbours). After getting all the neighbours, all the available ones (which have not yet been visited) are put in the neighbours list. Then one of them is randomly picked and returned. If there aren't any available neighbours, it returns undefined.

		* highlight:
		```js
		highlight(dimension) {
		let  x  =  this.i  *  dimension;
		let  y  =  this.j  *  dimension;

		noStroke();
		fill(0, 255, 255, 100);
		rect(x, y, dimension, dimension);
		}
		```
		> It highlights the cell (used in grid.show() for highlighting the current cell)
		
		* show:
		```js
		show(dimension) {
			let  x  =  this.i  *  dimension;
			 let  y  =  this.j  *  dimension;
			 
			if (this.visited) {
				noStroke();
				fill(255, 0, 0);
				rect(x, y, dimension, dimension);
			}
			
			stroke(255);
			strokeWeight(2);

			// UP
			if (this.walls[0]) {
				line(x, y, x  +  dimension, y);
			}			  

			// RIGHT
			if (this.walls[1]) {
				line(x  +  dimension, y, x  +  dimension, y  +  dimension);
			}
						 
			// DOWN
			if (this.walls[2]) {
				line(x  +  dimension, y  +  dimension, x, y  +  dimension);
			}

			// LEFT
			if (this.walls[3]) {
				line(x, y  +  dimension, x, y);
			}
		}
		```
3. **Sketch.js**
	* this is where the logic of the program is run
	* in setup the grid and the stack are initialized
	* in draw is implemented the algorithm for the maze generation, discussed at the beginning
		> The commented code is used to see the maze generation in real time. To use it, you must comment the while loop and uncomment the if statements with the variable declaration.
		> In order to change the grid size, you can modify the DIM variable, declared at the top of the file.


## Mentions
The method is much better explained at this link: https://en.wikipedia.org/wiki/Maze_generation_algorithm

# Maze Generator
This is a simple maze generator, using the DFS algorithm.

## Algorithm

The algorithm it's iterative, using a stack to keep track of the neighbors and to assure that it can backtrack if it gets to a dead end.

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

Let's break down the structure of the program. The main files are:
* **grid.js**
* **cell.js**
* **grid.js**

You can run the program by double-clicking on the **index.html** file.
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


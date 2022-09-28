const DIM = 80;
let grid;
let stack = [];
let currentCell;

function setup() {
	createCanvas(800, 800);

	collumns = floor(width / DIM);
	rows = floor(height / DIM);

	grid = new Grid(rows, collumns);

	for (let i = 0; i < collumns; i++) {
		for (let j = 0; j < rows; j++) {
			let cell = new Cell(i, j);
			grid.canvas[i + j * rows] = cell;
		}
	}

	currentCell = grid.canvas[0];
	currentCell.visited = true;

	stack.push(currentCell);
}

function draw() {
	background(0);

	grid.show(currentCell);

	let nextCell = currentCell.checkNeighbours(grid.canvas, collumns, rows);
	if (nextCell) {
		stack.push(currentCell);

		grid.removeWalls(currentCell, nextCell);
		nextCell.visited = true;
		currentCell = nextCell;
	} else if (stack.length != 0) {
		let cell = stack.pop();
		currentCell = cell;
	} else {
		return;
	}
}
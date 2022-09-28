class Grid {
	constructor(rows, collumns) {
		this.rows = rows;
		this.collumns = collumns;
		this.canvas = [];
	}

	removeWalls(currentCell, nextCell) {
		if (currentCell.i - nextCell.i != 0) {
			if (currentCell.i - nextCell.i > 0) {
				currentCell.walls[3] = false;
				nextCell.walls[1] = false;
			} else {
				currentCell.walls[1] = false;
				nextCell.walls[3] = false;
			}
		}
		if (currentCell.j - nextCell.j != 0) {
			if (currentCell.j - nextCell.j > 0) {
				currentCell.walls[0] = false;
				nextCell.walls[2] = false;
			} else {
				currentCell.walls[2] = false;
				nextCell.walls[0] = false;
			}
		}
	}

	show(currentCell) {
		for (let i = 0; i < this.collumns; i++) {
			for (let j = 0; j < this.rows; j++) {
				let cell = this.canvas[i + j * rows];
				if (cell == currentCell) {
					currentCell.highlight(DIM);
				} else {
					cell.show(DIM);
				}
			}
		}
	}
}
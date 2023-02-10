class Solver {
	constructor(world) {
		this.world = world;
	}

	get_neighbour(cell) {
		let array = [];
		if ((cell.j + 1 < this.world.width) && (this.world.grid[cell.i][cell.j + 1].is_free())) {array.push(this.world.grid[cell.i][cell.j + 1])};
		if ((0 <= cell.j - 1) && (this.world.grid[cell.i][cell.j - 1].is_free())) {array.push(this.world.grid[cell.i][cell.j - 1])};
		if ((cell.i + 1 < this.world.height) && (this.world.grid[cell.i + 1][cell.j].is_free())) {array.push(this.world.grid[cell.i + 1][cell.j])};
		if ((0 <= cell.i - 1) && (this.world.grid[cell.i - 1][cell.j].is_free())) {array.push(this.world.grid[cell.i - 1][cell.j])};
		return array;
	}

	solve() {
		console.error("Pas de solveur implémenté !");
	}
}

class BacktrackingSolver extends Solver {
	constructor(world) {
		super(world);
		this.timestamp = (0, 0);
		this.timestamp_checkpoint = (0, 0);
	}

	heuristique(cella, target) {
		return Math.abs(cella.i - target.i) + Math.abs(cella.j - target.j);
	}

	explore_cell(path, cell) {
		let neighbour = this.get_neighbour(cell);
		neighbour.sort((c1, c2) => (this.heuristique(c2, path.cellend) - this.heuristique(c1, path.cellend)));
		path.tilelist.push([cell, neighbour, this.timestamp]);
	}
	
	explore_path(path) {
		console.log(path);
		if (path.tilelist[path.tilelist.length - 1][1].length > 0) {
			this.explore_cell(path, path.tilelist[path.tilelist.length - 1][1].pop(), this.timestamp);
		} else {
			path.tilelist.pop();
			this.timestamp = (this.timestamp[0] + 1, 0);
			this.explore_path(path, this.timestamp);
		}
	}

	solve() {
		let sorted_path = [[], [], [], [], []];
		// Initialise les chemins en précalculant les chemins possibles
		for (let i=0; i < this.world.path.length; i++) {
			this.explore_cell(this.world.path[i], this.world.path[i].cellstart, (0, 0));
			sorted_path[this.world.path[i].tilelist[0][1].length - 1].push(this.world.path[i])
		}
		//console.log(sorted_path);
		let n_target = 0;
		//while (n_target < this.world.path.length) {
		for (let i = 0; i < 100; i++) {
			let i = 0;
			while ((i < sorted_path.length) && (sorted_path[i].length == 0)) {i++}
			this.explore_path(sorted_path[i][0]);
			

		}
	}
}

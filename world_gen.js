
function get_voisins(world, cell) {
	let array = [];
	if ((cell.j + 1 < world.width) && (world.grid[cell.i][cell.j + 1].is_free())) { array.push(world.grid[cell.i][cell.j + 1]) };
	if ((0 <= cell.j - 1) && (world.grid[cell.i][cell.j - 1].is_free())) { array.push(world.grid[cell.i][cell.j - 1]) };
	if ((cell.i + 1 < world.height) && (world.grid[cell.i + 1][cell.j].is_free())) { array.push(world.grid[cell.i + 1][cell.j]) };
	if ((0 <= cell.i - 1) && (world.grid[cell.i - 1][cell.j].is_free())) { array.push(world.grid[cell.i - 1][cell.j]) };
	return array;
}


function is_not_full(world) {
	for (let i = 0; i < world.width; i++) {
		for (let j = 0; j < world.height; j++) {
			if (world.grid[i][j].celltype === cell.empty) {
				return true
			}
		}
	}
	return false
}

function create_arbitrary_path(world) {
	//On trouve une cellule encore vide
	let rd = floor(random(n * n));
	let i_depart = rd % n;
	let j_depart = floor(rd / n);
	while (world.grid[i_depart][j_depart].celltype !== cell.empty) {
		let rd = floor(random(n * n));
		i_depart = rd % n;
		j_depart = floor(rd / n);
	}
	let voisins = get_voisins(world, world.grid[i_depart][j_depart]);
	//Si cette cellule n’a aucun voisin, paf on la transforme en mur
	if (voisins.length === 0) {
		world.grid[i_depart][j_depart].wall = true;
	}
	//Sinon, on prend des voisins randoms jusqu'à arriver à un point bloquant
	//qui sera la fin de notre chemin.
	else {
		let path_id = world.paths.length;
		world.grid[i_depart][j_depart].path = true;
		world.grid[i_depart][j_depart].number = path_id;
		world.paths.push(new Path(path_id, world.grid[i_depart][j_depart], world.grid[i_depart][j_depart]));
		while (voisins.length > 0) {
			let r = floor(random(voisins.length));
			new_cell = voisins[r];
			new_cell.path = true;
			world.paths[path_id].tilelist.push(new_cell);
			world.paths[path_id].cellend = new_cell;
			voisins = get_voisins(world, new_cell);
		}
		new_cell.number = path_id;
	}
}

function clear_paths(world) {
	for (let k = 0; k < world.paths.length; k++) {
		world.paths[k].tilelist = [];
	}
}

function generate_map(height, width, n, k) {
	w = floor(width / n);
	//On crée un monde vied
	world = World.makeEmptyWorld(n, n, w);
	//Tant que le monde n’est pas rempli, on ajoute des chemins (ou des murs)
	//dedans
	// create_arbitrary_path(world);
	// while (is_not_full(world)){
	// 	create_arbitrary_path(world);
	// }
	let i = 0;
	while (i < k && is_not_full(world)){
		create_arbitrary_path(world);
		i++;
	}
	let true_world = World.makeEmptyWorld(n, n, w);
	for (let i = 0; i < world.paths.length; i++){
		cellstart = true_world.grid[world.paths[i].cellstart.i][world.paths[i].cellstart.j]
		cellend = true_world.grid[world.paths[i].cellend.i][world.paths[i].cellend.j]
		true_world.add_target(cellstart, cellend);

	}
	for (let i = 0; i < world.height; i++){
		for (let j = 0; j < world.width; j++){
			true_world.grid[i][j].wall = world.grid[i][j].wall
		}
	}
	//À la fin, on vide les chemins de tous les points intérieurs, pour en faire
	//des targets
	return true_world
}

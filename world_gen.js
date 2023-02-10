function check_full_world(world){
	for (let i = 0; i < world.width; i++){
		for (let j = 0; j <world.height; j++){
			if(world.grid[i][j].celltype === cell.empty){
				return true
			}
		}
	}
	return false
}

function create_arbitrary_path(world){
	//On trouve une cellule encore vide
	let rd = floor(random(n*n));
	let i_depart = rd % n;
	let j_depart = floor(rd / n);
	while (world.grid[i_depart][j_depart].number !== null){
		let rd = floor(random(n*n));
		let i_depart = rd % n;
		let j_depart = floor(rd / n);
	}
	let voisins = get_neighbour(world.grid[i][j]);
	//Si cette cellule n’a aucun voisin, paf on la transforme en mur
	if (voisins.length == 0){
		world.grid[i][j].wall = true;
	}
	//Sinon, on prend des voisins randoms jusqu'à arriver à un point bloquant
	//qui sera la fin de notre chemin.
	else{
		let path_id = world.paths.length;
		world.paths.push(new Path(path_id, world.grid[i][j], world.grid[i][j]));
		while(voisins.length != 0){
			let new_cell = voisins[random(voisins.length)];
			world.paths[path_id].tilelist.push(new_cell);
			world.paths[path_id].cellend = new_cell;
			voisins = get_neighbour(new_cell);
		}
	}
}

function clear_paths(world){
	for (let k = 0; k < world.paths.length; k++){
		world.paths[k].tileliste = [];
	}
}

function generate_map(height, width) {
	w = floor(width / n);
	//On crée un monde vied
	world = World.makeEmptyWorld(n,n,w);
	//Tant que le monde n’est pas rempli, on ajoute des chemins (ou des murs)
	//dedans
	while (!check_full_world(world)){
		create_arbitrary_path(world);
	}
	//À la fin, on vide les chemins de tous les points intérieurs, pour en faire
	//des targets
	clear_paths(world);
	return world
}

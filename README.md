# Maze-Life

## Overview

[Live](http://aarronlee.com/Maze-Life)

This project visually shows path traversal algorithms through a randomly generated maze. This project was written with only ES6 Javascript, HTML, and CSS. Webpack was used to provide related dependencies, such as a babel transpiler.

The mazes are generated with a simple recursive backtracking algorithm. The current pathfinding algorithms implemented visually are breadth-first-search (BFS), depth-first-search (DFS), and A* search.

![Maze Traversal](http://www.aarronlee.com/images/portfolio/maze-life.gif)

## Implementation

### MazeNode

There is a `MazeNode` class that has wall properties, one in each cardinal direction (N, S, E, W).

For each MazeNode, a corresponding `htmlnode` instance variable is created, which is a simple div with a maze-node class declared on it.

```
class MazeNode{

  constructor(pos){
    ...
    this.htmlnode = document.createElement('div');
    this.htmlnode.classList.add("maze-node");
    ...
  }
  ...
}
```


Every time a wall is removed via the `carveWall()` function, the corresponding htmlnode is modified with a new class, such as 'north-wall' or 'south-wall'. Then, CSS simulates a "wall" visually on the div with a 1px black border on the relevant direction.

```
carveWall(direction){
  if(direction && this.directions.includes(direction)){
    this.walls[direction] = false;
    this.removeWalls();
    this.setWalls();
    // wall successfully carved
    return direction;
  }
  return null;
}

setWalls(){
  if(this.walls["N"]){
    this.htmlnode.classList.add("north-wall");
  }
  ...
}

// CSS
.maze-node.north-wall{
  border-top: 1px solid black;
}
```

Thus, whenever you update the status of a wall on the node, the corresponding css is automatically added or removed to the div. Thus, you no longer have to manually manage the visual elements related to the maze nodes.

This approach effectively abstracts away any of the UI-related aspects to rendering a maze.

### MazeGrid

A simple 2D array is generated, with each element in the array being a MazeNode. A `grid` instance variable is created. The grid variable is a div HTMLElement, and for every MazeNode generated, the node's htmlelement is appended to the grid div. Later on, we can just attach the entire grid div to document via the following:

```
document.addEventListener("DOMContentLoaded",
() =>{
  let root = document.querySelector('#root');

  let maze = new MazeGrid(45);
  ...
  root.appendChild(maze.grid);
}
```

The `MazeGrid` class generates the maze with a simple recursive algorithm, where it does the following:

1. All nodes start with all walls set. From the current node, check if any adjacent nodes have yet to be visited.
2. Choose a random adjacent unvisited node, and carve out the walls between them. Move to the next node, and mark the previous node as visited.
3. Recursively repeat until the currentNode is surrounded by all visited nodes. Backtrack to the most recent node that still has unvisited nodes.
4. Once you backtrack to the starting point, the maze is complete.

There are some caveats to using this algorithm. This algorithm generates a unique path from one node to another. Thus, since only one path exists to any given node, algorithms such as DFS will find the optimal path by default.

However, the different behaviors of path-finding algorithms can still be observed.

As for animating the maze creation, the maze generation algorithm is run in advance, and the necessary `carveWall` actions are stored in an array.

Then, a setInterval function is used to execute each carve action in the array until all carve actions are completed. Afterwards, the setInterval is dismissed.

Similarly, path traversal rendering is done via two setInterval functions. Once the first setInterval is completed (which renders visited nodes), it triggers a second setInterval function (which renders the path found from point A to point B).


## Dependencies

Babel and Webpack are used for to enable usage of ES6 javascript.

## Todo / planned

1. Other Maze Generation algorithms
2. Custom maze traversal algorithm
3. Enable different maze sizes



#### Miscellaneous

The user icon image was made by [chanut-is-industries](https://www.flaticon.com/authors/chanut-is-industries) from [flaticon.com](https://www.flaticon.com/) , is licensed under CC 3.0

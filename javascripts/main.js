import MazeNode from './maze_node';
import MazeGrid from './maze_grid';



document.addEventListener("DOMContentLoaded", () =>{

  // window.node = new MazeNode([1,2]);

  let root = document.querySelector('#root');

  let maze = new MazeGrid(15);

  let genMazeButton = document.querySelector('#generate-maze-button');

  genMazeButton.addEventListener("click", (e)=>{
    e.preventDefault();
    maze.generateMaze();
  });

  root.appendChild(maze.grid);


});

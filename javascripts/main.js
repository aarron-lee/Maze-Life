import MazeNode from './maze_node';
import MazeGrid from './maze_grid';



document.addEventListener("DOMContentLoaded", () =>{

  // window.node = new MazeNode([1,2]);

  let root = document.querySelector('#root');

  let maze = new MazeGrid(15);

  let generateMazeForm = document.querySelector('#generate-maze-form');

  generateMazeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    maze.generateMaze(parseInt(e.currentTarget[1].value));
  });

  root.appendChild(maze.grid);


});

import MazeNode from './maze_node';
import MazeGrid from './maze_grid';


let handleMazeExtras = (maze) => {

  let generateMazeForm = document.querySelector('#generate-maze-form');

  generateMazeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    maze.generateMaze(parseInt(e.currentTarget[0].value));
  });

  let resetMazeButton = document.querySelector('#reset-maze-button');

  resetMazeButton.addEventListener("click", (e)=>{
    e.preventDefault();
    maze.resetMaze();
  });
};

document.addEventListener("DOMContentLoaded", () =>{

  let root = document.querySelector('#root');

  let maze = new MazeGrid(15);

  handleMazeExtras(maze);

  root.appendChild(maze.grid);


});

import MazeNode from './maze_node';
import MazeGrid from './maze_grid';


let handleMazeExtras = (maze) => {

  let generateMazeForm = document.querySelector('#generate-maze-form');
  let generateMazeButton = document.querySelector('#generate-maze-button');

  generateMazeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    maze.resetMaze();
    generateMazeButton.disabled = true;
    maze.generateMaze(parseInt(e.currentTarget[0].value));
  });

};

document.addEventListener("DOMContentLoaded", () =>{

  let root = document.querySelector('#root');

  let maze = new MazeGrid(15);

  handleMazeExtras(maze);

  root.appendChild(maze.grid);


});

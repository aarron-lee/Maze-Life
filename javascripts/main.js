import MazeNode from './maze_node';
import MazeGrid from './maze_grid';


let handleMazeExtras = (maze) => {

  let generateMazeForm = document.querySelector('#generate-maze-form');
  let generateMazeButton = document.querySelector('#generate-maze-button');

  generateMazeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    generateMazeButton.disabled = true;
    maze.generateMaze(e.currentTarget[0].checked);
  });

};

document.addEventListener("DOMContentLoaded", () =>{

  let root = document.querySelector('#root');

  window.maze = new MazeGrid(60);

  handleMazeExtras(maze);

  root.appendChild(maze.grid);


});

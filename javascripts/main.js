import MazeNode from './maze_node';
import MazeGrid from './maze_grid';


let handleMazeExtras = (maze) => {

  let generateMazeForm = document.querySelector('#generate-maze-form');
  let generateMazeButton = document.querySelector('#generate-maze-button');
  let dfsButton = document.querySelector('#dfs');
  let bfsButton = document.querySelector('#bfs');


  generateMazeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    generateMazeButton.disabled = true;
    dfsButton.disabled = true;
    bfsButton.disabled = true;
    let buttonsToEnable = [dfsButton, bfsButton, generateMazeButton];
    maze.generateMaze(e.currentTarget[0].checked, buttonsToEnable);
  });

};


let handleSearchExtras = (maze) => {

  let generateMazeButton = document.querySelector('#generate-maze-button');
  let dfsButton = document.querySelector('#dfs');
  let bfsButton = document.querySelector('#bfs');

  dfsButton.addEventListener("click", (e)=>{
    e.preventDefault();
    generateMazeButton.disabled = true;
    dfsButton.disabled = true;
    bfsButton.disabled = true;
    let buttonsToEnable = [dfsButton, bfsButton, generateMazeButton];
    maze.dfs(buttonsToEnable);
  });

  bfsButton.addEventListener("click", (e)=>{
    e.preventDefault();
    generateMazeButton.disabled = true;
    dfsButton.disabled = true;
    bfsButton.disabled = true;
    let buttonsToEnable = [dfsButton, bfsButton, generateMazeButton];
    maze.bfs(buttonsToEnable);
  });


}


document.addEventListener("DOMContentLoaded", () =>{

  let root = document.querySelector('#root');

  window.maze = new MazeGrid(60);

  handleMazeExtras(maze);

  handleSearchExtras(maze);

  maze.generateMaze(true, []);


  root.appendChild(maze.grid);


});

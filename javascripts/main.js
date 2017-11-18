import MazeNode from './maze_node';
import MazeGrid from './maze_grid';


let handleMazeExtras = (maze) => {

  let generateMazeForm = document.querySelector('#generate-maze-form');
  let generateMazeButton = document.querySelector('#generate-maze-button');
  let dfsButton = document.querySelector('#dfs');
  let bfsButton = document.querySelector('#bfs');
  let astarButton = document.querySelector('#astar');

  let buttonsToEnable = [dfsButton, bfsButton, generateMazeButton, astarButton];

  let disableButtons = (buttonsToDisable)=>{
    buttonsToDisable.forEach( button => button.disabled = true);
  }

  let timers = document.querySelectorAll("[id^='timer-']");

  generateMazeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    timers.forEach(el => el.innerHTML = "0 ms");
    disableButtons(buttonsToEnable);
    maze.generateMaze(e.currentTarget[0].checked, buttonsToEnable);
  });

};


let handleSearchExtras = (maze) => {

  let generateMazeButton = document.querySelector('#generate-maze-button');
  let dfsButton = document.querySelector('#dfs');
  let bfsButton = document.querySelector('#bfs');
  let astarButton = document.querySelector('#astar');

  let buttonsToEnable = [dfsButton, bfsButton, generateMazeButton, astarButton];

  let disableButtons = (buttonsToDisable)=>{
    buttonsToDisable.forEach( button => button.disabled = true);
  }

  dfsButton.addEventListener("click", (e)=>{
    e.preventDefault();
    disableButtons(buttonsToEnable);
    maze.dfs(buttonsToEnable);
  });

  bfsButton.addEventListener("click", (e)=>{
    e.preventDefault();
    disableButtons(buttonsToEnable);
    maze.bfs(buttonsToEnable);
  });

  astarButton.addEventListener("click", (e)=>{
    e.preventDefault();
    disableButtons(buttonsToEnable);
    maze.aStar(buttonsToEnable);
  });

}


document.addEventListener("DOMContentLoaded", () =>{

  let root = document.querySelector('#root');

  window.maze = new MazeGrid(45);

  handleMazeExtras(maze);

  handleSearchExtras(maze);

  maze.generateMaze(true, []);


  root.appendChild(maze.grid);


});

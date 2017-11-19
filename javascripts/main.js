import MazeNode from './maze_node';
import MazeGrid from './maze_grid';


let handleMazeExtras = (maze, buttonsToEnable) => {
  let generateMazeForm = document.querySelector('#generate-maze-form');
  let astarGrid = document.querySelector('#generate-astar-maze-button');
  let streetGridButton = document.querySelector('#generate-street-grid-button');
  let slider= document.querySelector('#search-speed-slider');
  let checkbox = document.querySelector('#instant-checkbox');

  slider.defaultValue = 6;

  let disableButtons = (buttonsToDisable)=>{
    buttonsToDisable.forEach( button => button.disabled = true);
  }

  let timers = document.querySelectorAll("[id^='timer-']");

  generateMazeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    timers.forEach(el => el.innerHTML = "0 ms");
    disableButtons(buttonsToEnable);
    maze.generateMaze(checkbox.checked, buttonsToEnable);
  });

  astarGrid.addEventListener("click", (e)=>{
    e.preventDefault();
    maze.generateAstarGrid();
  });

  streetGridButton.addEventListener("click", (e)=>{
    e.preventDefault();
    maze.generateStreetGrid();
  });
};

let handleSearchExtras = (maze, buttonsToEnable) => {
  let dfsButton = document.querySelector('#dfs');
  let bfsButton = document.querySelector('#bfs');
  let astarButton = document.querySelector('#astar');

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

  let generateMazeButton = document.querySelector('#generate-maze-button');
  let dfsButton = document.querySelector('#dfs');
  let bfsButton = document.querySelector('#bfs');
  let astarButton = document.querySelector('#astar');
  let astarGrid = document.querySelector('#generate-astar-maze-button');
  let streetGridButton = document.querySelector('#generate-street-grid-button');

  let buttons = [dfsButton, bfsButton, generateMazeButton, astarButton, astarGrid, streetGridButton];

  let root = document.querySelector('#root');

  window.maze = new MazeGrid(45);

  handleMazeExtras(maze, buttons);

  handleSearchExtras(maze, buttons);

  maze.generateMaze(true, []);

  root.appendChild(maze.grid);

});

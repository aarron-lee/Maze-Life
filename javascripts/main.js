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
    timers.forEach(el => el.innerHTML = "0 ms");
    maze.generateAstarGrid();
  });

  streetGridButton.addEventListener("click", (e)=>{
    e.preventDefault();
    timers.forEach(el => el.innerHTML = "0 ms");
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

let handleModalButtons = () =>{
  let generatorsModalButton = document.getElementById('#generators-modal');
  let solversModalButton = document.getElementById('#solvers-modal');
  let modalDiv = document.querySelector('#modal-location');

  generatorsModalButton.addEventListener("click", (e) =>{
    e.preventDefault();
    let html = '<div class="modal-backdrop"><div class="modal-inner"><h2>Maze Generators</h2>';
    html+= '<p>These buttons are used to generate different grids, which are then used to test the Maze Solvers algorithms</p>';
    html+='<div class="close-modal">X</div>';
    html+= '</div></div>';
    modalDiv.innerHTML = html;
    document.querySelector('.modal-backdrop').addEventListener("click", (e) =>{
      e.preventDefault();
      modalDiv.innerHTML = '';
    });
  });

  solversModalButton.addEventListener("click", (e) =>{
    e.preventDefault();
    let html = '<div class="modal-backdrop"><div class="modal-inner"><h2>Maze Solvers</h2>';
    html+= '<p><h2>Description</h2>These buttons are used to find a path from the start point to the end point indicated on the grid</p>';
    html+= '<p><h2>DFS</h2> Depth First Search Algorithm. This algorithm traverses a path until it finds a dead end, then backtracks to the next fork where it can continue. Rinse, repeat, until a path is found.</p>';
    html+= '<p><h2>BFS</h2> Breadth First Search Algorithm. This algorithm traverses a path until it reaches a fork, and at each fork, it splits up and traverses down each path evenly. Rinse, repeat, until a path is found.</p>';
    html+= '<p><h2>A*</h2> A* search algorithm. This algorithm uses a heuristic to keep track of estimated distance to the goal location, and traverses the grid based on the shortest distances indicated by the heuristic.</p>';
    html+='<div class="close-modal">X</div>';
    html+= '</div></div>';
    modalDiv.innerHTML = html;
    document.querySelector('.modal-backdrop').addEventListener("click", (e) =>{
      e.preventDefault();
      modalDiv.innerHTML = '';
    });
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
  handleModalButtons();

  maze.generateMaze(true, []);

  root.appendChild(maze.grid);

});

import MazeNode from './maze_node';
import MazeGrid from './maze_grid';



document.addEventListener("DOMContentLoaded", () =>{

  // window.node = new MazeNode([1,2]);

  window.mount = document.querySelector('#root');

  window.grid = new MazeGrid(20);

  root.appendChild(grid.grid);


});

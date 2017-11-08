class MazeNode{

  constructor(pos){
    this.pos = pos;
    this.walls = {};
    this.visited = false;
    this.directions = ["N", "S", "E", "W"];
    this.directions.forEach(direction =>{
      this.walls[direction] = true;
    });
  }

  carveWall(direction){
    if(direction && this.directions.includes(direction)){
      this.walls[direction] = false;
      return direction;
    }
    return null;
  }
}

export default MazeNode;

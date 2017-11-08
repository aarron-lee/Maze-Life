class MazeNode{

  constructor(pos){
    this.pos = pos;
    this.walls = {};

    this.directions = ["N", "S", "E", "W"];

    this.directions.forEach(direction =>{
      this.walls[direction] = false;
    });
  }

  fillRandomWall(){
    let direction = this.getRandomDirection();
    if(direction){
      this.walls[direction] = true;
      this.updateDirections(direction);
      return direction;
    }
    return null;
  }

  updateDirections(direction){
    let newDirections = [];

    this.directions.forEach(d =>{
      if (d !== direction){
        newDirections.push(d);
      }
    });

    this.directions = newDirections;
  }

  getRandomDirection(){
    if(this.directions.length === 0){
      return null;
    }
    return this.directions[Math.floor(Math.random() * this.directions.length)];
  }



}

export default MazeNode;

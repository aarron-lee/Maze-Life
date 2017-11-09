/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeNode = function () {
  function MazeNode(pos) {
    var _this = this;

    _classCallCheck(this, MazeNode);

    this.pos = pos;
    this.walls = {};
    this.visited = false;
    this.directions = ["N", "S", "E", "W"];
    this.directions.forEach(function (direction) {
      _this.walls[direction] = true;
    });

    this.htmlnode = document.createElement('div');
    this.htmlnode.classList.add("maze-node");
    this.htmlnode.id = "node-" + pos[0] + "-" + pos[1];
    this.setWalls();

    this.resetNode = this.resetNode.bind(this);

    this.parent = null;
    this.pathNode = false;
    this.activeStatus = false;
    this.isCurrent = false;
  }

  _createClass(MazeNode, [{
    key: "carveWall",
    value: function carveWall(direction) {
      if (direction && this.directions.includes(direction)) {
        this.walls[direction] = false;
        this.removeWalls();
        this.setWalls();
        return direction;
      }
      return null;
    }
  }, {
    key: "toggleActive",
    value: function toggleActive() {
      if (this.activeStatus) {
        this.activeStatus = false;
        this.htmlnode.classList.remove('active-node');
      } else {
        this.activeStatus = true;
        this.htmlnode.classList.add('active-node');
      }
    }
  }, {
    key: "setActive",
    value: function setActive() {
      if (this.activeStatus === false) {
        this.activeStatus = true;
        this.htmlnode.classList.add('active-node');
      }
    }
  }, {
    key: "disableActive",
    value: function disableActive() {
      if (this.activeStatus === true) {
        this.activeStatus = false;
        this.htmlnode.classList.remove('active-node');
      }
    }
  }, {
    key: "toggleCurrent",
    value: function toggleCurrent() {
      if (this.isCurrent === false) {
        this.isCurrent = true;
        this.htmlnode.classList.add('current-node');
      } else {
        this.isCurrent = false;
        this.htmlnode.classList.remove('current-node');
      }
    }
  }, {
    key: "setPath",
    value: function setPath() {
      if (this.pathNode === true) {
        this.pathNode = false;
        this.htmlnode.classList.remove('active-node');
      } else {
        this.pathNode = true;
        this.htmlnode.classList.add('path-node');
      }
    }
  }, {
    key: "node",
    value: function node() {
      return this.htmlnode;
    }
  }, {
    key: "setWalls",
    value: function setWalls() {
      if (this.walls["N"]) {
        this.htmlnode.classList.add("north-wall");
      }
      if (this.walls["S"]) {
        this.htmlnode.classList.add("south-wall");
      }
      if (this.walls["E"]) {
        this.htmlnode.classList.add("east-wall");
      }
      if (this.walls["W"]) {
        this.htmlnode.classList.add("west-wall");
      }
    }
  }, {
    key: "removeWalls",
    value: function removeWalls() {
      var _this2 = this;

      var classes = ["north-wall", "south-wall", "east-wall", "west-wall"];

      classes.forEach(function (c) {
        _this2.htmlnode.classList.remove(c);
      });
    }
  }, {
    key: "resetNode",
    value: function resetNode() {
      var _this3 = this;

      this.directions.forEach(function (direction) {
        _this3.walls[direction] = true;
      });

      this.parent = null;
      this.pathNode = false;
      this.activeStatus = false;
      this.isCurrent = false;
      this.visited = false;
      this.htmlnode.className = "maze-node";

      this.setWalls();
      this.disableActive();
    }
  }, {
    key: "removeTracesOfTravel",
    value: function removeTracesOfTravel() {
      this.parent = null;
      this.pathNode = false;
      this.activeStatus = false;
      this.isCurrent = false;
      this.visited = false;

      this.htmlnode.className = "maze-node";
      this.setWalls();
    }
  }]);

  return MazeNode;
}();

exports.default = MazeNode;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _maze_node = __webpack_require__(0);

var _maze_node2 = _interopRequireDefault(_maze_node);

var _maze_grid = __webpack_require__(2);

var _maze_grid2 = _interopRequireDefault(_maze_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleMazeExtras = function handleMazeExtras(maze) {

  var generateMazeForm = document.querySelector('#generate-maze-form');
  var generateMazeButton = document.querySelector('#generate-maze-button');

  generateMazeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    generateMazeButton.disabled = true;
    maze.generateMaze(e.currentTarget[0].checked);
  });
};

var handleSearchExtras = function handleSearchExtras(maze) {

  var generateMazeButton = document.querySelector('#generate-maze-button');
  var dfsButton = document.querySelector('#dfs');
  var bfsButton = document.querySelector('#bfs');

  dfsButton.addEventListener("click", function (e) {
    e.preventDefault();
    generateMazeButton.disabled = true;
    dfsButton.disabled = true;
    bfsButton.disabled = true;
    var buttonsToEnable = [dfsButton, bfsButton, generateMazeButton];
    maze.dfs(buttonsToEnable);
  });

  bfsButton.addEventListener("click", function (e) {
    e.preventDefault();
    generateMazeButton.disabled = true;
    dfsButton.disabled = true;
    bfsButton.disabled = true;
    var buttonsToEnable = [dfsButton, bfsButton, generateMazeButton];
    maze.bfs(buttonsToEnable);
  });
};

document.addEventListener("DOMContentLoaded", function () {

  var root = document.querySelector('#root');

  window.maze = new _maze_grid2.default(60);

  handleMazeExtras(maze);

  handleSearchExtras(maze);

  root.appendChild(maze.grid);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maze_node = __webpack_require__(0);

var _maze_node2 = _interopRequireDefault(_maze_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeGrid = function () {
  // origin is top left, [0][0]
  // [row][col]
  function MazeGrid() {
    var dimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

    _classCallCheck(this, MazeGrid);

    this.mazeNodes = new Array(dimensions);
    for (var idx = 0; idx < dimensions; idx++) {
      this.mazeNodes[idx] = new Array(dimensions);
    }
    this.dimensions = dimensions;

    this.constructGrid();

    this.carveWall = this.carveWall.bind(this);
    this.checkIfLegal = this.checkIfLegal.bind(this);
    this.carveWallsBetweenNodes = this.carveWallsBetweenNodes.bind(this);
    this.nextPos = this.nextPos.bind(this);
    this.validPos = this.validPos.bind(this);
    this.neighborNodes = this.neighborNodes.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
    this.createMaze = this.createMaze.bind(this);
    this.animateMazeCreation = this.animateMazeCreation.bind(this);
    this.getNode = this.getNode.bind(this);
    this.dfs = this.dfs.bind(this);
    this.dfsearch = this.dfsearch.bind(this);
    this.bfs = this.bfs.bind(this);
    this.bfsearch = this.bfsearch.bind(this);
    this.resetPaths = this.resetPaths.bind(this);

    this.mazeSteps = [];
    this.visitedPath = [];
  }

  _createClass(MazeGrid, [{
    key: 'generateMaze',
    value: function generateMaze() {
      var instant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var startingPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];

      this.resetNodes();
      this.createMaze(startingPos);
      this.resetVisited();
      if (!instant) {
        this.animateMazeCreation(1);
      } else {
        for (var i = 0; i < this.mazeSteps.length; i++) {
          this.carveWall(this.mazeSteps[i].pos, this.mazeSteps[i].direction);
        }
        var generateMazeButton = document.querySelector('#generate-maze-button');
        generateMazeButton.disabled = false;
      }
    }
  }, {
    key: 'dfs',
    value: function dfs(buttonsToEnable, endPos) {
      this.resetPaths();

      if (!endPos) {
        endPos = [this.dimensions - 1, this.dimensions - 1];
      }

      var stack = [];
      var foundNode = this.dfsearch([0, 0], endPos, stack);

      this.animateVisitedPath(foundNode, buttonsToEnable);
    }
  }, {
    key: 'bfs',
    value: function bfs(buttonsToEnable, endPos) {
      this.resetPaths();

      if (!endPos) {
        endPos = [this.dimensions - 1, this.dimensions - 1];
      }

      var queue = [];
      var foundNode = this.bfsearch([0, 0], endPos, queue);
      this.animateVisitedPath(foundNode, buttonsToEnable);
    }

    /*  internal use methods   */

  }, {
    key: 'createMaze',
    value: function createMaze(currentPos) {
      var _this = this;

      var neighborNodes = this.neighborNodes(currentPos);
      var directions = this.shuffle(Object.keys(neighborNodes));
      this.mazeNodes[currentPos[0]][currentPos[1]].visited = true;

      directions.forEach(function (direction) {
        if (neighborNodes[direction] && neighborNodes[direction].node.visited === false) {
          _this.mazeSteps.push({ pos: currentPos, direction: direction });
          neighborNodes[direction].node.visited = true;
          _this.createMaze(neighborNodes[direction].node.pos);
        }
      });
    }
  }, {
    key: 'dfsearch',
    value: function dfsearch(currentPos, endPos, stack) {
      var currentNode = this.getNode(currentPos);
      var neighborNodes = this.neighborNodes(currentPos);

      if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
        //found
        currentNode.visited = true;
        return currentNode;
      }

      var validMoves = [];

      Object.keys(neighborNodes).forEach(function (direction) {
        if (!currentNode.walls[direction] && !neighborNodes[direction].node.visited) {
          validMoves.push(neighborNodes[direction]);
          neighborNodes[direction].node.parent = currentNode;
        }
      });

      stack = stack.concat(validMoves);

      while (stack.length > 0) {
        var n = stack.pop();
        currentNode.visited = true;
        this.visitedPath.push(currentNode);
        return this.dfsearch(n.node.pos, endPos, stack);
      }
    }
  }, {
    key: 'bfsearch',
    value: function bfsearch(currentPos, endPos, queue) {
      var currentNode = this.getNode(currentPos);
      var neighborNodes = this.neighborNodes(currentPos);

      if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
        //found
        currentNode.visited = true;
        return currentNode;
      }

      var validMoves = [];

      Object.keys(neighborNodes).forEach(function (direction) {
        if (!currentNode.walls[direction] && !neighborNodes[direction].node.visited) {
          validMoves.push(neighborNodes[direction]);
          neighborNodes[direction].node.parent = currentNode;
        }
      });

      queue = queue.concat(validMoves);

      while (queue.length > 0) {
        var n = queue.shift();
        currentNode.visited = true;
        this.visitedPath.push(currentNode);
        return this.bfsearch(n.node.pos, endPos, queue);
      }
    }
  }, {
    key: 'animateVisitedPath',
    value: function animateVisitedPath(foundNode, buttonsToEnable) {
      var _this2 = this;

      var visitedPath = this.visitedPath;

      var i = 0;
      var intervalId = null;
      intervalId = setInterval(function () {
        if (i < visitedPath.length) {
          visitedPath[i].toggleCurrent();
          visitedPath[i].setActive();
          if (i + 1 < visitedPath.length) {
            visitedPath[i + 1].toggleCurrent();
          }
          i += 1;
        } else {
          clearInterval(intervalId);
          _this2.animateFoundPath(foundNode, buttonsToEnable);
        }
      }, 1);
    }
  }, {
    key: 'animateFoundPath',
    value: function animateFoundPath(foundNode, buttonsToEnable) {
      var _this3 = this;

      var foundPath = [];

      while (foundNode.parent) {
        foundPath.push(foundNode);
        foundNode = foundNode.parent;
      }

      var i = 0;
      var intervalId = null;
      intervalId = setInterval(function () {
        if (i < foundPath.length) {
          foundPath[i].setPath();
          i += 1;
        } else {
          clearInterval(intervalId);
          _this3.getNode([0, 0]).setPath();
          buttonsToEnable.forEach(function (button) {
            button.disabled = false;
          });
        }
      }, 5);
    }
  }, {
    key: 'animateMazeCreation',
    value: function animateMazeCreation(intervalMs) {
      var _this4 = this;

      var i = 0;

      var intervalId = null;
      intervalId = setInterval(function () {
        if (i < _this4.mazeSteps.length) {
          if (_this4.carveWall(_this4.mazeSteps[i].pos, _this4.mazeSteps[i].direction)) {
            _this4.mazeNodes[_this4.mazeSteps[i].pos[0]][_this4.mazeSteps[i].pos[1]].setActive();
            _this4.nextPos(_this4.mazeSteps[i].pos, _this4.mazeSteps[i].direction).setActive();
          }
          i += 1;
        } else {
          clearInterval(intervalId);
          _this4.mazeSteps = [];
          var generateMazeButton = document.querySelector('#generate-maze-button');
          generateMazeButton.disabled = false;
          _this4.resetActive();
        }
      }, intervalMs);
    }
  }, {
    key: 'resetPaths',
    value: function resetPaths() {
      this.resetVisited();
      // this.mazeSteps = [];
      this.visitedPath = [];
      for (var i = 0; i < this.dimensions; i++) {
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j].removeTracesOfTravel();
        }
      }
    }
  }, {
    key: 'resetNodes',
    value: function resetNodes() {
      this.mazeSteps = [];
      this.visitedPath = [];
      for (var i = 0; i < this.dimensions; i++) {
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j].resetNode();
        }
      }
    }
  }, {
    key: 'resetVisited',
    value: function resetVisited() {
      for (var i = 0; i < this.dimensions; i++) {
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j].visited = false;
        }
      }
    }
  }, {
    key: 'resetActive',
    value: function resetActive() {
      for (var i = 0; i < this.dimensions; i++) {
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j].disableActive();
        }
      }
    }

    // shuffle source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  }, {
    key: 'shuffle',
    value: function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue = void 0,
          randomIndex = void 0;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  }, {
    key: 'constructGrid',
    value: function constructGrid() {
      this.grid = document.createElement('div');

      this.grid.classList.add('maze-grid');

      for (var i = 0; i < this.dimensions; i++) {
        var row = document.createElement('div');
        row.id = 'row-' + i;
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j] = new _maze_node2.default([i, j]);
          row.appendChild(this.mazeNodes[i][j].node());
        }
        this.grid.appendChild(row);
      }
    }
  }, {
    key: 'carveWall',
    value: function carveWall(pos, direction) {
      if (this.validPos(pos)) {
        if (this.checkIfLegal(pos, direction)) {
          this.carveWallsBetweenNodes(pos, direction);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }, {
    key: 'checkIfLegal',
    value: function checkIfLegal(pos, direction) {
      var row = pos[0];
      var col = pos[1];

      if (row === 0) {
        // top row
        if (direction == "N") {
          return false;
        }
      }
      if (row === this.dimensions - 1) {
        // bottom row
        if (direction == "S") {
          return false;
        }
      }
      if (col === 0) {
        // leftmost col
        if (direction == "W") {
          return false;
        }
      }
      if (col === this.dimensions - 1) {
        // rightmost col
        if (direction == "E") {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'carveWallsBetweenNodes',
    value: function carveWallsBetweenNodes(pos, direction) {
      this.mazeNodes[pos[0]][pos[1]].carveWall(direction);
      var nextPos = this.nextPos(pos, direction);
      if (nextPos) {
        nextPos.carveWall(this.oppositeDirection(direction));
      }
    }
  }, {
    key: 'oppositeDirection',
    value: function oppositeDirection(direction) {
      if (direction == "N") {
        return "S";
      }
      if (direction == "S") {
        return "N";
      }
      if (direction == "E") {
        return "W";
      }
      if (direction == "W") {
        return "E";
      }
    }
  }, {
    key: 'nextPos',
    value: function nextPos(currentPos, direction) {
      var nextPos = [currentPos[0], currentPos[1]];
      if (direction == "N") {
        nextPos[0] -= 1;
      } else if (direction == "S") {
        nextPos[0] += 1;
      } else if (direction == "E") {
        nextPos[1] += 1;
      } else if (direction == "W") {
        nextPos[1] -= 1;
      }
      if (this.validPos(nextPos)) {
        return this.mazeNodes[nextPos[0]][nextPos[1]];
      }
      return null;
    }
  }, {
    key: 'neighborNodes',
    value: function neighborNodes(pos) {
      var _this5 = this;

      var neighborNodes = {};

      var directions = ["N", "S", "E", "W"];

      directions.forEach(function (direction) {
        var nextNode = _this5.nextPos(pos, direction);
        if (nextNode !== null) {
          neighborNodes[direction] = { direction: direction, node: nextNode };
        }
      });

      return neighborNodes;
    }
  }, {
    key: 'validPos',
    value: function validPos(pos) {
      if (pos.length < 2) {
        return false;
      }
      if (pos[0] >= this.dimensions || pos[0] < 0) {
        return false;
      }
      if (pos[1] >= this.dimensions || pos[1] < 0) {
        return false;
      }
      return true;
    }
  }, {
    key: 'getNode',
    value: function getNode(pos) {
      return this.mazeNodes[pos[0]][pos[1]];
    }
  }]);

  return MazeGrid;
}();

exports.default = MazeGrid;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
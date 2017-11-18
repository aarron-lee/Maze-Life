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
    this.calculateHCost = this.calculateHCost.bind(this);
    this.addAllWalls = this.addAllWalls.bind(this);
    this.parent = null;
    this.pathNode = false;
    this.activeStatus = false;
    this.isCurrent = false;

    this.hCost = 0.0;
    this.fCost = 0.0;
    this.gCost = 0.0;
  }

  _createClass(MazeNode, [{
    key: "addAllWalls",
    value: function addAllWalls() {
      var _this2 = this;

      var directions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["N", "S", "E", "W"];

      directions.forEach(function (direction) {
        _this2.walls[direction] = true;
      });
      this.setWalls();
    }
  }, {
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
      var _this3 = this;

      var classes = ["north-wall", "south-wall", "east-wall", "west-wall"];

      classes.forEach(function (c) {
        _this3.htmlnode.classList.remove(c);
      });
    }
  }, {
    key: "resetNode",
    value: function resetNode() {
      var _this4 = this;

      this.directions.forEach(function (direction) {
        _this4.walls[direction] = true;
      });

      this.parent = null;
      this.pathNode = false;
      this.activeStatus = false;
      this.isCurrent = false;
      this.visited = false;
      this.htmlnode.className = "maze-node";

      this.fCost = 0;
      this.gCost = 0;

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

      this.fCost = 0;
      this.gCost = 0;

      this.htmlnode.className = "maze-node";
      this.setWalls();
    }

    /* A* search helper methods*/

  }, {
    key: "calculateHCost",
    value: function calculateHCost(endPos) {

      var a = endPos[0] - this.pos[0];
      var b = endPos[1] - this.pos[1];

      this.hCost = Math.sqrt(a * a + b * b);
      return this.hCost;
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

var handleMazeExtras = function handleMazeExtras(maze, buttonsToEnable) {
  var generateMazeForm = document.querySelector('#generate-maze-form');
  var astarGrid = document.querySelector('#generate-astar-maze-button');

  var disableButtons = function disableButtons(buttonsToDisable) {
    buttonsToDisable.forEach(function (button) {
      return button.disabled = true;
    });
  };

  var timers = document.querySelectorAll("[id^='timer-']");

  generateMazeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    timers.forEach(function (el) {
      return el.innerHTML = "0 ms";
    });
    disableButtons(buttonsToEnable);
    maze.generateMaze(e.currentTarget[0].checked, buttonsToEnable);
  });

  astarGrid.addEventListener("click", function (e) {
    e.preventDefault();
    maze.generateAstarGrid();
  });
};

var handleSearchExtras = function handleSearchExtras(maze, buttonsToEnable) {
  var dfsButton = document.querySelector('#dfs');
  var bfsButton = document.querySelector('#bfs');
  var astarButton = document.querySelector('#astar');

  var disableButtons = function disableButtons(buttonsToDisable) {
    buttonsToDisable.forEach(function (button) {
      return button.disabled = true;
    });
  };

  dfsButton.addEventListener("click", function (e) {
    e.preventDefault();
    disableButtons(buttonsToEnable);
    maze.dfs(buttonsToEnable);
  });

  bfsButton.addEventListener("click", function (e) {
    e.preventDefault();
    disableButtons(buttonsToEnable);
    maze.bfs(buttonsToEnable);
  });

  astarButton.addEventListener("click", function (e) {
    e.preventDefault();
    disableButtons(buttonsToEnable);
    maze.aStar(buttonsToEnable);
  });
};

document.addEventListener("DOMContentLoaded", function () {

  var generateMazeButton = document.querySelector('#generate-maze-button');
  var dfsButton = document.querySelector('#dfs');
  var bfsButton = document.querySelector('#bfs');
  var astarButton = document.querySelector('#astar');
  var astarGrid = document.querySelector('#generate-astar-maze-button');

  var buttons = [dfsButton, bfsButton, generateMazeButton, astarButton, astarGrid];

  var root = document.querySelector('#root');

  window.maze = new _maze_grid2.default(45);

  handleMazeExtras(maze, buttons);

  handleSearchExtras(maze, buttons);

  maze.generateMaze(true, []);

  root.appendChild(maze.grid);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    this.endPos = [this.dimensions - 1, this.dimensions - 1];
    this.constructGrid();

    this.carveWall = this.carveWall.bind(this);
    this.checkIfLegal = this.checkIfLegal.bind(this);
    this.carveWallsBetweenNodes = this.carveWallsBetweenNodes.bind(this);
    this.nextPos = this.nextPos.bind(this);
    this.validPos = this.validPos.bind(this);
    this.neighborNodes = this.neighborNodes.bind(this);
    this.validNeighborNodes = this.validNeighborNodes.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
    this.createMaze = this.createMaze.bind(this);
    this.animateMazeCreation = this.animateMazeCreation.bind(this);
    this.getNode = this.getNode.bind(this);
    this.dfs = this.dfs.bind(this);
    this.dfsearch = this.dfsearch.bind(this);
    this.bfs = this.bfs.bind(this);
    this.bfsearch = this.bfsearch.bind(this);
    this.resetPaths = this.resetPaths.bind(this);
    this.aStar = this.aStar.bind(this);
    this.aStarSearch = this.aStarSearch.bind(this);
    this.mazeSteps = [];
    this.visitedPath = [];

    this.gCost = 10;
  }

  _createClass(MazeGrid, [{
    key: "generateMaze",
    value: function generateMaze() {
      var instant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var buttonsToEnable = arguments[1];
      var startingPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];

      this.resetNodes();
      this.createMaze(startingPos);
      this.resetVisited();
      if (!instant) {
        this.animateMazeCreation(1, buttonsToEnable);
      } else {
        for (var i = 0; i < this.mazeSteps.length; i++) {
          this.carveWall(this.mazeSteps[i].pos, this.mazeSteps[i].direction);
        }
        this.enableButtons(buttonsToEnable);
      }
      this.endPos = [this.dimensions - 1, this.dimensions - 1];
    }
  }, {
    key: "generateAstarGrid",
    value: function generateAstarGrid(buttonsToEnable) {
      var _this = this;

      var startingPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];

      this.resetNodes();

      var directions = ["N", "S", "E", "W"];
      this.endPos = [31, 35];

      for (var i = 0; i < this.dimensions; i++) {
        var _loop = function _loop(j) {
          var currentNode = _this.mazeNodes[i][j];
          directions.forEach(function (direction) {
            _this.carveWall(currentNode.pos, direction);
          });
          currentNode.calculateHCost(_this.endPos);
        };

        for (var j = 0; j < this.dimensions; j++) {
          _loop(j);
        }
      }

      var row = 30;
      for (var _i = 15; _i < 40; _i++) {
        // this.getNode([35, i]).addAllWalls();
        this.fillSurroundingWall([row, _i]);
      }

      var col = 15;
      for (var _i2 = 31; _i2 < 37; _i2++) {
        // this.getNode([35, i]).addAllWalls();
        this.fillSurroundingWall([_i2, col]);
      }
    }
  }, {
    key: "generateStreetGrid",
    value: function generateStreetGrid(buttonsToEnable) {
      var _this2 = this;

      var startingPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];

      this.resetNodes();

      var directions = ["N", "S", "E", "W"];
      this.endPos = [this.dimensions - 1, this.dimensions - 1];

      for (var i = 0; i < this.dimensions; i++) {
        var _loop2 = function _loop2(j) {
          var currentNode = _this2.mazeNodes[i][j];
          directions.forEach(function (direction) {
            _this2.carveWall(currentNode.pos, direction);
          });
          currentNode.calculateHCost(_this2.endPos);
        };

        for (var j = 0; j < this.dimensions; j++) {
          _loop2(j);
        }
      }

      var toggle = false;

      for (var _i3 = 1; _i3 < this.dimensions - 1; _i3 += 2) {
        for (var j = 0; j < this.dimensions - 1; j++) {
          if (toggle) {
            this.fillSurroundingWall([_i3, j]);
          }
          toggle = !toggle;
        }
      }
    }
  }, {
    key: "dfs",
    value: function dfs(buttonsToEnable, endPos) {
      this.resetPaths();

      if (!endPos) {
        endPos = this.endPos;
      }

      var stack = [];
      var foundNode = this.dfsearch([0, 0], endPos, stack);

      this.animateVisitedPath(foundNode, buttonsToEnable, "timer-dfs");
    }
  }, {
    key: "bfs",
    value: function bfs(buttonsToEnable, endPos) {
      this.resetPaths();

      if (!endPos) {
        endPos = this.endPos;
      }

      var queue = [];
      var foundNode = this.bfsearch([0, 0], endPos, queue);
      this.animateVisitedPath(foundNode, buttonsToEnable, "timer-bfs");
    }
  }, {
    key: "aStar",
    value: function aStar(buttonsToEnable, endPos) {
      this.resetPaths();

      if (!endPos) {
        endPos = this.endPos;
      }

      var foundNode = this.aStarSearch([0, 0], endPos);

      this.animateVisitedPath(foundNode, buttonsToEnable, "timer-astar");
    }

    /*  internal use methods   */

  }, {
    key: "getLowestFCost",
    value: function getLowestFCost(openSet) {
      var openList = Array.from(openSet);
      var fCost = openList[0].fCost ? openList[0].fCost : 0;
      var node = openList[0];

      for (var i = 1; i < openList.length; i++) {
        var _currentNode = openList[i];
        if (_currentNode.fCost < fCost) {
          node = _currentNode;
          fCost = _currentNode.fCost;
        }
      }
      return node;
    }
  }, {
    key: "fillSurroundingWall",
    value: function fillSurroundingWall(pos) {
      var row = pos[0];
      var col = pos[1];

      this.getNode([row, col - 1]).addAllWalls(["E"]);
      this.getNode([row, col + 1]).addAllWalls(["W"]);
      this.getNode([row + 1, col]).addAllWalls(["N"]);
      this.getNode([row - 1, col]).addAllWalls(["S"]);
    }
  }, {
    key: "aStarSearch",
    value: function aStarSearch() {
      var _this3 = this;

      var startPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
      var endPos = arguments[1];


      var openList = new Set();
      openList.add(this.getNode(startPos));
      var closedList = new Set();

      var _loop3 = function _loop3() {
        var currentNode = _this3.getLowestFCost(openList);
        _this3.visitedPath.push(currentNode);
        if (currentNode.pos[0] === endPos[0] && currentNode.pos[1] === endPos[1]) {
          // found
          return {
            v: currentNode
          };
        }

        closedList.add(currentNode);
        openList.delete(currentNode);

        var neighborNodes = _this3.validNeighborNodes(currentNode);

        Object.keys(neighborNodes).forEach(function (direction) {
          var neighbor = neighborNodes[direction].node;
          if (closedList.has(neighbor)) {
            // not a valid node to process, continue
          } else {

            var gCost = currentNode.gCost + 0.1;
            var gCostIsBest = false;

            if (!openList.has(neighbor)) {
              gCostIsBest = true;
              openList.add(neighbor);
            } else if (gCost < neighbor.gCost) {
              gCostIsBest = true;
            }

            if (gCostIsBest) {
              neighbor.parent = currentNode;
              neighbor.gCost = gCost;
              neighbor.fCost = neighbor.gCost + neighbor.hCost;
            }
          } // end else
        }); // end forEach
      };

      while (openList.size > 0) {
        var _ret3 = _loop3();

        if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
      } // end while
      return null;
    }
  }, {
    key: "createMaze",
    value: function createMaze(currentPos) {
      var _this4 = this;

      var neighborNodes = this.neighborNodes(currentPos);
      var directions = this.shuffle(Object.keys(neighborNodes));
      this.mazeNodes[currentPos[0]][currentPos[1]].visited = true;

      directions.forEach(function (direction) {
        if (neighborNodes[direction] && neighborNodes[direction].node.visited === false) {
          _this4.mazeSteps.push({ pos: currentPos, direction: direction });
          neighborNodes[direction].node.visited = true;
          _this4.createMaze(neighborNodes[direction].node.pos);
        }
      });
    }
  }, {
    key: "dfsearch",
    value: function dfsearch(currentPos, endPos, stack) {
      var currentNode = this.getNode(currentPos);

      if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
        //found
        currentNode.visited = true;
        return currentNode;
      }

      var validMoves = this.validNeighborNodes(currentNode, true);

      stack = stack.concat(validMoves);

      while (stack.length > 0) {
        var n = stack.pop();
        currentNode.visited = true;
        this.visitedPath.push(currentNode);
        return this.dfsearch(n.node.pos, endPos, stack);
      }
    }
  }, {
    key: "bfsearch",
    value: function bfsearch(currentPos, endPos, queue) {
      var current = this.getNode(currentPos);
      queue.push({ node: current });

      while (queue.length > 0) {
        var c = queue.shift();

        if (c.node.pos[0] === endPos[0] && c.node.pos[1] === endPos[1]) {
          //found
          c.visited = true;
          return c.node;
        }

        var validMoves = this.validNeighborNodes(c.node, true, true);
        queue = queue.concat(validMoves);
        c.node.visited = true;
        this.visitedPath.push(c.node);
      }
    }
  }, {
    key: "animateVisitedPath",
    value: function animateVisitedPath(foundNode, buttonsToEnable, timerId) {
      var _this5 = this;

      var visitedPath = this.visitedPath;
      var timer = document.getElementById(timerId);
      var animationSpeed = document.getElementById('search-speed-slider').value;

      var startTime = new Date();
      var currentTime = new Date();

      var i = 0;
      var intervalId = null;
      intervalId = setInterval(function () {
        if (i === 0) {
          startTime = new Date();
        }
        if (i < visitedPath.length) {
          visitedPath[i].toggleCurrent();
          visitedPath[i].setActive();
          if (i + 1 < visitedPath.length) {
            visitedPath[i + 1].toggleCurrent();
          }
          i += 1;
          currentTime = new Date();
          timer.innerHTML = currentTime.getTime() - startTime.getTime() + " ms";
        } else {
          clearInterval(intervalId);
          _this5.animateFoundPath(foundNode, buttonsToEnable);
        }
      }, animationSpeed);
    }
  }, {
    key: "animateFoundPath",
    value: function animateFoundPath(foundNode, buttonsToEnable) {
      var _this6 = this;

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
          _this6.getNode([0, 0]).setPath();
          _this6.enableButtons(buttonsToEnable);
        }
      }, 3);
    }
  }, {
    key: "enableButtons",
    value: function enableButtons(buttons) {
      buttons.forEach(function (button) {
        button.disabled = false;
      });
    }
  }, {
    key: "animateMazeCreation",
    value: function animateMazeCreation(intervalMs, buttonsToEnable) {
      var _this7 = this;

      var i = 0;

      var intervalId = null;
      intervalId = setInterval(function () {
        if (i < _this7.mazeSteps.length) {
          if (_this7.carveWall(_this7.mazeSteps[i].pos, _this7.mazeSteps[i].direction)) {
            _this7.mazeNodes[_this7.mazeSteps[i].pos[0]][_this7.mazeSteps[i].pos[1]].setActive();
            _this7.nextPos(_this7.mazeSteps[i].pos, _this7.mazeSteps[i].direction).setActive();
          }
          i += 1;
        } else {
          clearInterval(intervalId);
          _this7.mazeSteps = [];
          var generateMazeButton = document.querySelector('#generate-maze-button');
          _this7.enableButtons(buttonsToEnable);
          _this7.resetActive();
        }
      }, intervalMs);
    }
  }, {
    key: "resetPaths",
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
    key: "resetNodes",
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
    key: "resetVisited",
    value: function resetVisited() {
      for (var i = 0; i < this.dimensions; i++) {
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j].visited = false;
        }
      }
    }
  }, {
    key: "resetActive",
    value: function resetActive() {
      for (var i = 0; i < this.dimensions; i++) {
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j].disableActive();
        }
      }
    }

    // shuffle source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  }, {
    key: "shuffle",
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
    key: "constructGrid",
    value: function constructGrid(endPos) {
      if (!endPos) {
        endPos = this.endPos;
      }
      this.grid = document.createElement('div');

      this.grid.classList.add('maze-grid');

      for (var i = 0; i < this.dimensions; i++) {
        var row = document.createElement('div');
        row.id = "row-" + i;
        for (var j = 0; j < this.dimensions; j++) {
          this.mazeNodes[i][j] = new _maze_node2.default([i, j]);
          this.mazeNodes[i][j].calculateHCost(this.endPos);
          row.appendChild(this.mazeNodes[i][j].node());
        }
        this.grid.appendChild(row);
      }
    }
  }, {
    key: "carveWall",
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
    key: "checkIfLegal",
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
    key: "carveWallsBetweenNodes",
    value: function carveWallsBetweenNodes(pos, direction) {
      this.mazeNodes[pos[0]][pos[1]].carveWall(direction);
      var nextPos = this.nextPos(pos, direction);
      if (nextPos) {
        nextPos.carveWall(this.oppositeDirection(direction));
      }
    }
  }, {
    key: "oppositeDirection",
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
    key: "nextPos",
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
    key: "neighborNodes",
    value: function neighborNodes(pos) {
      var _this8 = this;

      var neighborNodes = {};

      var directions = ["N", "S", "E", "W"];

      directions.forEach(function (direction) {
        var nextNode = _this8.nextPos(pos, direction);
        if (nextNode !== null) {
          neighborNodes[direction] = { direction: direction, node: nextNode };
        }
      });

      return neighborNodes;
    }
  }, {
    key: "validNeighborNodes",
    value: function validNeighborNodes(currentNode) {
      var setParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var setVisited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var pos = currentNode.pos;
      var neighborNodes = this.neighborNodes(pos);

      var validMoves = [];

      Object.keys(neighborNodes).forEach(function (direction) {
        if (!currentNode.walls[direction] && !neighborNodes[direction].node.visited) {
          validMoves.push(neighborNodes[direction]);
          if (setParent) {
            neighborNodes[direction].node.parent = currentNode;
          }
          if (setVisited) {
            neighborNodes[direction].node.visited = true;
          }
        }
      });
      return validMoves;
    }
  }, {
    key: "validPos",
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
    key: "getNode",
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
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _maze_node = __webpack_require__(1);

var _maze_node2 = _interopRequireDefault(_maze_node);

var _maze_grid = __webpack_require__(2);

var _maze_grid2 = _interopRequireDefault(_maze_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {

  // window.node = new MazeNode([1,2]);

  window.mount = document.querySelector('#root');

  window.grid = new _maze_grid2.default();

  root.appendChild(grid.grid);
});

/***/ }),
/* 1 */
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
  }

  _createClass(MazeNode, [{
    key: "carveWall",
    value: function carveWall(direction) {
      if (direction && this.directions.includes(direction)) {
        this.walls[direction] = false;
        this.resetWalls();
        this.setWalls();
        return direction;
      }
      return null;
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
    key: "resetWalls",
    value: function resetWalls() {
      var _this2 = this;

      var classes = ["north-wall", "south-wall", "east-wall", "west-wall"];

      classes.forEach(function (c) {
        _this2.htmlnode.classList.remove(c);
      });
    }
  }]);

  return MazeNode;
}();

exports.default = MazeNode;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maze_node = __webpack_require__(1);

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
  }

  _createClass(MazeGrid, [{
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
        this.mazeNodes[pos[0]][pos[1]].carveWall(direction);
        var nextPos = this.nextPos(pos, direction);
        if (nextPos) {
          nextPos.carveWall(this.oppositeDirection(direction));
        }
        return true;
      } else {
        return false;
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
    key: 'validPos',
    value: function validPos(pos) {
      if (pos[0] && pos[1]) {
        if (pos[0] >= this.dimensions || pos[0] < 0) {
          return false;
        }
        if (pos[1] >= this.dimensions || pos[1] < 0) {
          return false;
        }
      }
      return true;
    }
  }]);

  return MazeGrid;
}();

exports.default = MazeGrid;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
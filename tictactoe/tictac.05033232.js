// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Focm":[function(require,module,exports) {
'use strict';
/* Utility functions */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function delegate(target, selector, event, callback) {
  target.addEventListener(event, function (event) {
    var element = event.target.closest(selector);

    if (element) {
      callback(element, event);
    }
  });
}
/* The Game Data */


var Board = /*#__PURE__*/function () {
  function Board() {
    _classCallCheck(this, Board);

    this.initData();
  }

  _createClass(Board, [{
    key: "update",
    value: function update(x, y, char) {
      this.data[x][y] = char;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "hasSlot",
    value: function hasSlot(x, y) {
      return this.data[x][y] === 0;
    }
  }, {
    key: "checkForTriplet",
    value: function checkForTriplet(x, y, char) {
      var result = true;

      for (var i = 0; i < 3; i++) {
        result = result && this.data[x][i] === char;
      }

      if (result) return true;
      result = true;

      for (var _i = 0; _i < 3; _i++) {
        result = result && this.data[_i][y] === char;
      }

      if (result) return true;
      result = true;

      for (var _i2 = 0; _i2 < 3; _i2++) {
        result = result && this.data[_i2][_i2] === char;
      }

      if (result) return true;
      result = true;

      for (var _i3 = 0; _i3 < 3; _i3++) {
        result = result && this.data[_i3][2 - _i3] === char;
      }

      if (result) return true;
      return false;
    }
  }, {
    key: "initData",
    value: function initData() {
      this.data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }
  }]);

  return Board;
}();
/* The Game View */


var View = /*#__PURE__*/function () {
  function View() {
    _classCallCheck(this, View);

    this.viewHasOverlay = false;
    this.activePlayer = null;
    this.currentCell = 'null';
    this.container = document.querySelector('.container');
    this.grid = document.querySelector('.grid');
    this.resetBtn = document.querySelector('.restart');
    this.overlay = document.querySelector('.overlay');
    this.emojis = {
      'o': '⭕',
      'x': '❌'
    };
  }

  _createClass(View, [{
    key: "showBoard",
    value: function showBoard(data) {
      var gridHtml = '';
      data.forEach(function (row, x) {
        gridHtml += '<div class="row">';
        row.forEach(function (col, y) {
          gridHtml += "<div class=\"cell\" data-x=\"".concat(x, "\" data-y=\"").concat(y, "\"></div>");
        });
        gridHtml += '</div>';
      });
      this.grid.innerHTML = gridHtml;
    }
  }, {
    key: "updateCell",
    value: function updateCell(currentPlayerChar) {
      this.currentCell.classList.add(currentPlayerChar);
      this.currentCell.textContent = this.emojis[currentPlayerChar];
    }
  }, {
    key: "setGamesWon",
    value: function setGamesWon(data) {
      var text = "".concat(data['x'], " &nbsp;&nbsp;:&nbsp;&nbsp; ").concat(data['o']);
      document.querySelector('.score').innerHTML = text;
    }
  }, {
    key: "registerMoveEvent",
    value: function registerMoveEvent(handler) {
      var _this = this;

      delegate(this.grid, '.row .cell', 'click', function (element, event) {
        _this.currentCell = element;
        handler(element.dataset.x, element.dataset.y);
      });
    }
  }, {
    key: "registerResetEvent",
    value: function registerResetEvent(handler) {
      var _this2 = this;

      delegate(this.container, 'button', 'click', function (element, even) {
        if (_this2.viewHasOverlay) {
          _this2.overlay.style.display = 'none';
          _this2.viewHasOverlay = false;
        }

        handler();
      });
    }
  }, {
    key: "setActivePlayer",
    value: function setActivePlayer(currentPlayer) {
      var playerClass = ".player-".concat(currentPlayer);
      var playerElement = document.querySelector(playerClass);

      if (this.activePlayer) {
        this.activePlayer.classList.remove('active');
      }

      playerElement.classList.add('active');
      this.activePlayer = playerElement;
    }
  }, {
    key: "showGameOverMessage",
    value: function showGameOverMessage(message) {
      this.overlay.style.display = 'flex';
      var messageElement = this.overlay.querySelector('.message');
      messageElement.textContent = message;
      this.viewHasOverlay = true;
    }
  }]);

  return View;
}();
/* The Controller Class */


var TicTacToe = /*#__PURE__*/function () {
  function TicTacToe(board, view) {
    _classCallCheck(this, TicTacToe);

    this.players = ['o', 'x'];
    this.gamesWon = {
      x: 0,
      o: 0
    };
    this.board = board;
    this.view = view;
    this.view.registerMoveEvent(this.makeMove.bind(this));
    this.view.registerResetEvent(this.resetGame.bind(this));
    this.init();
  }

  _createClass(TicTacToe, [{
    key: "init",
    value: function init() {
      this.moveCount = 0;
      this.currentPlayer = this.randomize();
      this.view.showBoard(this.board.getData());
      this.view.setActivePlayer(this.players[this.currentPlayer]);
      this.view.setGamesWon(this.gamesWon);
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.board.initData();
      this.init();
    }
  }, {
    key: "makeMove",
    value: function makeMove(x, y) {
      if (!this.validMove(x, y)) return;
      this.moveCount++;
      this.board.update(x, y, this.players[this.currentPlayer]);
      this.view.updateCell(this.players[this.currentPlayer]);

      if (this.board.checkForTriplet(x, y, this.players[this.currentPlayer])) {
        this.gamesWon[this.players[this.currentPlayer]]++;
        this.view.showGameOverMessage("Player ".concat(this.players[this.currentPlayer].toUpperCase(), " has Won! \uD83C\uDF89"));
      } else if (this.moveCount === 9) {
        this.view.showGameOverMessage('Game has Drawn! 😂');
      } else {
        this.togglePlayer();
        this.view.setActivePlayer(this.players[this.currentPlayer]);
      }
    }
  }, {
    key: "randomize",
    value: function randomize() {
      return Math.random() > 0.5 ? 1 : 0;
    }
  }, {
    key: "togglePlayer",
    value: function togglePlayer() {
      this.currentPlayer = Number(!this.currentPlayer);
    }
  }, {
    key: "validMove",
    value: function validMove(x, y) {
      if (this.board.hasSlot(x, y)) {
        return true;
      }

      return false;
    }
  }]);

  return TicTacToe;
}();
/* Initialize the Game */


var board = new Board();
var view = new View();
var game = new TicTacToe(board, view);
},{}]},{},["Focm"], null)
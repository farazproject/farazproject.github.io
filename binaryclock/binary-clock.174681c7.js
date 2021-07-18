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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BinaryClock = /*#__PURE__*/function () {
  function BinaryClock() {
    _classCallCheck(this, BinaryClock);

    this.$grid = document.querySelector('.grid');
    this.$time = document.querySelector('.time');
    this.init();
  }

  _createClass(BinaryClock, [{
    key: "init",
    value: function init() {
      setInterval(this.updateTime.bind(this), 1000);
    }
  }, {
    key: "updateTime",
    value: function updateTime() {
      var time = new Date().toTimeString();
      time = time.split(' ')[0];
      var timeString = time.replaceAll(':', '');
      var binaryGrid = this.convertToBinaryGrid(timeString);
      this.showBinaryTime(binaryGrid);
      this.$time.innerHTML = time;
    }
  }, {
    key: "convertToBinaryGrid",
    value: function convertToBinaryGrid(timeString) {
      var paddings = [2, 4, 3, 4, 3, 4];
      var grid = [];
      timeString.split('').forEach(function (digit, index) {
        var paddedBinary = (+digit).toString(2).padStart(paddings[index], '0');
        grid.push(paddedBinary.split(''));
      });
      return grid;
    }
  }, {
    key: "showBinaryTime",
    value: function showBinaryTime(binaryGrid) {
      var output = '';
      binaryGrid.forEach(function (col) {
        output += '<div class="col">';
        col.forEach(function (binaryDigit) {
          output += "<div class=\"cell ".concat(binaryDigit === '1' ? 'active' : '', "\"></div>");
        });
        output += '</div>';
      });
      this.$grid.innerHTML = output;
    }
  }]);

  return BinaryClock;
}();

var clock = new BinaryClock();
},{}]},{},["Focm"], null)
//# sourceMappingURL=/binary-clock.174681c7.js.map
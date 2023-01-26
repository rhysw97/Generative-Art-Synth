"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sketch;

var Tone = _interopRequireWildcard(require("tone"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function sketch(p) {
  var wave;
  var ready = false;

  p.setup = function () {
    p.createCanvas(500, 500);
    wave = new Tone.Waveform();
    Tone.Master.connect(wave);
    console.log(wave);
    Tone.Master.volume.value = -9;
  };

  p.draw = function () {
    p.background(0);

    if (ready) {
      //sound
      p.stroke(255);
      var buffer = wave.getValue(0); //look for point when samples go from - to +

      var start = 0;

      for (var i = 1; i < buffer.length; i++) {
        if (buffer[i - 1] < 0 && buffer[i] >= 0) {
          start = i;
          break;
        }
      }

      var end = start + buffer.length;

      for (var _i = start; _i < end; _i++) {
        var x1 = p.map(_i - 1, start, end, 0, p.width);
        var y1 = p.map(buffer[_i - 1], -1, 1, 0, p.height); //let x1 = p.map(buffer[i - 1], -1, 1, 0, p.height)

        var x2 = p.map(_i, start, end, 0, p.width);
        var y2 = p.map(buffer[_i], -1, 1, 0, p.height);
        p.line(x1, y1, x2, y2);
      }
    }
  };

  p.mousePressed = function () {
    if (!ready) {
      console.log('1');
      ready = true;
    }
  };
}
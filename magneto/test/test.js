'use strict';

var assert = require('assert');

var magnetoEffect = require('../src/magneto.js').magnetoEffect;

suite('magnetoEffect', function() {

  test( 'Get magnetic points', function() {
    var magneticPoints = magnetoEffect.getMagneticPoints();
    assert.deepEqual([], magneticPoints);
  });

  test( 'Test magnetic points isolation', function() {
    var magneticPoints = magnetoEffect.getMagneticPoints();
    magneticPoints.push({x:50,y:50});
    var magneticPoints2 = magnetoEffect.getMagneticPoints();
    assert.deepEqual([], magneticPoints2);
  });

  test( 'Adding magnetic point', function() {
    magnetoEffect.addMagneticPoint({x:50,y:50});
    var magneticPoints = magnetoEffect.getMagneticPoints();
    assert.deepEqual([{x:50,y:50}], magneticPoints);
  });

  test( 'Reset magnetic points', function() {
    magnetoEffect.addMagneticPoint({x:50,y:50}).addMagneticPoint({x:100,y:50});
    magnetoEffect.removeMagneticPoints();
    var magneticPoints = magnetoEffect.getMagneticPoints();
    assert.deepEqual([], magneticPoints);
  });

  test( 'Example 1', function() {
    magnetoEffect.removeMagneticPoints();
    magnetoEffect.addMagneticPoint({x:50,y:50});
    var adjustedPoint = magnetoEffect.adjustPoint({x:49,y:50});
    assert.deepEqual({x:50,y:50}, adjustedPoint);
  });

  test( 'Example 2', function() {
    magnetoEffect.removeMagneticPoints();
    magnetoEffect.addMagneticPoint({x:50,y:50});
    var adjustedPoint = magnetoEffect.adjustPoint({x:0,y:0});
    assert.deepEqual({x:0,y:0}, adjustedPoint);
  });

  test( 'Example 3', function() {
    magnetoEffect.removeMagneticPoints();
    magnetoEffect.addMagneticPoint({x:50,y:50}).addMagneticPoint({x:100,y:50});
    var adjustedPoint = magnetoEffect.adjustPoint({x:101,y:48});
    assert.deepEqual({x:100,y:50}, adjustedPoint);
  });

  test( 'Example 4', function() {
    magnetoEffect.removeMagneticPoints();
    magnetoEffect.addMagneticPoint({x:50,y:50}).addMagneticPoint({x:51,y:51});
    var adjustedPoint = magnetoEffect.adjustPoint({x:51,y:52});
    assert.deepEqual({x:51,y:51}, adjustedPoint);
  });

  test( 'Check radius', function() {
    magnetoEffect.removeMagneticPoints();
    magnetoEffect.addMagneticPoint({x:50,y:50}).addMagneticPoint({x:51,y:55});
    var adjustedPoint = magnetoEffect.adjustPoint({x:52,y:52});
    assert.deepEqual({x:50,y:50}, adjustedPoint);
  });
});

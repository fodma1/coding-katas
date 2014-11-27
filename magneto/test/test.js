'use strict';

var assert = require('assert');

var magnetoEffect = require('../src/magneto.js').magnetoEffect;

suite('magnetoEffect', function() {

  test( 'Adding magnetic point', function() {
    magnetoEffect.addMagneticPoint((50,50));
    var magneticPoints = magnetoEffect.getMagneticPoints();
    assert.deepEqual([(50,50)], magneticPoints);
  });

  test( 'Reset magnetic points', function() {
    magnetoEffect.addMagneticPoint((50,50)).addMagneticPoint((100,100));
    magnetoEffect.removeMagneticPoints();
    var magneticPoints = magnetoEffect.getMagneticPoints();
    assert.deepEqual([], magneticPoints);
  });

  test( 'Example 1', function() {
    magnetoEffect.removeMagneticPoints();
    magnetoEffect.addMagneticPoint((50,50));
    var adjustedPoint = magnetoEffect.adjustPoint((49,50));
    assert.deepEqual((50,50), adjustedPoint);
  });

  test( 'Example 2', function() {
    magnetoEffect.removeMagneticPoints();
    magnetoEffect.addMagneticPoint((50,50));
    var adjustedPoint = magnetoEffect.adjustPoint((0,0));
    assert.deepEqual((0,0), adjustedPoint);
  });
});

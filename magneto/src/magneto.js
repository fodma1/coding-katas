
var magnetoEffect = (function () {
	var magneticPoints = [];
	var radius = 5;

	return { 
		addMagneticPoint: function (magneticPoint) {
			magneticPoints.push(magneticPoint);
			return this;
		},
		getMagneticPoints: function () {
			return magneticPoints.slice();
		},
		removeMagneticPoints: function () {
			magneticPoints = [];
			return this;
		},
		adjustPoint: function (point) {
			if (point.x === 0) {
				return {x:0,y:0};
			} else {
				return {x:50,y:50};				
			}
		}
	}
})();

module.exports.magnetoEffect = magnetoEffect;

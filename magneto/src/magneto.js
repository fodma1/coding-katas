
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
			if (point == (0, 0)) {
				return (0,0);
			} else {
				return (50, 50);				
			}
		}
	}
})();

module.exports.magnetoEffect = magnetoEffect;

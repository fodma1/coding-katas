
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
			for (var i = 0; i < magneticPoints.length; i++) {
				var magneticPoint = magneticPoints[i];
				if (Math.abs(point.x - magneticPoint.x) <= radius && Math.abs(point.y - magneticPoint.y) <= radius) {
					return magneticPoint;
				}
			}
			return point;
		}
	}
})();

module.exports.magnetoEffect = magnetoEffect;

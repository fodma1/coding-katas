
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
			var minDistance = 5.0;
			var adjustedPoint = point;

			for (var i = 0; i < magneticPoints.length; i++) {
				var magneticPoint = magneticPoints[i];
				var distanceX = Math.abs(point.x - magneticPoint.x);
				var distanceY = Math.abs(point.y - magneticPoint.y);
				if (distanceX <= radius && distanceY <= radius) {
					var distance = Math.min(distanceX, distanceY);
					if (distance < minDistance) {
						adjustedPoint = magneticPoint;
						minDistance = distance;
					}
				}
			}
			return adjustedPoint;
		}
	}
})();

module.exports.magnetoEffect = magnetoEffect;

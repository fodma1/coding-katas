
var magnetoEffectConstructor = function (_radius) {
	var magneticPoints = [];
	var radius = _radius || 5.0;

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
			var reduceFN = function (result, magneticPoint) {
				var distanceX = Math.abs(point.x - magneticPoint.x);
				var distanceY = Math.abs(point.y - magneticPoint.y);
				if (distanceX <= radius && distanceY <= radius) {
					var distance = distanceX * distanceX + distanceY * distanceY;
					if (distance < result.minDistance) {
						return {minDistance: distance, adjustedPoint: magneticPoint};
					}
				}
				return result;
			};
			var finalState = magneticPoints.reduce(reduceFN, {minDistance: radius * radius, adjustedPoint: point});
			return finalState.adjustedPoint;
		}

	}
};
var magnetoEffect = magnetoEffectConstructor();

module.exports.magnetoEffect = magnetoEffect;

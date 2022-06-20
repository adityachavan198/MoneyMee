window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
			  window.setTimeout(callback, 1000 / 60);
			};
  })();
  
  var BezierCurve = (function() {
   'use strict';
	var width, height,
		canvas, ctx,
		points;
  
	function init(size, cnvs) {
	  width = size.width;
	  height = size.height;
	  canvas = cnvs;
	  ctx = canvas.getContext('2d');
  
	  points = generatePoints(width / 3, width / 15);
  
	  canvas.width = width;
	  canvas.height = height;
  
	  ctx.fillStyle = '#2f2f2f';
	}
  
	function render() {
	  ctx.fillRect(0, 0, width, height);
	  renderBezier(ctx);
	}
  
	function renderBezier(ctx) {
	  var radius, 
		  point, nextPoint, ctrlPoint,
		  i, len;
  
	  radius = 3;
	  ctrlPoint = {};
  
	  ctx.save();
	  ctx.lineWidth = 2;
	  ctx.strokeStyle = '#fff';
	  ctx.beginPath();
	  ctx.moveTo(points[0].x, points[0].y2);
	  for (i = 0, len = points.length - 1; i < len; i += 1) {
  
		point = points[i];
		nextPoint = points[i + 1];
		ctrlPoint.x = (point.x + nextPoint.x) / 2;
		ctrlPoint.y = (point.y + nextPoint.y) / 2;
  
		ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
  
	  }
  
	  ctx.quadraticCurveTo(
		points[points.length - 1].x,
		points[points.length - 1].y,
		(points[points.length - 1].x + points[points.length - 1].x) / 2,
		(points[points.length - 1].y2 + points[points.length - 1].y2) / 2
	  );
  
	  ctx.stroke();
	  for (i = 0, len = points.length; i < len; i += 1) {
  
		point = points[i];
		nextPoint = points[i + 1];
  
		point.vx += (point.targetX - point.x) * point.speed;
		point.vy += (point.targetY - point.y) * point.speed;
  
		point.vx *= point.gravity;
		point.vy *= point.gravity;
  
		point.x += point.vx;
		point.y += point.vy;
  
		point.y2 += point.vy;
  
		if (i !== len - 1) {
  
		  // direct curves
		  ctx.lineWidth = 0.3;
		  ctx.strokeStyle = 'rgba(255,255,255,0.20)';
		  ctx.beginPath();
		  ctx.moveTo(point.x, point.y2);
		  ctx.quadraticCurveTo(
			nextPoint.x,
			nextPoint.y,
			point.x + (nextPoint.x - point.x),
			point.y2 + (nextPoint.y2 - point.y2)
		  );
		  ctx.stroke();
		  ctx.closePath();
  
		  // direct lines
		  ctx.lineWidth = 0.25;
		  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
		  ctx.beginPath();
		  ctx.moveTo(point.x, point.y2);
		  ctx.lineTo(nextPoint.x, nextPoint.y2);
		  ctx.closePath();
		  ctx.stroke();
		}
  
		ctx.fillStyle = 'rgba(255,255,255,0.05)';
		ctx.beginPath();
		ctx.arc(point.x, point.y2, radius * 5, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.fillStyle = '#f39c12';
		ctx.beginPath();
		ctx.arc(point.x, point.y2, radius * 2, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.fillStyle = '#f1c40f';
		ctx.beginPath();
		ctx.arc(point.x, point.y2, radius, 0, Math.PI * 2, true);
		ctx.fill();            
  
	  }
	  ctx.restore();
	}
  
	function generatePoints(range, spacing) {
	  var x, y,
		  point, points,
		  yRange, offset
  
	  yRange = height / 2;
	  points = [];
  
	  for (x = width / 2 - range; x < width / 2 + range; x += spacing) {
		offset = Math.random() * height / 3.5 - height / 7;
		y = height / 2 - yRange / 2 + Math.random() * yRange;
		point = { 
		  x: x + offset, 
		  y: y + offset * 2,
		  y2: y + offset,
		  targetX: x,
		  targetY: y,
		  vx: 0,
		  vy: 0,
		  speed: 0.15,
		  gravity: 0.85
		}
		points.push(point);
	  }
  
	  return points;
  
	}
  
	function updateYCoords(range) {
	  points.forEach(function(point) {
		point.targetY = height / 2 - range / 2 + Math.random() * range * 1.2;
	  });
	}
  
	return {
	  init: init,
	  render: render,
	  updateYCoords: updateYCoords
	}
  
  }());
  
  var canvas, size, shuffle,
	  range;
  
  canvas = document.querySelector('canvas');
  size = {width: window.innerWidth, height: window.innerHeight}
  
  BezierCurve.init(size, canvas);
  
  range = window.innerHeight / 2;
  setInterval(function() {
	BezierCurve.updateYCoords(range);
  }, 1750);
  
  (function renderFrame() {
	window.requestAnimFrame(renderFrame);
	BezierCurve.render();
  }());
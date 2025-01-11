// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color  
}

function drawVector(v, color) {
  // get canvas
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d'); 
  //draw on canvas
  ctx.beginPath();
  ctx.moveTo(200, 200); // go to center of page
  ctx.strokeStyle = color; // change color
  ctx.lineTo(200+v.elements[0]*20, 200-v.elements[1]*20); // scale + correct coords
  //console.log(v.elements[0], v.elements[1])
  ctx.stroke(); // render line
}

function handleDrawEvent() {
  // get canvas
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d'); 

  // Draw a black rectangle (reset the canvas)
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color

  let v1 = getVector('x1', 'y1', 'z1')
  let v2 = getVector('x2', 'y2', 'z2')

  // draw
  drawVector(v1, 'red')
  drawVector(v2, 'blue')
  
}

function getVector(str_x, str_y, str_z) {
  let list = []
  var x = parseFloat(document.getElementById(str_x).value);
  var y = parseFloat(document.getElementById(str_y).value);
  var z = 0

  // populate vector 1 array
  list.push(x);
  list.push(y);
  list.push(z);
  
  for (var i = 0; i < 3; ++i) {
    if (Number.isNaN(list[i])) {
      list[i] = 0
    }
  }

  v = new Vector3(list)
  return v
}

function handleDrawOperationEvent() {
  // get canvas
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d'); 

  // Draw a black rectangle (reset the canvas)
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color
  
  var op = document.getElementById('ops').value;

  let v1 = getVector('x1', 'y1', 'z1');
  let v2 = getVector('x2', 'y2', 'z2');
  
  switch (op) {
    case 'Add':

      drawVector(v1, 'red');
      drawVector(v2, 'blue');
      drawVector(v1.add(v2), 'green');
      return
    case 'Subtract':

      drawVector(v1, 'red');
      drawVector(v2, 'blue');
      drawVector(v1.sub(v2), 'green');
      return
    case 'Multiply':
      var scalar = document.getElementById('scalar').value;

      drawVector(v1, 'red');
      drawVector(v2, 'blue');
      drawVector(v1.mul(scalar), 'green');
      drawVector(v2.mul(scalar), 'green');
      return
    case 'Divide':
      var scalar = document.getElementById('scalar').value;

      drawVector(v1, 'red');
      drawVector(v2, 'blue');
      drawVector(v1.div(scalar), 'green');
      drawVector(v2.div(scalar), 'green');
      return
    case 'Magnitude':
      drawVector(v1, 'red');
      drawVector(v2, 'blue');

      var m1, m2;
      m1 = v1.magnitude();
      console.log('Magnitude: ', m1)
      m2 = v2.magnitude();
      console.log('Magnitude: ', m2)
      return
    case 'Normalize':
      drawVector(v1, 'red');
      drawVector(v2, 'blue');
      drawVector(v1.normalize(), 'green');
      drawVector(v2.normalize(), 'green');
      return
    case 'Angle between':
      drawVector(v1, 'red');
      drawVector(v2, 'blue');

      var alpha, dot_prod;
      
      dot_prod = Vector3.dot(v1, v2);
      alpha = Math.acos(dot_prod / (v1.magnitude() * v2.magnitude()));
      console.log("Angle: ", alpha * (180 / Math.PI));
      return
    case 'Area':
      drawVector(v1, 'red');
      drawVector(v2, 'blue');

      var cross_prod, area;
      cross_prod = Vector3.cross(v1, v2)
      area = cross_prod.magnitude() / 2

      console.log('Area of the Triangle: ', area)
  }
}
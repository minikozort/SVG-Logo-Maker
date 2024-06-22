const { SVG, Rect, Circle, Polygon } = require('@svgdotjs/svg.js');

class Shapes {
  constructor(width, height) {
    this.canvas = SVG().size(width, height);
  }

  drawCircle(cx, cy, radius, options = {}) {
    return this.canvas.circle(radius * 2)
                     .cx(cx)
                     .cy(cy)
                     .attr(options);
  }

  drawSquare(x, y, size, options = {}) {
    return this.canvas.rect(size, size)
                     .x(x)
                     .y(y)
                     .attr(options);
  }

  drawTriangle(points, options = {}) {
    return this.canvas.polygon(points)
                     .attr(options);
  }

  render() {
    return this.canvas.svg();
  }
}

// Example usage:
const shapes = new Shapes(300, 300);
shapes.drawCircle(50, 50, 30, { fill: 'blue' });
shapes.drawSquare(100, 50, 60, { fill: 'green' });
shapes.drawTriangle('0,0 100,0 50,100', { fill: 'yellow' });

console.log(shapes.render());

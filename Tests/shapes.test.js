const Shapes = require('../Lib/shapes'); // Assuming Shapes class is defined in 'Lib/Shapes.js'
const fs = require('fs'); // For file system operations (optional for saving SVG)

describe('Shapes', () => {
  let shapes;

  beforeEach(() => {
    shapes = new Shapes(300, 200); // Initialize Shapes instance with canvas size 300x200
  });

  test('should draw a circle', () => {
    shapes.drawCircle(50, 50, 30, { fill: 'blue' });
    const svg = shapes.render();
    // Assertions for circle
    expect(svg).toContain('<circle'); // Check if SVG contains a circle element
    expect(svg).toContain('cx="50"');
    expect(svg).toContain('cy="50"');
    expect(svg).toContain('r="30"');
    expect(svg).toContain('fill="blue"');
  });

  test('should draw a square', () => {
    shapes.drawSquare(100, 50, 60, { fill: 'green' });
    const svg = shapes.render();
    // Assertions for square
    expect(svg).toContain('<rect'); // Check if SVG contains a rect element
    expect(svg).toContain('x="100"');
    expect(svg).toContain('y="50"');
    expect(svg).toContain('width="60"');
    expect(svg).toContain('height="60"'); // Assuming square size is defined by width
    expect(svg).toContain('fill="green"');
  });

  test('should draw a triangle', () => {
    shapes.drawTriangle('0,0 100,0 50,100', { fill: 'yellow' });
    const svg = shapes.render();
    // Assertions for triangle
    expect(svg).toContain('<polygon'); // Check if SVG contains a polygon element
    expect(svg).toContain('points="0,0 100,0 50,100"');
    expect(svg).toContain('fill="yellow"');
  });

  // Optionally, you can save the SVG to a file for manual inspection
  afterAll(() => {
    const svg = shapes.render();
    fs.writeFileSync('shapes.svg', svg); // Save SVG to a file
  });
});

const { Circle, Square, Triangle } = require('../Lib/shapes');

describe('Circle', () => {
    it('should render a circle with the correct fill color', () => {
        const circle = new Circle();
        circle.setColor('red');
        const svg = circle.render();
        expect(svg).toContain('<circle cx="150" cy="100" r="80" fill="red" />');
    });
});

describe('Square', () => {
    it('should render a square with the correct fill color', () => {
        const square = new Square();
        square.setColor('blue');
        const svg = square.render();
        expect(svg).toContain('<rect x="50" y="50" width="300" height="300" fill="blue" />');
    });
});

describe('Triangle', () => {
    it('should render a triangle with the correct fill color', () => {
        const triangle = new Triangle();
        triangle.setColor('green');
        const svg = triangle.render();
        expect(svg).toContain('<polygon points="150,20 250,180 50,180" fill="green" />');
    });
});

describe('Shapes', () => {
    it('should set the color correctly', () => {
        const shape = new Shapes();
        shape.setColor('yellow');
        expect(shape.color).toBe('yellow');
    });
});

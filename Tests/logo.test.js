const fs = require('fs');
const path = require('path');
const { Circle, Square, Triangle } = require('../Lib/shapes.js');
const Logo = require('../Lib/logo.js');

// Mocking fs.writeFileSync for testing saveToFile method
jest.mock('fs');
const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

describe('Logo', () => {
    let logo;

    beforeEach(() => {
        logo = new Logo();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    describe('setTextInput', () => {
        it('should set text and textColor properties', () => {
            logo.setTextInput('abc', 'red');
            expect(logo.text).toBe('ABC');
            expect(logo.textColor).toBe('red');
        });
    });

    describe('setShapeInput', () => {
        it('should set shape and shapeColor properties for circle', () => {
            logo.setShapeInput('circle', 'green');
            expect(logo.shape instanceof Circle).toBeTruthy();
            expect(logo.shapeColor).toBe('green');
        });

        it('should set shape and shapeColor properties for square', () => {
            logo.setShapeInput('square', 'blue');
            expect(logo.shape instanceof Square).toBeTruthy();
            expect(logo.shapeColor).toBe('blue');
        });

        it('should set shape and shapeColor properties for triangle', () => {
            logo.setShapeInput('triangle', 'yellow');
            expect(logo.shape instanceof Triangle).toBeTruthy();
            expect(logo.shapeColor).toBe('yellow');
        });

        it('should throw an error for invalid shape input', () => {
            expect(() => logo.setShapeInput('invalid', 'red')).toThrow('Invalid shape selected');
        });
    });

    describe('generateSVG', () => {
        it('should generate SVG with default text position for circle', () => {
            logo.setTextInput('abc', 'red');
            logo.setShapeInput('circle', 'green');
            const svgContent = logo.generateSVG();
            expect(svgContent).toContain('<circle cx="150" cy="100" r="80" fill="green" />');
            expect(svgContent).toContain('<text x="150" y="115" font-size="65" text-anchor="middle" fill="red">ABC</text>');
        });

        it('should generate SVG with adjusted text position for square', () => {
            logo.setTextInput('xyz', 'blue');
            logo.setShapeInput('square', 'yellow');
            const svgContent = logo.generateSVG();
            expect(svgContent).toContain('<rect x="50" y="50" width="300" height="300" fill="yellow" />');
            expect(svgContent).toContain('<text x="175" y="150" font-size="100" text-anchor="middle" fill="blue">XYZ</text>');
        });

        it('should generate SVG with adjusted text position for triangle', () => {
            logo.setTextInput('123', 'green');
            logo.setShapeInput('triangle', 'purple');
            const svgContent = logo.generateSVG();
            expect(svgContent).toContain('<polygon points="150,20 250,180 50,180" fill="purple" />');
            expect(svgContent).toContain('<text x="150" y="150" font-size="55" text-anchor="middle" fill="green">123</text>');
        });

        it('should throw an error if no shape is selected', () => {
            expect(() => logo.generateSVG()).toThrow('Shape not selected');
        });
    });

    describe('saveToFile', () => {
        it('should save SVG file with correct content', () => {
            logo.setTextInput('hello', 'black');
            logo.setShapeInput('circle', 'red');
            const fileName = 'test_logo.svg';
            logo.saveToFile(fileName);
            
            expect(mockWriteFileSync).toHaveBeenCalled();
            const filePath = path.join(__dirname, '..', 'Examples', fileName);
            expect(mockWriteFileSync.mock.calls[0][0]).toBe(filePath);
            const svgContent = mockWriteFileSync.mock.calls[0][1];
            expect(svgContent).toContain('<circle cx="150" cy="100" r="80" fill="red" />');
            expect(svgContent).toContain('<text x="150" y="115" font-size="65" text-anchor="middle" fill="black">HELLO</text>');
        });
    });
});

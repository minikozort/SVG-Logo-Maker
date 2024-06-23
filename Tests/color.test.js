const Colors = require('../Lib/color.js');

describe('Colors', () => {
    describe('constructor', () => {
        it('should create a Colors instance with a color keyword', () => {
            const colorInstance = new Colors('red');
            expect(colorInstance.color).toBe('red');
        });

        it('should create a Colors instance with a hexadecimal color', () => {
            const colorInstance = new Colors('#00FF00');
            expect(colorInstance.color).toBe('#00FF00');
        });

        it('should throw an error if no color is provided', () => {
            expect(() => new Colors()).toThrow('Please enter a color keyword or a hexadecimal number');
        });

        it('should throw an error if an invalid color is provided', () => {
            expect(() => new Colors('invalidColor')).toThrow('Invalid color provided');
        });
    });

    describe('render', () => {
        it('should render text with a color keyword', () => {
            const colorInstance = new Colors('blue');
            const renderedText = colorInstance.render('Hello');
            expect(renderedText).toContain('<text fill="blue">Hello</text>');
        });

        it('should render text with a hexadecimal color', () => {
            const colorInstance = new Colors('#FFA500');
            const renderedText = colorInstance.render('World');
            expect(renderedText).toContain('<text fill="#FFA500">World</text>');
        });

        it('should render text with a colored keyword from colors module', () => {
            const colorInstance = new Colors('yellow');
            const renderedText = colorInstance.render('Hello');
            expect(renderedText).toContain('<text fill="yellow">Hello</text>');
        });

        it('should throw an error if no text is provided', () => {
            const colorInstance = new Colors('green');
            expect(() => colorInstance.render()).toThrow('Text must be provided');
        });

        it('should throw an error if an invalid color keyword is provided', () => {
            const colorInstance = new Colors('invalidColor');
            expect(() => colorInstance.render('Hello')).toThrow('Invalid color keyword');
        });
    });
});

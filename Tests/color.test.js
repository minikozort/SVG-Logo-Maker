const Colors = require('../Lib/color.js');

describe('Colors', () => {
  test('should throw error if color is not provided', () => {
    // Wrap the instantiation in a function to catch the error
    const createColorInstance = () => {
      new Colors('');
    };
    // Expect an error to be thrown
    expect(createColorInstance).toThrow('Please enter a color keyword or a hexadecimal number');
  });
});

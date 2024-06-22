const Logos = require('../Lib/logo.js');

describe('Logos', () => {
  describe('Constructor', () => {
    test('should create an instance of Logos with valid text', () => {
      const logo = new Logos('ABC');
      expect(logo.getText()).toBe('ABC');
    });

    test('should throw error if entered text is more than 3 characters', () => {
      const createLogoInstance = () => {
        new Logos('More than three characters');
      };
      expect(createLogoInstance).toThrow('Entered text must not exceed 3 characters');
    });

    test('should not throw error if entered text is exactly 3 characters', () => {
      const createLogoInstance = () => {
        new Logos('ABC');
      };
      expect(createLogoInstance).not.toThrow();
    });

    test('should throw error if entered text is empty', () => {
      const createLogoInstance = () => {
        new Logos('');
      };
      expect(createLogoInstance).toThrow();
    });
  });

  describe('getText method', () => {
    test('should return the correct text', () => {
      const logo = new Logos('XYZ');
      expect(logo.getText()).toBe('XYZ');
    });
  });
});

// Lib/shapes.js

class Shapes {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.elements = []; // Array to store shapes or elements
        this.textElements = []; // Array to store text elements
    }

    // Method to draw a circle
    drawCircle(cx, cy, r, options) {
        const circle = {
            type: 'circle',
            cx: cx,
            cy: cy,
            r: r,
            options: options
        };
        this.elements.push(circle);
    }

    // Method to draw a square
    drawSquare(x, y, size, options) {
        const square = {
            type: 'rect',
            x: x,
            y: y,
            width: size,
            height: size,
            options: options
        };
        this.elements.push(square);
    }

    // Method to draw a rectangle
    drawRectangle(x, y, width, height, options) {
        const rectangle = {
            type: 'rect',
            x: x,
            y: y,
            width: width,
            height: height,
            options: options
        };
        this.elements.push(rectangle);
    }

    // Method to draw a triangle
    drawTriangle(points, options) {
        const triangle = {
            type: 'polygon',
            points: points,
            options: options
        };
        this.elements.push(triangle);
    }

    // Method to add text
    addText(x, y, content, options) {
        const text = {
            type: 'text',
            x: x,
            y: y,
            content: content,
            options: options
        };
        this.textElements.push(text);
    }

    // Method to render all elements as SVG
 // Method to render all elements as SVG
 render() {
    let svgContent = `<svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">`;

    // Render shapes
    this.elements.forEach(element => {
        if (element.type === 'circle') {
            svgContent += `<circle cx="${element.cx}" cy="${element.cy}" r="${element.r}" fill="${element.options.fill}" />`;
        } else if (element.type === 'rect') {
            svgContent += `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="${element.options.fill}" />`;
        } else if (element.type === 'polygon') {
            svgContent += `<polygon points="${element.points}" fill="${element.options.fill}" />`;
        }
    });

    // Render text elements
    this.textElements.forEach(text => {
        let fontSize = this.calculateMaxFontSize(text); // Calculate font size dynamically

        let textX = text.x;
        let textY = text.y;

        // Adjust text positioning for circle
        if (text.type === 'circle') {
            const circle = this.elements.find(element => element.type === 'circle');
            const centerX = circle.cx;
            const centerY = circle.cy;

            // Calculate text bounding box
            const textWidth = this.measureTextWidth(text.content, fontSize);
            const textHeight = fontSize; // Assuming single line text

            // Calculate position to center text within circle
            textX = centerX - (textWidth / 4);
            textY = centerY + (textHeight / 4); // Adjust vertically for circle
        } else if (text.type === 'rect' || text.type === 'polygon') {
            textY += fontSize * 0.8; // Adjust vertically for square, rectangle, triangle
        }

        svgContent += `<text x="${textX}" y="${textY}" fill="${text.options.fill}" font-size="${fontSize}px" text-anchor="middle" dominant-baseline="middle">${text.content}</text>`;
    });

    svgContent += `</svg>`;
    return svgContent;
}

// Helper method to measure text width based on font size
measureTextWidth(text, fontSize) {
    const averageCharWidth = 8; // Adjust this value based on your font and rendering environment
    return text.length * averageCharWidth * (fontSize / 10); // Adjust multiplier as needed
}

// Helper method to calculate max font size that fits within the shape
calculateMaxFontSize(text) {
    const shapeWidth = this.width; // Get shape width from instance
    const shapeHeight = this.height; // Get shape height from instance

    const maxWidth = shapeWidth * 1; // Adjust multiplier as needed
    const maxHeight = shapeHeight * 1; // Adjust multiplier as needed

    // Calculate based on width or height constraint, adjusting as needed
    const fontSizeByWidth = maxWidth / text.content.length; // Example calculation
    const fontSizeByHeight = maxHeight / 2; // Example calculation

    // Choose minimum font size to ensure it fits within shape
    const maxFontSize = Math.min(fontSizeByWidth, fontSizeByHeight);

    // Ensure maxFontSize is a valid number
    return isNaN(maxFontSize) ? 30 : maxFontSize; // Default to 30 if NaN
}




    // Helper method to calculate max font size that fits within the shape
    calculateMaxFontSize(text) {
        const circleRadius = this.elements.find(element => element.type === 'circle').r; // Get circle radius from elements
        const maxTextWidth = circleRadius * 2; // Maximum text width is diameter of the circle
    
        // Estimate font size based on text length and circle radius
        const fontSizeByWidth = maxTextWidth / text.content.length; // Adjust this calculation as needed
    
        // Choose minimum font size to ensure it fits within circle
        const maxFontSize = Math.min(fontSizeByWidth, circleRadius);
    
        return isNaN(maxFontSize) ? 30 : maxFontSize; // Default to 30 if NaN
    }
}

module.exports = Shapes;

import React, { useRef, useEffect } from 'react';

const AnimationCanvas = () => {
  const canvasRef = useRef(null);
  const x = useRef(0); // Create a ref to hold the x position

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    ctx.fillStyle = 'blue';
    ctx.fillCircle(x.current, 50, 100, 10); // Draw rectangle
  };

  const update = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Update the x position
    x.current += 2;
    if (x.current > canvas.width) {
      x.current = 200; // Reset position if it goes off screen
    }

    draw(ctx); // Draw the updated rectangle
    requestAnimationFrame(update); // Continue the animation
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    requestAnimationFrame(update); // Start the animation loop
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{ border: '1px solid black' }}
    />
  );
};

export default AnimationCanvas;
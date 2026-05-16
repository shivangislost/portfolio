"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({ scrollYProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Map scroll progress (0 to 1) to frame index (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits, e.g. 000, 001, ..., 119
      const formattedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${formattedIndex}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Function to draw image to canvas with "object-fit: cover" logic
  const drawImage = (index: number) => {
    if (!canvasRef.current || images.length === 0 || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Responsive Canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Object-fit: cover calculation
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const baseRatio = Math.max(hRatio, vRatio);
    
    // OPTION 3: Precisely crop ONLY the bottom-right to hide the "Ve" watermark.
    // A subtle 8% zoom provides a baseline 4% crop on all sides.
    const ZOOM_FACTOR = 1.08; 
    const ratio = baseRatio * ZOOM_FACTOR;

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    // To aggressively crop the bottom-right without noticeably shifting the layout,
    // we push the zoomed image slightly Down and Right (positive values).
    // This shifts the crop burden to the bottom-right corner (6% crop) 
    // while leaving the top-left almost untouched (2% crop).
    // This perfectly obliterates the watermark while maintaining full responsiveness and centering.
    const shift_x = centerShift_x + (img.width * ratio * 0.02);
    const shift_y = centerShift_y + (img.height * ratio * 0.02);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the image completely clean with NO artificial patches, masks, or overlays.
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      shift_x,
      shift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Draw first frame when images are fully loaded
  useEffect(() => {
    if (isLoaded) {
      drawImage(0);
    }
    
    const handleResize = () => {
      if (isLoaded) drawImage(Math.round(frameIndex.get()));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      drawImage(Math.round(latest));
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

export default ScrollyCanvas;

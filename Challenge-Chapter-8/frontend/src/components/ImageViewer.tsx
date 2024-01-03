import React from "react";

interface ImageViewerProps {
  imageUrl: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  return (
    <div className="mt-2 w-full flex">
      <p className="w-1/5"></p>
      <div className="h-32">
        <img
          src={imageUrl}
          alt="car"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImageViewer;

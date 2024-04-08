import React, { useState } from "react";
import "./ImageUploader.css";

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} multiple />
      <div className="image-grid">
        {images.map((image, index) => (
          <img key={index} src={image} alt="uploaded" className="image" />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

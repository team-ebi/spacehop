import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AWS() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Get all image by business id
    axios({
      method: "get",
      url: "http://localhost:4000/api/image/1",
    })
    .then(result => {
      // base64 data
      console.log(result.data);
      setImages(images.concat(result.data))
    });
  }, []);

  function upload(event) {
    const formData = new FormData();
    formData.append("image", event.target.files[0], event.target.files[0].name);

    // Post image by business id
    axios({
      method: "post",
      url: "http://localhost:4000/api/image/1",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
    .then(result => console.log(result.data));
  }

  function deleteImage() {
    // Delete image by business id
    axios({
      method: "delete",
      url: "http://localhost:4000/api/image/1"
    })
    .then(result => console.log(result.data));
  }

  return (
    <div>
      <button onClick={deleteImage}>Delete Images</button>
      <input type="file" onChange={upload} />
      {images.map((image, index) => (
        <img
          src={`data:image;base64,${image}`}
          key={index}
        />
      ))}
    </div>
  );
}

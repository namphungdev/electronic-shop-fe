import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { createGlobalStyle } from "styled-components";
import { setImageRoom } from "@/services/product.service";

const GlobalStyle = createGlobalStyle`
.upload__image-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
}
.image-item {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}
.image-item__btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.image-item__close-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.upload-icon {
  height: 250px;
  width: auto;
  object-fit: cover;
}
button {
  height: 40px;
  margin-top: 10px;
  background: #1677ff; 
  color: #fff;
  border: none;
  border-radius: 6px;
}
`

const ImageUploaderComponent = ({ images, setImages, maxNumber, onUploadComplete }) => {
    const onChange = async (imageList, addUpdateIndex) => {
        for (let image of imageList) {
            if (!image.uploaded) {
                try {
                    const response = await setImageRoom(image.file);
                    image.url = response.url; // Assuming the response contains the URL of the uploaded image
                    image.uploaded = true; // Mark as uploaded
                    if (onUploadComplete) {
                        onUploadComplete(response); // Call the callback with the response
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                    // Handle error appropriately (e.g., show an error message)
                }
            }
        }
        setImages([...imageList]);
    };  

    return (
        <>
            <GlobalStyle />
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "webp", "jpeg"]}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    <>
                        <div className="upload__image-header">
                            {imageList.length === 0 ? (
                                <img style={isDragging ? { color: "red" } : null}
                                    className="upload-icon"
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    src="/img/upload.png" alt=""
                                />
                            ) : (
                                <button onClick={onImageUpload}>Add image</button>
                            )}
                        </div>
                        <div className="upload__image-wrapper">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <FontAwesomeIcon size={20}
                                        className="image-item__close-icon"
                                        onClick={() => onImageRemove(index)} icon={faXmark} />
                                    <img
                                        src={image.data_url}
                                        alt=""
                                        width="100"
                                        onClick={() => onImageUpdate(index)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </ImageUploading>
        </>
    );
};

export default ImageUploaderComponent;
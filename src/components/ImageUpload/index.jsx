import React from "react";
import ImageUploading from "react-images-uploading";
import { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faXmark } from "@fortawesome/free-solid-svg-icons";

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

const ImageUploaderComponent = ({ images, setImages, maxNumber }) => {
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
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
                acceptType={["jpg"]}
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

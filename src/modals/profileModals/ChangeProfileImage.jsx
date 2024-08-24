import { useRef, useState } from "react";
import style from "./popUp.module.css";
import { useModal } from "../../context/ModalContext";

function ChangeProfileImage() {
  const fileInputRef = useRef(null);

  const {
    image,
    setImage,
    handleFile,
    setError,
    error,
    setSelectedFile,
    selectedFile,
    closeModal,
  } = useModal();

  function handleFileSelect(e) {
    const file = e.target.files[0];
    handleFile(file);
  }

  function handleUpload() {
    if (selectedFile) {
      console.log("image Upload: ", image);
      setError("");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      closeModal();

      reader.readAsDataURL(selectedFile);
    } else {
      setError("No file selected");
    }
  }

  return (
    <>
      <div className={style.contentStyle}>
        {image ? (
          <img src={image} alt="Uploaded" className={style.imageStyle} />
        ) : (
          <div
            className={style.placeholderStyle}
            onClick={() => fileInputRef.current.click()}
          >
            <p>Drag and drop an image here, or click to select one</p>
          </div>
        )}
        {error && <p className={style.errorStyle}>{error}</p>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={style.fileInputStyle}
          onChange={handleFileSelect}
        />
      </div>
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default ChangeProfileImage;

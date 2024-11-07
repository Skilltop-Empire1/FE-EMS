import { useRef, useState } from "react";
import style from "./popUp.module.css";
import { useModal } from "../../context/ModalContext";
import { usePostResourceMutation } from "@src/redux/api/departmentApi";

function ChangeProfileImage() {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const {
    image,
    setImage,
    handleFile,
    closeModal,
    selectedFile,
    setSelectedFile,
  } = useModal();

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 2MB limit.");
        return;
      }
      handleFile(file);
      setSelectedFile(file); // Ensure selected file is set
    }
  };

  const [postResource] = usePostResourceMutation();

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePic", selectedFile);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        await postResource({
          url: "/staff/upload-profile-pic",
          data: formData,
        }).unwrap();
        setImage(URL.createObjectURL(selectedFile));
        setSelectedFile(null);
        closeModal();
      } catch (error) {
        console.error("Upload failed:", error);
        setError("Upload failed. Please try again.");
      }
    } else {
      setError("No file selected");
    }
  };

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

import { useRef, useState } from "react";
import style from "./popUp.module.css";
import { useModal } from "../../context/ModalContext";
import { usePostProfileImageMutation } from "../../redux/api/departmentApi";

function ChangeProfileImage() {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const {
    image,
    setImage,
    handleFile,
    closeModal,
    selectedFile,
    setSelectedFile,
  } = useModal();

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB size limit

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 2MB limit.");
        return;
      }
      handleFile(file);
      setSelectedFile(file);
      setError("");
    }
  };

  const [postProfileImage] = usePostProfileImageMutation();

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    setIsUploading(true);

    try {
      await postProfileImage({
        url: "/staff/upload-profilePic",
        data: formData,
      }).unwrap();

      setImage(URL.createObjectURL(selectedFile));
      setSelectedFile(null);
      closeModal();
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setError(""); // Reset error when clearing the file
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
        {selectedFile && !isUploading && (
          <div className={style.fileInfo}>
            <p>{selectedFile.name}</p>
            <button onClick={handleClearFile} className={style.clearButton}>
              Clear
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={style.fileInputStyle}
          onChange={handleFileSelect}
        />
      </div>
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </>
  );
}

export default ChangeProfileImage;

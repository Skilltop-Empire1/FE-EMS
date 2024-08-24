import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const MODAL_TYPES = {
  TYPE1: "CHANGE_IMAGE",
  TYPE2: "CHANGE_PASSWORD",
  TYPE3: "LOGOUT_CONFIRMATION",
  TYPE4: "ADD_ORGANIZATION",
  TYPE5: "UPDATE_ORGANIZATION",
};

const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [modalProps, setModalProps] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const openModal = (type, props = {}) => {
    setIsShowModal(true);
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setModalType(null);
    setModalProps({});
  };

  function handleFile(file) {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setPreview(reader.result);
        setSelectedFile(file);
        setError("");
      };

      reader.readAsDataURL(file);
    } else {
      setError("Please upload a valid image file");
    }
  }

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        modalProps,
        modalType,
        isShowModal,
        image,
        setImage,
        selectedFile,
        setSelectedFile,
        handleFile,
        error,
        setError,
        preview,
        setPreview,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("modal context is used outside context");
  }

  return context;
};

export default ModalProvider;

import React from "react";
import ImagePreviewModal from "../../ImagePreviewModal";

export const ImageUpload = ({ label, name, onChange, imagePreview }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <label className="custom-file-upload">
        <input type="file" name={name} id={name} onChange={onChange} />
        <img src="/assets/icons/selectimg.svg" alt="select img" />
        <span>Выбрать картинку</span>
      </label>
      {imagePreview && <ImagePreviewModal previewImage={imagePreview} />}
    </div>
  );
};

import React, { useRef } from 'react';
import styles from "@/styles/partials/SelectPhoto.module.scss";

const CustomFileInput = ({ onChange }) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(files);
  };

  const handleClick = (e) => {
     e.stopPropagation();
    fileInputRef.current.click();
  };
  const handleModalClick = (e) => {
  e.stopPropagation(); 
};


  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className={styles.fileInput}
        onChange={handleFileInputChange}
        accept="image/*, .pdf, .doc, .docx"
        multiple
      />
      <div className={styles.fileInputbtn}  onClick={handleModalClick}>
            <button className={styles.button} onClick={handleClick}>Вставьте изображение</button>
      </div>
    </>
  );
};

export default CustomFileInput;

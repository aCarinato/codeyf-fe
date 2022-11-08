import React from 'react';

function ImgUploader(props) {
  const { img, uploadImg } = props;
  return (
    <div className="myform-input-section">
      <label className="myform-label bold">
        Profile picture <sup>*</sup>
      </label>
      {img && img.url && (
        <div className="img-input-container">
          <img className="img-input-container" src={`${img.url}`} />
        </div>
      )}
      {/* <input onChange={uploadImg} type="file" accept="images/*" /> */}

      <input onChange={(e) => uploadImg(e)} type="file" accept="image/*" />
    </div>
  );
}

export default ImgUploader;

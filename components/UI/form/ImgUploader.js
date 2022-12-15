import React from 'react';
import BtnCTA from '../BtnCTA';
import SpinningLoader from '../SpinningLoader';

function ImgUploader(props) {
  const { img, uploadImg, removeImg, uploading = false } = props;
  return (
    <div className="myform-input-section">
      {uploading ? (
        <SpinningLoader />
      ) : (
        <>
          <label className="myform-label bold">
            picture
            {/* <sup>*</sup> */}
          </label>
          {img && img.url && (
            <div className="img-input-container">
              <img className="img-input" src={`${img.url}`} />
            </div>
          )}
          {/* <input onChange={uploadImg} type="file" accept="images/*" /> */}

          <input onChange={(e) => uploadImg(e)} type="file" accept="image/*" />
          <BtnCTA label="X" onCLickAction={removeImg} />
        </>
      )}
    </div>
  );
}

export default ImgUploader;

import React from 'react';

function TextArea(props) {
  const {
    required,
    disabled = false,
    label,
    value,
    onChange,
    onBlur,
    maxLength,
    nRows,
    nCols,
    placeholder,
    isInvalid,
    errorMsg,
  } = props;
  return (
    <div>
      <label className="myform-label bold">
        {label} {required && <sup>*</sup>}
      </label>
      <textarea
        className={isInvalid ? 'text-input-invalid' : 'text-input'}
        type="text"
        disabled={disabled}
        placeholder={placeholder && placeholder}
        maxLength={maxLength && maxLength}
        rows={nRows}
        cols={nCols}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isInvalid ? (
        <p className="input-error-msg">{errorMsg}</p>
      ) : (
        <p className="input-error-msg-none">none</p>
      )}
    </div>
  );
}

export default TextArea;

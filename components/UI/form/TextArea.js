import React from 'react';

function TextArea(props) {
  const {
    required,
    disabled = false,
    label,
    value,
    onChange,
    maxLength,
    nRows,
    nCols,
    placeholder,
  } = props;
  return (
    <div>
      <label className="myform-label bold">
        {label} {required && <sup>*</sup>}
      </label>
      <textarea
        type="text"
        disabled={disabled}
        maxLength={maxLength}
        rows={nRows}
        cols={nCols}
        value={value}
        onChange={onChange}
        // onBlur={() => setShortDescriptionTouched(true)}
        placeholder={placeholder ? placeholder : ''}
      />
    </div>
  );
}

export default TextArea;

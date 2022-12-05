import React from 'react';

function TextInput(props) {
  const {
    required,
    label,
    value,
    minLength,
    maxLength,
    onChange,
    onBlur,
    placeholder,
    disabled = false,
    isInvalid,
    errorMsg,
  } = props;
  return (
    <div>
      <label className="myform-label bold" htmlFor="short-description">
        {label} {required && <sup>*</sup>}
      </label>
      <input
        className={isInvalid ? 'text-input-invalid' : 'text-input'}
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder && placeholder}
        minLength={minLength && minLength}
        maxLength={maxLength && maxLength}
        //   onChange={(e) => setName(e.target.value)}
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

export default TextInput;

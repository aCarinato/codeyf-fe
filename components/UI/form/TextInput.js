import React from 'react';

function TextInput(props) {
  const { required, label, value, onChange } = props;
  return (
    <>
      <label className="myform-label bold" htmlFor="short-description">
        {label} {required && <sup>*</sup>}
      </label>
      <input
        type="text"
        value={value}
        //   onChange={(e) => setName(e.target.value)}
        onChange={onChange}
      />

      {/* <label className="myform-label bold" htmlFor="short-description">
        short description (max 80 characters) <sup>*</sup>
      </label>

      <input
        className={
          field.inputIsInvalid ? 'input-invalid' : classes['myform-text-input']
        }
        id={field.id}
        type={field.inputType}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        placeholder={field.placeholder}
        required
      />
      {field.inputIsInvalid && (
        <p className="input-error-msg">{field.inputErrorMsg}</p>
      )} */}
    </>
  );
}

export default TextInput;

import React from 'react';

function Select(props) {
  const { label, required, name, options, onChange } = props;
  //   options must have an _id and label => [
  //   { _id: '0', label: 'styling' },

  return (
    <>
      <label>
        {label} {required && <sup>*</sup>}
      </label>
      <select name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;

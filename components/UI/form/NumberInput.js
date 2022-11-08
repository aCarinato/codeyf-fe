import React from 'react';

function NumberInput(props) {
  const { required, label, value, onChange, min, max } = props;
  return (
    <>
      <label className="myform-label bold">
        {label} {required && <sup>*</sup>}
      </label>
      <input
        type="number"
        value={value}
        min={min && min}
        max={max && max}
        //   onChange={(e) => setName(e.target.value)}
        onChange={onChange}
      />
    </>
  );
}

export default NumberInput;

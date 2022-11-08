import React from 'react';

function CheckBox() {
  return <div>CheckBox</div>;
}

<fieldset>
  {field.options.map((option, index) => (
    <div key={index}>
      <input
        type={field.subtype === 'radio' ? 'radio' : 'checkbox'}
        id={option.label}
        name={field.name}
        value={field.subtype === 'radio' && option.value}
      />
      <label htmlFor={option.value}>{option.label}</label>
    </div>
  ))}
</fieldset>;

export default CheckBox;

function RadioBox(props) {
  const { required, label, options, name, onChange } = props;
  return (
    <fieldset>
      <legend>
        {label} {required && <sup>*</sup>}
      </legend>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.label}
            name={name}
            value={option.value}
            onChange={(e) => onChange(e)}
            // checked={
            //     option.indexOf(skill._id) === -1 ? false : true
            //   }
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default RadioBox;

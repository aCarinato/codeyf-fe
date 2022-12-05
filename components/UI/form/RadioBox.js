function RadioBox(props) {
  const { required, label, options, name, onChange, isInvalid, errorMsg } =
    props;
  return (
    <div>
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
              // onBlur={() => onBlur()}
              // checked={
              //     option.indexOf(skill._id) === -1 ? false : true
              //   }
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </fieldset>
      {isInvalid ? (
        <p className="input-error-msg">{errorMsg}</p>
      ) : (
        <p className="input-error-msg-none">none</p>
      )}
    </div>
  );
}

export default RadioBox;

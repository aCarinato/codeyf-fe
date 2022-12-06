import classes from './RadioBox.module.css';

function RadioBox(props) {
  const { required, label, options, name, onChange, isInvalid, errorMsg } =
    props;
  return (
    <div>
      <fieldset className={isInvalid ? classes['input-invalid'] : ''}>
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

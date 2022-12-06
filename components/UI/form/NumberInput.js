function NumberInput(props) {
  const {
    required,
    label,
    value,
    onChange,
    onBlur,
    min,
    max,
    placeholder,
    isInvalid,
    errorMsg,
  } = props;
  return (
    <div>
      <label className="myform-label bold">
        {label} {required && <sup>*</sup>}
      </label>
      <input
        className={isInvalid ? 'number-input-invalid' : 'number-input'}
        type="number"
        value={value}
        placeholder={placeholder && placeholder}
        min={min && min}
        max={max && max}
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

export default NumberInput;

function DateInput(props) {
  const { required, label, value, onChange, min, max, isInvalid, errorMsg } =
    props;
  return (
    <div>
      <label className="myform-label bold">
        {label} {required && <sup>*</sup>}
      </label>
      <input
        className={isInvalid ? 'number-input-invalid' : 'number-input'}
        type="date"
        value={value}
        min={min && min}
        max={max && max}
        //   onChange={(e) => setName(e.target.value)}
        onChange={onChange}
      />
      {isInvalid ? (
        <p className="input-error-msg">{errorMsg}</p>
      ) : (
        <p className="input-error-msg-none">none</p>
      )}
    </div>
  );
}

export default DateInput;

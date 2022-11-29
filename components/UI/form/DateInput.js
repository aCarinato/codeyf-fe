function DateInput(props) {
  const { required, label, value, onChange, min, max } = props;
  return (
    <div>
      <label className="myform-label bold">
        {label} {required && <sup>*</sup>}
      </label>
      <input
        type="date"
        value={value}
        min={min && min}
        max={max && max}
        //   onChange={(e) => setName(e.target.value)}
        onChange={onChange}
      />
    </div>
  );
}

export default DateInput;

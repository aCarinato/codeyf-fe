function NumberInput(props) {
  const { required, label, value, onChange, min, max, placeholder } = props;
  return (
    <div>
      <label className="myform-label bold">
        {label} {required && <sup>*</sup>}
      </label>
      <input
        type="number"
        value={value}
        placeholder={placeholder && placeholder}
        min={min && min}
        max={max && max}
        //   onChange={(e) => setName(e.target.value)}
        onChange={onChange}
      />
    </div>
  );
}

export default NumberInput;

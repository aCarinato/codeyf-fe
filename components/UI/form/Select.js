import classes from './Select.module.css';

function Select(props) {
  const { label, required, name, options, onChange, isInvalid, errorMsg } =
    props;
  //   options must have an _id and label => [
  //   { _id: '0', label: 'styling' },

  return (
    <div className={classes['box-0']}>
      <label className={classes['select-label']}>
        {label} {required && <sup>*</sup>}
      </label>
      <select name={name} onChange={onChange}>
        <option value="null-value">-- SELECT --</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.label}
          </option>
        ))}
      </select>
      {isInvalid ? (
        <p className="input-error-msg">{errorMsg}</p>
      ) : (
        <p className="input-error-msg-none">none</p>
      )}
    </div>
  );
}

export default Select;

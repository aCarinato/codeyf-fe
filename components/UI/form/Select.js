import classes from './Select.module.css';

function Select(props) {
  const { label, required, name, options, onChange, isInvalid, errorMsg } =
    props;
  //   options must have an _id and label => [
  //   { _id: '0', label: 'styling' },

  return (
    <div className={classes['box-0']}>
      <div className={classes['box-1']}>
        <label className={classes['select-label']}>
          {label} {required && <sup>*</sup>}
        </label>
        <div>
          <select
            // className={isInvalid ? 'select-invalid' : ''}
            name={name}
            onChange={onChange}
            className={
              isInvalid
                ? classes['select-dropdown-invalid']
                : classes['select-dropdown']
            }
          >
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
      </div>
    </div>
  );
}

export default Select;

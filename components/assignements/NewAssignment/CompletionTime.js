import classes from './CompletionTime.module.css';
// react / next
import { useEffect, useState } from 'react';

function CompletionTime(props) {
  const {
    setCompletionTime,
    setCompletionTimeTouched,
    completionTimeIsInvalid,
  } = props;

  const [n, setN] = useState('');
  const [unit, setUnit] = useState('');

  const options = [
    { _id: '0', label: 'week(s)' },
    { _id: '1', label: 'day(s)' },
  ];

  useEffect(() => {
    // console.log(`n: ${n}`);
    // console.log(`unit: ${unit}`);
    if (unit === 'week(s)') {
      setCompletionTime(Number(n) * 7);
    }

    if (unit === 'day(s)') {
      setCompletionTime(Number(n));
    }
  }, [n, unit]);

  return (
    <div className={classes['box-0']}>
      <label className="myform-label bold">
        Estimated time for completion (assuming about a couple of hours spent
        per day)
      </label>
      <div className={classes['box-1']}>
        <div>
          <input
            className={
              completionTimeIsInvalid ? 'text-input-invalid' : 'text-input'
            }
            type="number"
            value={n}
            min={1}
            placeholder="amount"
            //   max={max && max}
            onChange={(e) => setN(e.target.value)}
            onBlur={(e) => setCompletionTimeTouched(true)}
          />
        </div>
        <div>
          <select
            className={completionTimeIsInvalid ? 'select-invalid' : ''}
            name={unit}
            onChange={(e) => {
              if (e.target.value !== 'null-value') {
                setUnit(e.target.value);
              }
            }}
          >
            <option value="null-value">-- SELECT --</option>
            {options.map((option) => (
              <option key={option._id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {completionTimeIsInvalid ? (
        <p className="input-error-msg">{`enter a valid value`}</p>
      ) : (
        <p className="input-error-msg-none">none</p>
      )}
    </div>
  );
}

export default CompletionTime;

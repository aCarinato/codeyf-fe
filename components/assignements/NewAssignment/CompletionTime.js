import classes from './CompletionTime.module.css';
// react / next
import { useEffect, useState } from 'react';

function CompletionTime(props) {
  const { setCompletionTime } = props;

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
    <div>
      <label className="myform-label bold">
        Estimated time for completion (assuming about a couple of hours spent
        per day)
      </label>
      <div className={classes['box-0']}>
        <div>
          <input
            type="number"
            value={n}
            min={1}
            //   max={max && max}
            onChange={(e) => setN(e.target.value)}
          />
        </div>
        <div>
          <select
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
    </div>
  );
}

export default CompletionTime;
